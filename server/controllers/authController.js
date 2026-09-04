const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const makeVoiceCall = require('../utils/makeVoiceCall');
const validator = require('validator');


const generateAuthToken = function(id){
        const token = jwt.sign({id:id}, process.env.JWT_SECRET, {expiresIn:'24h'});
        return token;
}

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;

        // Check empty fields
        if (
            !username ||
            !email ||
            !password ||
            !phone ||
            validator.isEmpty(username.trim()) ||
            validator.isEmpty(email.trim()) ||
            validator.isEmpty(password) ||
            validator.isEmpty(phone.trim())
        ) {
            return res.status(400).send("All fields are required");
        }

        // Username validation
        if (!validator.isLength(username, { min: 3, max: 30 })) {
            return res.status(400).send(
                "Username must be between 3 and 30 characters"
            );
        }

        // Email validation
        if (!validator.isEmail(email)) {
            return res.status(400).send("Invalid email format");
        }

        // Password validation
        if (!validator.isLength(password, { min: 6 })) {
            return res.status(400).send(
                "Password must be at least 6 characters"
            );
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send("Email already exists");
        }

        // Generate OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const otpExpiry = new Date(
            Date.now() + 10 * 60 * 1000
        );

        // Create user
        const user = await User.create({
            username,
            email,
            password,
            phone,
            otp,
            otpExpiry
        });

        // Send OTP
        try {
            await sendEmail({
                to: email,
                subject: "Your OTP code for AI COLD MAIL GENERATOR",
                text: `Your OTP code is ${otp}. It is valid for 10 minutes only`,
                otp: otp
            });

            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    username: user.username,
                    email: user.email
                }
            });

        } catch (err) {
            console.log("Error generating OTP:", err.message);
            return res.status(500).send("Error sending OTP");
        }

    } catch (err) {
        console.log("Register error:", err.message);

        return res.status(500).send(
            "Internal server error: " + err.message
        );
    }
};


exports.verifyOTP = async (req,res)=>{
    try{
        const{email, otp} = req.body;
        if(!email || !otp){
            return res.status(400).send("Email and OTP are required");
        }
        const user = await User.findOne({email}).select("+otp +otpExpiry");
        if(!user){
            return res.status(400).send("User not found");
        }
        if(user.isVerified){
            return res.status(400).send("User already verified");
        }
        if(user.otp !== otp){
            return res.status(400).send("Invalid OTP");
        }

        if(user.otpExpiry < new Date()){
            return res.status(400).send("OTP has expired");
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        const token = generateAuthToken(user._id);
        return res.status(200).json({message: "OTP verified successfully",token,
            user:{
                username:user.username,
                email:user.email
            }
        });
    }
    catch(err){
        return res.status(500).send("Error verifying OTP"+err.message);
    }
};

exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send("Email is required");
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.isVerified) {
            return res.status(400).send("User already verified");
        }

        // Generate new OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // OTP valid for 10 minutes
        const otpExpiry = new Date(
            Date.now() + 10 * 60 * 1000
        );

        user.otp = otp;
        user.otpExpiry = otpExpiry;

        await user.save();

        // Send new OTP
        await sendEmail({
            to: email,
            subject: "Your new OTP code for AI COLD MAIL GENERATOR",
            text: `Your OTP code is ${otp}. It is valid for 10 minutes only`,
            otp: otp
        });

        return res.status(200).json({
            message: "New OTP sent successfully"
        });

    } catch (err) {
        console.log("Resend OTP error:", err.message);

        return res.status(500).send(
            "Error sending OTP: " + err.message
        );
    }
};

exports.loginUser = async(req,res)=>{
    try{
        const{email,password} = req.body;
        if(!email || !password){
            return res .status(400).send("Email and password are required");
        }
        const user = await User.findOne({email}).select('+password +isVerified');
        if(!user){
            return res.status(400).send("User not found");
        }
        if(!user.isVerified){
            return res.status(400).send("User not verified.Please verify your email first");
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).send("Invalid credentials");
        }
        const token = generateAuthToken(user._id);
        return res.status(200).json({message: "Login successfully",token,
        user: {
            username: user.username,
            email: user.email
    }});
    }
    catch(err){
        res.status(500).send("Error"+err.message);
    }
};

exports.voiceOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send("Email is required");
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.isVerified) {
            return res.status(400).send("User already verified");
        }

        if (!user.phone) {
            return res.status(400).send("Phone number not found");
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const otpExpiry = new Date(
            Date.now() + 10 * 60 * 1000
        );

        await User.updateOne(
            { email },
            {
                $set: {
                    otp: otp,
                    otpExpiry: otpExpiry
                }
            }
        );

        await makeVoiceCall(user.phone, otp);

        return res.status(200).json({
            message: "OTP sent via voice call successfully"
        });

    } catch (err) {
        console.log("Voice OTP error:", err);

        return res.status(500).send(
            "Error sending OTP via call: " + err.message
        );
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send("Email is required");
        }

        if (!validator.isEmail(email)) {
            return res.status(400).send("Invalid email format");
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (!user.isVerified) {
            return res.status(400).send(
                "Please verify your email before resetting your password"
            );
        }

        const resetOtp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const resetOtpExpiry = new Date(
            Date.now() + 10 * 60 * 1000
        );

        user.resetOtp = resetOtp;
        user.resetOtpExpiry = resetOtpExpiry;

        await user.save();

        await sendEmail({
            to: email,
            subject: "Password Reset OTP - AI COLD MAIL GENERATOR",
            text: `Your password reset OTP is ${resetOtp}. It is valid for 10 minutes only.`,
            otp: resetOtp
        });

        return res.status(200).json({
            message: "Password reset OTP sent successfully"
        });

    } catch (err) {
        console.log("Forgot password error:", err.message);

        return res.status(500).send(
            "Error sending password reset OTP: " + err.message
        );
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).send(
                "Email, OTP and new password are required"
            );
        }

        if (!validator.isEmail(email)) {
            return res.status(400).send("Invalid email format");
        }

        if (!validator.isLength(newPassword, { min: 6 })) {
            return res.status(400).send(
                "Password must be at least 6 characters"
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (!user.resetOtp || user.resetOtp !== otp) {
            return res.status(400).send("Invalid OTP");
        }

        if (
            !user.resetOtpExpiry ||
            user.resetOtpExpiry < new Date()
        ) {
            return res.status(400).send("OTP has expired");
        }

        user.password = newPassword;
        user.resetOtp = undefined;
        user.resetOtpExpiry = undefined;

        await user.save();

        return res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (err) {
        console.log("Reset password error:", err.message);

        return res.status(500).send(
            "Error resetting password: " + err.message
        );
    }
};

