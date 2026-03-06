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
    const { form, resumeUrl, jobId, uid } = req.body;

    if (!form || !resumeUrl || !jobId || !uid) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // check if user already applied
    const { data: existing, error: checkError } = await supabase
      .from("applyapplications")
      .select("internship_id")
      .eq("uuid", uid)
      .eq("internship_id", jobId);

    if (checkError) {
      console.error("CHECK ERROR:", checkError);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    if (existing && existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Application already submitted"
      });
    }

    // insert application
    const { error: insertError } = await supabase
      .from("applyapplications")
      .insert([
        {
          internship_id: jobId,
          uid: uid,
          name: form.name,
          email: form.email,
          phone: form.phone,
          linkedin: form.linkedin,
          github: form.github,
          portfolio: form.portfolio,
          cover_letter: form.message,
          resume_url: resumeUrl
        }
      ]);

    if (insertError) {
      console.error("INSERT ERROR:", insertError);
      return res.status(500).json({
        success: false,
        message: "Submission failed"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully"
    });

  } 
  catch (err) {
    
    return res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};