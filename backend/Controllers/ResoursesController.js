import { supabase } from "../Config/supabaseClient.js";

export const ResoursesController = async (req, res) => {

    try {
        const { data, error } = await supabase.from('resources').select('*');
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({
            success: true,
            courses: data
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}


export const addResourcesController = async (req, res) => {

    try {
        const resourceData = req.body;

        const { data, error } = await supabase
            .from("resources")
            .insert([resourceData]);

        if (error) {
            console.log("Supabase error:", error);
            return res.status(400).send({
                success: false,
                message: "Failed to add resource",
                error: error.message
            });
        }

        res.status(200).send({
            success: true,
            message: "Resource added successfully",
            data
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