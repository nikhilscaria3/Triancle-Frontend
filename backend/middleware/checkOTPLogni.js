const checkOTPLogin = (req, res, next) => {
    const otpLoginEnabled = process.env.OTP_Login === 'true';
    if (otpLoginEnabled) {
        next();
    } else {
        return res.status(403).json({ error: 'OTP login is not enabled' });
    }
};


module.exports = {
    checkOTPLogin
}