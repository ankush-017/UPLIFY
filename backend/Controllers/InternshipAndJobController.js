import { supabase } from "../Config/supabaseClient.js";

export const getAllInternshipsAndJobsController = async (req, res) => {
  console.log("Controller Hi");

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabase
      .from("internships")
      .select("*")
      .eq("status", "approved")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      job: data,
    })

  }
  catch (err) {
    console.error("Backend error:", err);
    return res.status(500).json({ error: "Server error" });
  }

};


export const postInternshipOrJobController = async (req, res) => {

  const { title, company, location, stipend, type, job_type, link, source_type, skills } = req.body;

  try {
    const { data, error } = await supabase
      .from("internships")
      .insert([
        {
          title,
          company,
          location,
          stipend,
          type,
          job_type,
          link,
          source_type,
          skills,
          status: "pending"
        }
      ]);

    if (error) {
      console.error("Error inserting internship or job:", error);
      return res.status(500).json({ error: "Failed to post internship or job" });
    }

    return res.status(201).json({
      success: true,
    });
  }
  catch (err) {
    console.error("Error inserting internship or job:", err);
    return res.status(500).json({
      error: "Failed to post internship or job"
    });
  }

}


export const deleteInternshipOrJobController = async (req, res) => {

  try {
    const { id } = req.params;   // get id from URL
    const { error } = await supabase
      .from("internships")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).send({
        success: false,
        message: "Error while deleting internship",
        error
      });
    }

    res.status(200).send({
      success: true,
      message: "Internship deleted successfully"
    });

  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error"
    });
  }
};


export const getSingleInternshipController = async (req, res) => {
  try {

    const { id } = req.params;

    const { data, error } = await supabase
      .from("internships")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(400).send({
        success: false,
        message: "Error fetching internship",
        error
      });
    }

    res.status(200).send({
      success: true,
      data
    });

  }
  catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Server error"
    });
  }
};


export const updateInternshipController = async (req, res) => {
  try {

    const { id } = req.params;
    const formData = req.body;
    const { data, error } = await supabase
      .from("internships")
      .update(formData)
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).send({
        success: false,
        message: "Error updating internship",
        error
      });
    }

    res.status(200).send({
      success: true,
      message: "Internship updated successfully",
      data
    });

  }
  catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Server error"
    });
  }

};


export const getPendingInternshipsController = async (req, res) => {

  try {
    const { data, error } = await supabase.from('internships').select('*').eq('status', pending).order('created_at', { ascending: false });
    if (error) {
      console.log("Supabase error:", error);

      return res.status(400).send({
        success: false,
        message: "Failed to fetch pending internships",
        error: error.message
      });
    }

    res.status(200).send({
      success: true,
      internships: data
    });

  } 
  catch (error) {
    console.log("Server error:", error);

    res.status(500).send({
      success: false,
      message: "Server error"
    });
  }

};


export const approveInternshipController = async (req, res) => {

  try {
    const { id } = req.params;
    const { error } = await supabase
      .from("internships")
      .update({ status: "approved" })
      .eq("id", id);

    if (error) {
      return res.status(400).send({
        success: false,
        message: "Approval failed",
        error
      });
    }
    res.status(200).send({
      success: true,
      message: "Internship approved"
    });

  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error"
    });
  }

};


export const rejectInternshipController = async (req, res) => {

  try {
    const { id } = req.params;
    const { error } = await supabase
      .from("internships")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).send({
        success: false,
        message: "Deletion failed",
        error
      });
    }
    res.status(200).send({
      success: true,
      message: "Internship deleted"
    });

  }
  catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Server error"
    });
  }

};