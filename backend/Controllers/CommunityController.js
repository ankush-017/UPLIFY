import { supabase } from '../Config/supabaseClient.js';

export const GetCommunityPosts = async (req, res) => {

    try {

        const filter = req.query.filter || "All Time";

        let query = supabase
            .from("uplify_discussion")
            .select("*")
            .order("created_at", { ascending: false });

        if (filter !== "All Time") {
            const now = new Date();
            let filterDate;

            if (filter === "Today") {
                filterDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            }
            else if (filter === "Last 48h") {
                filterDate = new Date(now.getTime() - 48 * 60 * 60 * 1000);
            }
            else if (filter === "This Week") {
                filterDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            }
            else if (filter === "This Month") {
                filterDate = new Date();
                filterDate.setMonth(filterDate.getMonth() - 1);
            }

            if (filterDate) {
                query = query.gte("created_at", filterDate.toISOString());
            }
        }

        const { data, error } = await query;

        if (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching community posts",
            });
        }

        res.status(200).json({
            success: true,
            post: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


export const GetPostLikes = async (req, res) => {

    try {
        const { data, error } = await supabase.from('uplify_likes').select('*');
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching likes",
            });
        }
        res.status(200).json({
            success: true,
            likes: data
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error while fetching likes"
        });
    }

}

export const getComments = async (req, res) => {

    try {
        const { data, error } = await supabase.from('uplify_comments').select('*').order('created_at', { ascending: true });

        if (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching comments"
            });
        }
        res.status(200).json({
            success: true,
            comments: data
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error while fetching comments"
        });
    }

}

export const toggleLike = async (req, res) => {

    try {
        const { postId, userId } = req.body;

        if (!postId || !userId) {
            return res.status(400).json({
                success: false,
                message: "postId and userId required",
            });
        }
        // check if like already exists
        const { data: existingLike, error: fetchError } = await supabase
            .from("uplify_likes")
            .select("*")
            .eq("post_id", postId)
            .eq("user_id", userId)
            .maybeSingle();

        if (fetchError) {
            return res.status(500).json({
                success: false,
                message: "Error checking like status",
            });
        }

        // if exists → delete (unlike)
        if (existingLike) {
            const { error: deleteError } = await supabase
                .from("uplify_likes")
                .delete()
                .eq("id", existingLike.id);

            if (deleteError) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to unlike post",
                });
            }

            return res.status(200).json({
                success: true,
                action: "unliked",
            });
        }

        // Else → insert like
        const { error: insertError } = await supabase
            .from("uplify_likes")
            .insert([{ post_id: postId, user_id: userId }]);

        if (insertError) {
            return res.status(500).json({
                success: false,
                message: "Failed to like post",
            });
        }

        return res.status(200).json({
            success: true,
            action: "liked",
        });

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


export const addComment = async (req, res) => {

    try {
        const { postId, text, userId, userName } = req.body;

        if (!postId || !text || !userId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const { data, error } = await supabase
            .from("uplify_comments")
            .insert([
                {
                    post_id: postId,
                    comment_text: text.trim(),
                    user_id: userId,
                    user_name: userName,
                },
            ])
            .select(); // return inserted row

        if (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to add comment",
            });
        }

        return res.status(200).json({
            success: true,
            comment: data[0], // send new comment back
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }

};


export const uploadImagePost = async (req, res) => {

    try {
        const { filePath, file } = req.body;
        if (!filePath || !file) {
            return res.status(400).json({
                success: false,
                message: "filePath and file are required",
            });
        }
        const { error: uploadError } = await supabase.storage.from('uplify-images').upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = await supabase.storage.from('uplify-images').getPublicUrl(filePath);
        return res.status(200).json({
            success: true,
            publicUrl: publicUrlData.publicUrl,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error during image upload",
        });
    }

};

export const createPost = async (req, res) => {

    try {
        const { message, image } = req.body;
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "message and userId are required",
            });
        }
        const { data, error } = await supabase.from("uplify_discussion")
            .insert([
                {
                    message: message.trim(),
                    image: image || null,
                    user_id: userId,
                },
            ]).select(); // return inserted row
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to create post",
            });
        }

        return res.status(200).json({
            success: true,
            post: data[0],
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error during post creation",
        });
    }

}