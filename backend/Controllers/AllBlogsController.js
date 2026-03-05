import { supabase } from "../Config/supabaseClient.js";

export const AllBlogsController = async (req, res) => {

    try {
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

export const AddBlogController = async (req, res) => {

    try {
        const { title, excerpt, author, category, image, fullContent, date } = req.body;
        const { error } = await supabase.from('blogs').insert([
            {
                title,
                excerpt,
                author,
                category,
                image,
                fullContent: fullContent.trim(), // Save as Markdown or plain text
                date
            }
        ]);
        if (error) {
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'Blog added successfully'
        });
    }
    catch (err) {
        console.error('Error adding blog:', err);
        res.status(500).json({
            status: false,
            error: 'Failed to add blog'
        });
    }
}


export const updateBlogController = async (req, res) => {

    const { id } = req.params;
    const updates = req.body;

    try {
        const { data, error } = await supabase
            .from("blogs")
            .update(updates)
            .eq("id", id)
            .select();

        if (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to update blog",
            });
        }
        res.json({
            success: true,
            data,
        });

    } 
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error while updating blog",
        });
    }

};