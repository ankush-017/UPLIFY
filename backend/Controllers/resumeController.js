import { supabase } from "../Config/supabaseClient.js";

export const uploadResumeController = async (req, res) => {

  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const fileExt = file.originalname.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `resumes/${fileName}`;

    const { error } = await supabase.storage
      .from("uplify-resumes")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype
      });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Upload failed"
      });
    }
    const { data } = supabase.storage
      .from("uplify-resumes")
      .getPublicUrl(filePath);

    res.status(200).json({
      success: true,
      url: data.publicUrl
    });

  } 
  catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }

};