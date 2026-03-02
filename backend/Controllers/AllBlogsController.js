import { supabase } from "../Config/supabaseClient.js";

export const AllBlogsController = async (req, res) => {

    try{
        const { data, error } = await supabase.from('blogs').select('*');
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({
            success: true,
            blogs: data
        })
    } 
    catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({
            status: false,
            error: 'Failed to fetch blogs' 
        });
    }

}