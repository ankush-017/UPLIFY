import User from '../Models/UserModel.js';
import { redisClient } from '../Utils/redisClient.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from "crypto";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

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
    console.log("[SEND OTP] Controller hit");

    const { email } = req.body;
    if (!email) {
      console.log("❌ Email missing");
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("🔐 OTP generated:", otp);

    // (Best practice) Hash OTP before storing
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    console.log("📤 Sending OTP email via SendGrid...");

    // Send email using SendGrid
    await transporter.sendMail({
      from: `"Uplify" <${process.env.SENDGRID_SENDER_EMAIL}>`, // MUST be verified
      to: email,
      subject: "Your Password Reset OTP",
      html: `
        <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h2 style="color: #2563eb; text-align: center;">🔐 Confirm Your Email</h2>
          <p style="font-size: 16px; color: #374151;">
            Thank you for choosing <strong>Uplify</strong>! To continue, please confirm your email address by entering the OTP code below.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff; font-size: 24px; letter-spacing: 6px; border-radius: 6px;">
              ${otp}
            </div>
          </div>
          <p style="font-size: 14px; color: #6b7280;">
            This OTP is valid for <strong>5 minutes</strong>. If you did not request this, you can safely ignore this email.
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">
            © ${new Date().getFullYear()} Uplify. All rights reserved.
          </p>
        </div>
      `,
    });

    console.log("✅ OTP email sent successfully");

    // Store hashed OTP in Redis (5 minutes expiry)
    try {
      await redisClient.set(`otp:${email}`, hashedOtp, { ex: 300 });
      console.log("✅ OTP stored in Redis");
    } catch (redisError) {
      console.error("❌ Redis error:", redisError.message);
      // Email already sent, so we don’t fail the request
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });

  } catch (error) {
    console.error("❌ sendOtpController Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again later.",
    });
  }
};


// Verify OTP controller

export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log("📩 Received email:", email);
    console.log("🔐 Received OTP:", otp);

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const key = `otp:${normalizedEmail}`;

    // Get hashed OTP from Redis
    const storedHashedOtp = await redisClient.get(key);
    console.log("📦 Stored OTP (hashed):", storedHashedOtp);

    if (!storedHashedOtp) {
      console.log("⏰ OTP expired or not found");
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Hash user-entered OTP
    const hashedInputOtp = crypto
      .createHash("sha256")
      .update(otp.toString().trim())
      .digest("hex");

    console.log("🔍 Comparing hashes:");
    console.log("User OTP hash:", hashedInputOtp);
    console.log("Stored OTP hash:", storedHashedOtp);

    if (hashedInputOtp !== storedHashedOtp) {
      console.log("❌ OTP mismatch");
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Mark OTP as verified (optional)
    await redisClient.set(`otp_verified:${normalizedEmail}`, "true", { ex: 600 });

    // Delete OTP so it can be used only once
    await redisClient.del(key);

    console.log("✅ OTP verified successfully");

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (err) {
    console.error("❌ OTP Verification Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
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