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