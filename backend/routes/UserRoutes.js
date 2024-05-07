const express = require('express');
const { Login, SignUp, verifyEmail, verifyForgotMail, ForgotPassword, VerifyOTP, ResendOTP } = require('../controllers/SignupLoginController');
const { getUsers, createUser, updateUser, deleteUser, refreshToken } = require('../controllers/UserController');
const router = express.Router();
const { app } = require('../config/config');

const validateUser = require('../validators/validationUser');
const { checkOTPLogin } = require('../middleware/checkOTPLogni');

// Define common suffix and prefix
const apiSuffix = app.apiPrefix + app.apiVersion;
// Define API prefixes for employer and user routes
const userPrefix = '/user';
const adminPrefix = '/admin';

const multer = require('multer');
const { authMiddleware } = require('../middleware/authmiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes for employer
router.get(`${apiSuffix}${userPrefix}/getuser`, authMiddleware, getUsers);
router.post(`${apiSuffix}${userPrefix}/createuser`, createUser);
router.put(`${apiSuffix}${userPrefix}/updateuser`, updateUser);
router.delete(`${apiSuffix}${userPrefix}/deleteuser`, deleteUser); // Using URL parameter for delete

// Routes with common suffix and admin prefix
router.post(`${apiSuffix}${adminPrefix}/login`, Login);
router.post(`${apiSuffix}${adminPrefix}/signup`, SignUp);
router.post(`${apiSuffix}${adminPrefix}/verifyotp`, checkOTPLogin, VerifyOTP);
router.post(`${apiSuffix}${adminPrefix}/resendotp`, checkOTPLogin, ResendOTP);
router.get(`${apiSuffix}${adminPrefix}/verifyemail`, verifyEmail);
router.post(`${apiSuffix}${adminPrefix}/verifyforgotmail`, verifyForgotMail);
router.post(`${apiSuffix}${adminPrefix}/forgotpassword`, ForgotPassword);
// router.get(`${apiSuffix}${adminPrefix}/checktoken`, checktoken);

//refresh token

router.post(`${apiSuffix}/refresh/refreshtoken`, refreshToken);



module.exports = router;
