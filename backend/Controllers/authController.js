import User from '../Models/UserModel.js';
import { redisClient } from '../Utils/redisClient.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const registerController = async (req, res) => {

  const { uid, name, email, role } = req.body
  //Make sure uid from token === uid in body
  if (req.uid !== uid) {
    return res.status(403).json({ message: "UID mismatch — token is invalid for this user" });
  }

  try {
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, email, name, role });
      await user.save();
    }
    res.status(200).json({ success: true, role: user.role, user });
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserController = async (req, res) => {

  const { uid } = req.params;
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      success: true,
      role: user.role
    });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SendOTP Controller
export const sendOtpController = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({
    success: true,
    error: 'Email is required'
  });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

  try {
    // Store OTP in Redis with 5-minute expiry
    const result = await redisClient.set(`otp:${email}`, otp, { EX: 300 });
    console.log("Redis SET result:", result); // should log "OK"
    
    // Send email (you can use nodemailer)
    // Here’s a mock transporter (replace with real SMTP details)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.Email,
        pass: process.env.Password,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: 'Your OTP from Uplify',
      text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
    });

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully'
    });
  }
  catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to send OTP'
    });
  }
};

// Verify OTP Controller
export const verifyOtpController = async (req, res) => {

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Missing email or OTP' });
  }

  try {
    const storedOtp = await redisClient.get(`otp:${email}`);
    console.log(`Stored OTP for ${email}: ${storedOtp}, Provided: ${otp}`);

    if (!storedOtp) {
      return res.status(400).json({ verified: false, error: 'OTP expired or not sent' });
    }

    if (storedOtp === otp) {
      await redisClient.del(`otp:${email}`);
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, error: 'Invalid OTP' });
    }
  }
  catch (err) {
    console.error("Redis error during OTP verification:", err);
    return res.status(500).json({ error: "Internal server error" });
  }

};