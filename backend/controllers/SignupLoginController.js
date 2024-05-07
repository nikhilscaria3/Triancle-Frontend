const { User, Role } = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")
const fs = require('fs');
const path = require('path');
const { isEmail, isLength } = require('validator');
const { encryptPassword } = require('../utils/encryption');
const { sendSuccessResponse } = require('../utils/response');
const { app } = require('../config/config');
const { sendHtmlEmailNotification } = require('../utils/notification');

// Define common suffix and prefix
const apiSuffix = app.apiPrefix + app.apiVersion;
// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Function to generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

const sendOTPByEmail = async (email, otp) => {
    const emailTemplatePath = path.join(__dirname, '..', 'public', 'lyndellotp.html');

    let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');

    // Replace placeholders with actual values
    emailTemplate = emailTemplate.replace('{{otp}}', otp);
    const subject = 'Verification Code'

    sendHtmlEmailNotification(email, subject, emailTemplate)
    // Send OTP via email
}

// Sign Up endpoint

const SignUp = async (req, res) => {
    const { email, password } = req.body;

    // Validate email format
    if (!isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password length
    if (!isLength(password, { min: 6 })) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await encryptPassword(password);

        // Save the email and hashed password temporarily
        const user = new User({
            email,
            password: hashedPassword,
            verified: false
        });

        // Save the user to the database
        await user.save();

        if (process.env.OTP_Login === "true") {
            // Generate OTP
            const otp = generateOTP();
            req.session.otp = otp;

            // Send OTP via email
            await sendOTPByEmail(email, otp);

            sendSuccessResponse(res, user, 'Please check your email for OTP');
        } else {
            // Generate JWT token for email verification
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Send verification link via email
            const emailTemplatePath = path.join(__dirname, '..', 'public', 'lyndellverifyemail.html');
            let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
            emailTemplate = emailTemplate.replace('{{url}}', `${process.env.BASE_URL}${apiSuffix}/admin/verifyemail?token=`);
            emailTemplate = emailTemplate.replace('{{link}}', token);

            const subject = 'Email Verification Link'

            sendHtmlEmailNotification(email, subject, emailTemplate)
            // Send response to the client
            sendSuccessResponse(res, user, 'Please check your email to verify your account');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Verify OTP endpoint
const VerifyOTP = async (req, res) => {
    const { OTP, email } = req.body;
    try {

        const user = await User.findOne({ where: { email } });

        // Check if OTP matches

        if (req.session.otp !== OTP) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        if (user && OTP === req.session.otp) {
            user.verified = true
            await user.save()
        }

        res.status(200).json({ message: 'Registered Sucessfully' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'An error occurred while verifying OTP' });
    }
};

// Resend OTP
const ResendOTP = async (req, res) => {
    const { email } = req.query;

    try {
        // Generate new OTP
        const OTP = generateOTP();
        req.session.otp = OTP;
        const emailTemplatePath = path.join(__dirname, '..', 'public', 'lyndellotp.html');

        let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');

        // Replace placeholders with actual values
        emailTemplate = emailTemplate.replace('{{otp}}', OTP);


        // Send OTP via email
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Verification Code',
            html: emailTemplate
        });



        res.json({ message: 'New OTP sent successfully' });
    } catch (error) {
        console.error('Error resending OTP:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.query;
    console.log(token);
    try {
        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (decodedToken && decodedToken.email) {
            const userEmail = decodedToken.email;
            // Find the user in the database
            const user = await User.findOne({ where: { email: userEmail } });

            if (user) {
                // Update the user's 'verified' status to true
                user.verified = true;
                await user.save();

                const emailsucessTemplatePath = path.join(__dirname, '..', 'public', 'lyndellverificationsuccess.html');

                // Send a response indicating successful email verification
                return res.sendFile(emailsucessTemplatePath)
            } else {
                throw new Error('User not found');
            }
        } else {
            throw new Error('Invalid token or missing email information');
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ error: 'An error occurred while verifying email' });
    }
};


const Login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        // Check if email is in a valid format
        if (!isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Find the user by email
        const user = await User.findOne({
            where: { email: email.toLowerCase() },
            include: Role
        });

        console.log(user);

        if (user.status === false) {
            return res.status(401).json({ error: 'Blocked' }); // Use return here
        }

        // If user exists
        if (user) {
            // Compare passwords
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                // Generate JWT tokens with user type
                const userType = user.Role.roletype
                const accesstoken = jwt.sign({ type: 'accesstoken', email, userType }, process.env.JWT_SECRET, { expiresIn: '12h' });
                const refreshtoken = jwt.sign({ type: 'refreshtoken', email, userType }, process.env.JWT_SECRET, { expiresIn: '15m' });
                console.log("success");
                return res.status(200).json({ userId: user.id, accesstoken, refreshtoken, message: 'Login successful' }); // Use return here
            } else {
                return res.status(401).json({ error: 'Invalid credentials' }); // Use return here
            }
        } else {
            return res.status(401).json({ error: 'User not found' }); // Use return here
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'An error occurred' }); // Use return here
    }
};




const verifyForgotMail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        // Check if the email exists in the database
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'Email not found' });
        }

        // Generate a token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const emailTemplatePath = path.join(__dirname, '..', 'public', 'lyndellverifyforgotmail.html');

        let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');

        // Replace placeholders with actual values
        emailTemplate = emailTemplate.replace('{{url}}', `${process.env.FRONTEND_URL}/resetpassword?token=`);

        emailTemplate = emailTemplate.replace('{{link}}', token);

        const subject = 'Email Verification Link'
        sendHtmlEmailNotification(email, subject, emailTemplate)

        res.status(200).json({ message: 'Token sent to email for password reset' });
    } catch (error) {
        console.error('Error verifying forgot mail:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

const ForgotPassword = async (req, res) => {
    try {

        const { token } = req.body;
        const { newPassword, confirmPassword } = req.body;
        console.log(token);
        console.log(req.body);
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Update the password in the database
        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = await encryptPassword(newPassword)
        // Set new password and save the user
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};



module.exports = {
    Login,
    SignUp,
    verifyEmail,
    VerifyOTP,
    ResendOTP,
    verifyForgotMail,
    ForgotPassword
}