import { supabase } from "../Config/supabaseClient.js";

export const MyApplicationController = async (req, res) => {

    const { uid } = req.params;
    try {
        const { data, error } = await supabase
            .from('applyapplications')
            .select(`*, internships(*)`)
            .eq('uid', uid);

        if (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
        res.status(200).json({
            success: true,
            applications: data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


export const applyJobController = async (req, res) => {

  try {
    const { form, resumeUrl, internshipId, uid } = req.body;
    // check existing application
    const { data: existing } = await supabase
      .from("applyapplications")
      .select("*")
      .eq("uid", uid)
      .eq("internship_id", internshipId);

    if (existing && existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Application already submitted"
      });
    }

    const { error } = await supabase
      .from("applyapplications")
      .insert([
        {
          ...form,
          resume_url: resumeUrl,
          internship_id: internshipId,
          uid
        }
      ]);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Submission failed"
      });
    }

    res.status(200).json({
      success: true,
      message: "Application submitted successfully"
    });

  } 
  catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }

};