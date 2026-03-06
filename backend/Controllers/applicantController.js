import { supabase } from '../Config/supabaseClient.js'

export const deleteApplicantController = async (req, res) => {

  try {
    const { id } = req.params;
    const { error } = await supabase
      .from("applyapplications")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).send({
        success: false,
        message: error.message
      });
    }
    res.status(200).send({
      success: true,
      message: "Applicant deleted successfully"
    });

  } 
  catch (err) {
    res.status(500).send({
      success: false,
      message: "Server error"
    });
  }

};