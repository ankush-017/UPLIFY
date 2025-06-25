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
  if (!email) return res.status(400).json({ success: false, error: 'Email required' });

  const normalizedEmail = email.toLowerCase();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const result = await redisClient.set(`otp:${normalizedEmail}`, otp, { EX: 300 });
    console.log("🔐 Redis SET:", result, "OTP:", otp, "for", normalizedEmail);

    const transporter = nodemailer.createTransport({ /* your config */ });
    await transporter.sendMail({
      to: normalizedEmail,
      subject: 'Your OTP',
      text: `Your OTP is ${otp}, valid for 5 mins.`,
    });

    res.status(200).json({ success: true, message: 'OTP sent' });
  } catch (err) {
    console.error("Error in sendOtp:", err);
    res.status(500).json({ success: false, error: 'Failed to send OTP' });
  }
};

export const verifyOtpController = async (req, res) => {
  console.log("🚀 verifyOtpController HIT");
  console.log("Request body:", req.body);

  const { email, otp } = req.body;
  if (!email || !otp) {
    console.log("❌ Missing email or OTP");
    return res.status(400).json({ error: 'Missing email or OTP' });
  }

  try {
    const key = `otp:${email.toLowerCase()}`;
    console.log("🔑 Fetching key:", key);

    const storedOtp = await redisClient.get(key);
    console.log("📦 Stored OTP:", storedOtp);

    if (!storedOtp) {
      console.log("❌ OTP not found or expired");
      return res.status(400).json({ verified: false, error: 'OTP expired or not sent' });
    }

    if (storedOtp.trim() === otp.trim()) {
      await redisClient.del(key);
      console.log("✅ OTP verified; key deleted");
      return res.status(200).json({ success: true });
    } else {
      console.log("❌ Provided OTP does not match");
      return res.status(400).json({ success: false, error: 'Invalid OTP' });
    }
  } catch (err) {
    console.error("🔥 Redis error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
