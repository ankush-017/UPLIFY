import User from '../Models/UserModel.js';
import { redisClient } from '../Utils/redisClient.js';
import dotenv from 'dotenv';
import crypto from "crypto";
import sgMail from "../Config/sendgrid.js";

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
}

// SendOTP Controller

export const sendOtpController = async (req, res) => {
  try {
    console.log("🚀 [SEND OTP] Controller hit");

    const { email } = req.body;
    console.log("📩 Email received:", email);

    if (!email) {
      console.log("❌ Email missing in request body");
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("🔐 OTP generated");

    // Hash OTP before storing
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    console.log("🔒 OTP hashed");

    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: "Your OTP Code",
      html: `
        <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2>Your OTP</h2>
          <h1>${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    };

    console.log("📤 Sending OTP via SendGrid API...");
    await sgMail.send(msg);
    console.log("✅ OTP email sent successfully");

    console.log("💾 Storing OTP in Redis...");
    await redisClient.set(
      `otp:${email.toLowerCase()}`,
      hashedOtp,
      { ex: 300 }
    );
    console.log("✅ OTP stored in Redis (expires in 5 min)");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("❌ Send OTP Error");
    console.error("Message:", error.message);
    console.error("Full Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

// Verify OTP controller

export const verifyOtpController = async (req, res) => {

  try {
    const { email, otp } = req.body;

    const key = `otp:${email.toLowerCase()}`;
    const storedHashedOtp = await redisClient.get(key);

    if (!storedHashedOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or invalid",
      });
    }

    const hashedInputOtp = crypto
      .createHash("sha256")
      .update(otp.toString())
      .digest("hex");

    if (hashedInputOtp !== storedHashedOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await redisClient.del(key);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};

// userVerifybyEmailController 
export const userVerifybyEmailController = async (req, res) => {

  const { Email } = req.body;
  const user = await User.findOne({ email: Email });
  if (user) {
    res.status(200).send({
      success: true
    })
  }
  else {
    res.status(200).send({
      success: false
    })
  }

}

// getuserControllerbyUID
export const getuserControllerbyUID = async (req, res) => {

  const { uid } = req.params;
  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      user,
    });
  }
  catch (err) {
    console.error("Error fetching user by UID:", err);
    return res.status(500).send({
      success: false,
      message: "Server error while fetching user details",
    });
  }
};

// updateProfileComtroller
export const updateProfileController = async (req, res) => {

  const { uid, name, email, phone } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { name, email, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  }
  catch (err) {
    console.error("Update Profile Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error on update profile",
    });
  }
};

// allUserController
export const allUserController = async (req, res) => {

  try {
    const alluser = await User.find({});
    res.status(200).send({
      success: true,
      alluser
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
    })
  }

}