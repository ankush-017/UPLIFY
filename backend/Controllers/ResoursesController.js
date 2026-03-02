import { supabase } from "../Config/supabaseClient";

export const ResoursesController = async (req, res) => {

    try{
        const { data, error } = await supabase.from('resources').select('*');
        if(error){
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({ 
            success: true,
            courses: data 
        });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }

}