import { supabase } from "../Config/supabaseClient.js";

export const getAllInternshipsAndJobsController = async (req, res) => {
  console.log("Controller Hit ✅");

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