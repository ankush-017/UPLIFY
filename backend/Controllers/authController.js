import User from '../Models/UserModel.js';
import { redisClient } from '../Utils/redisClient.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
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

// // SendOTP Controller
// export const sendOtpController = async (req, res) => {

//   const { email } = req.body;
//   if (!email) {
//     return res.status(400).json({ success: false, error: 'Email required' });
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   console.log('Generated OTP:', otp);

//   try {
//     // Send OTP via Email
//     await transporter.sendMail({
//       from: `"Uplify" <${process.env.EMAIL}>`,
//       to: email,
//       subject: 'Your Password Reset OTP',
//       html: `
//   <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
//     <h2 style="color: #2563eb; text-align: center;">🔐 Confirm Your Email</h2>
//     <p style="font-size: 16px; color: #374151;">
//       Thank you for choosing <strong>Uplify</strong>! To continue, please confirm your email address by entering the OTP code below.
//     </p>
//     <div style="text-align: center; margin: 30px 0;">
//       <div style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff; font-size: 24px; letter-spacing: 6px; border-radius: 6px;">
//         ${otp}
//       </div>
//     </div>
//     <p style="font-size: 14px; color: #6b7280;">
//       This OTP is valid for <strong>5 minutes</strong>. If you did not request this, you can safely ignore this email.
//     </p>
//     <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
//     <p style="font-size: 12px; color: #9ca3af; text-align: center;">
//       © ${new Date().getFullYear()} Uplify. All rights reserved.
//     </p>
//   </div>
// `,

//     });

//     console.log('OTP Email Sent');
//     // Save OTP in Redis with 5 minutes expiry
//     try {
//       await redisClient.set(`otp:${email}`, otp, { ex: 300 });
//       console.log("✅ OTP stored successfully");
//     } catch (error) {
//       console.error("❌ Error storing OTP in Redis:", error);
//     }


//     return res.status(200).send({
//       success: true,
//       message: 'OTP sent to your email',
//     });
//   }
//   catch (err) {
//     console.error('sendOtpController Error:', err);
//     return res.status(500).send({
//       success: false,
//       message: 'Something went wrong while sending OTP',
//       error: process.env.NODE_ENV === 'development' ? err.message : undefined,
//     });
//   }
// };

// Send OTP Controller
export const sendOtpController = async (req, res) => {
  console.log("🚀 [SEND OTP] Controller hit");

  const { email } = req.body;
  console.log("📩 Email received:", email);

  if (!email) {
    console.log("❌ Email missing in request body");
    return res.status(400).json({
      success: false,
      error: "Email required",
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("🔐 OTP generated:", otp);

  console.log("🧪 ENV CHECK:", {
    EMAIL: process.env.EMAIL,
    PASSWORD_EXISTS: !!process.env.PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
  });

  try {
    console.log("📤 Sending OTP email...");

    await transporter.sendMail({
      from: `"Uplify" <${process.env.EMAIL}>`,
      to: email,
      subject: "Your Password Reset OTP",
      html: `
        <div style="max-width:600px;margin:auto;padding:20px;font-family:Arial">
          <h2>Your OTP</h2>
          <h1>${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("✅ OTP email sent successfully");

    // Redis store
    try {
      console.log("💾 Storing OTP in Redis...");
      await redisClient.set(`otp:${email}`, otp, { ex: 300 });
      console.log("✅ OTP stored in Redis");
    } catch (redisError) {
      console.error("❌ Redis error:", redisError.message);
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });

  } catch (error) {
    console.error("❌ SEND OTP FAILED");
    console.error("🔥 Error message:", error.message);
    console.error("🔥 Full error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message, // TEMP: keep for debugging
    });
  }
};


// Verify OTP controller
export const verifyOtpController = async (req, res) => {

  try {
    const { email, otp } = req.body;
    console.log("Received email:", email);
    console.log("Received otp:", otp);

    const key = `otp:${email.trim().toLowerCase()}`;
    const storedOTP = await redisClient.get(key);
    console.log("Stored OTP:", storedOTP);

    // Trim both values
    const trimmedOtp = otp?.toString().trim();
    const trimmedStoredOtp = storedOTP?.toString().trim();

    console.log("Comparing:", trimmedOtp, "vs", trimmedStoredOtp);

    if (!trimmedStoredOtp || trimmedOtp !== trimmedStoredOtp) {
      console.log("Mismatch or expired");
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    await redisClient.set(`otp_verified:${email.trim().toLowerCase()}`, 'true', { ex: 600 });
    await redisClient.del(key);

    console.log("OTP verified successfully");
    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (err) {
    console.error('OTP Verification Error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
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