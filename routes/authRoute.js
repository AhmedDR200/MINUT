const express = require('express');
const router = express.Router();
const {
    signup,
    login,
    forgotPassword,
    verifyPasswordCode,
    resetPassword 
} = require('../controllers/authController');


router.route("/signup")
.post(signup);

router.route("/login")
.post(login)

router.route("/forgotPassword")
.post(forgotPassword)

router.route("/verifyResetCode")
.post(verifyPasswordCode)

router.route("/resetPassword")
.put(resetPassword);

module.exports = router;