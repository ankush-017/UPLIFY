import React, { useState, useEffect } from 'react';
import { supabase } from '../../superbaseClient.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { communityLight } from '../assets/image.js';

const CommunityPost = () => {

  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const { data: postsData, error: postError } = await supabase
      .from('uplify_discussion')
      .select('*')
      .order('created_at', { ascending: false });

    if (postError) {
      toast.error('Failed to load posts');
      return;
    }
    setPosts(postsData);
  };

  const fetchLikes = async () => {
    const { data, error } = await supabase.from('uplify_likes').select('*');
    if (!error) {
      const likeCount = {};
      data.forEach(like => {
        likeCount[like.post_id] = (likeCount[like.post_id] || 0) + 1;
      });
      setLikes(likeCount);
    }
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('uplify_comments')
      .select('*')
      .order('created_at');

    if (!error) {
      const grouped = {};
      data.forEach(comment => {
        if (!grouped[comment.post_id]) grouped[comment.post_id] = [];
        grouped[comment.post_id].push(comment);
      });
      setComments(grouped);
    }
  };

  const handleLike = async (postId) => {
    const userId = getAuth()?.currentUser?.uid;
    if (!userId) return toast.error("Please login to like a post.");

    const { data: existingLike, error: fetchError } = await supabase
      .from("uplify_likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error(fetchError);
      return toast.error("Error checking like status.");
    }

    if (existingLike) {
      // User already liked → remove the like
      const { error: deleteError } = await supabase
        .from("uplify_likes")
        .delete()
        .eq("id", existingLike.id); // delete by primary key ID

      if (deleteError) {
        console.error(deleteError);
        return toast.error("Failed to unlike post.");
      }

      toast.success("Unliked!");
    } else {
      // User has not liked yet → insert like
      const { error: insertError } = await supabase
        .from("uplify_likes")
        .insert([{ post_id: postId, user_id: userId }]);

      if (insertError) {
        console.error(insertError);
        return toast.error("Failed to like post.");
      }

      toast.success("Liked!");
    }

    // Fetch updated like count
    fetchLikes();
  };


  const handleAddComment = async (postId) => {
    const text = newComments[postId];
    if (!text?.trim()) return;

    const { error } = await supabase
      .from('uplify_comments')
      .insert([
        {
          post_id: postId,
          comment_text: text.trim(),
          user_id: firebaseUid,
          user_name: userName
        },
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      toast.error('Failed to add comment');
    } else {
      fetchComments();
      setNewComments(prev => ({ ...prev, [postId]: '' }));
    }
  };


  useEffect(() => {
    fetchPosts();
    fetchLikes();
    fetchComments();
  }, []);

  const [firebaseUid, setFirebaseUid] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setFirebaseUid(user.uid);
        setUserName(user.displayName); // 🆕 Save user name
      } else {
        setFirebaseUid(null);
        setUserName(null); // Clear on logout
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-8 text-blue-700">
        Uplify Community Posts
      </h1>
      <div className="max-w-4xl h-screen overflow-y-auto mx-auto md:px-4 pb-2">


        {posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No posts available.</p>
        ) : (
          <div className="grid gap-6">
            {posts.map(p => (
              <div
                key={p.id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="md:flex items-start">
                  <div className="flex-1 p-6">
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {p.message}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Posted on {new Date(p.created_at).toLocaleString()}
                    </p>

                    {/* Likes & Comment Count */}
                    <div className="mt-4 flex items-center gap-4">
                      <button
                        onClick={() => handleLike(p.id)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                      >
                        👍 {likes[p.id] || 0} Like
                      </button>

                      <button
                        onClick={() =>
                          setShowComments(prev => ({
                            ...prev,
                            [p.id]: !prev[p.id],
                          }))
                        }
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
                      >
                        💬 {comments[p.id]?.length || 0} Comment{(comments[p.id]?.length || 0) !== 1 ? 's' : ''}
                      </button>
                    </div>
                    {/* Comment List + Input — toggleable */}
                    {showComments[p.id] && (
                      <div className="mt-6">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Comments:</h3>

                        {comments[p.id]?.map(c => (
                          <div key={c.id} className="mb-2">
                            <p className="text-sm text-gray-800 dark:text-gray-200">
                              <span className="font-medium text-blue-600 dark:text-blue-400">
                                {c.user_name || 'Unknown'}
                              </span>
                              <span className="ml-1 text-gray-700 dark:text-gray-300">
                                {c.comment_text}
                              </span>
                            </p>
                          </div>
                        ))}

                        <div className="mt-2 flex gap-2">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-1 px-2 py-1 text-white rounded border bg-gray-800"
                            value={newComments[p.id] || ''}
                            onChange={e =>
                              setNewComments(prev => ({ ...prev, [p.id]: e.target.value }))
                            }
                          />
                          <button
                            onClick={() => handleAddComment(p.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    )}

                  </div>

                  {p.image && (
                    <div className="md:w-44 p-2 w-full md:h-auto h-56 overflow-hidden">
                      <img
                        src={p.image}
                        alt="post"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-7 flex justify-center">
        <button
          onClick={() => navigate('/user/uplify-community/make-post')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-200 shadow-md"
        >
          ✍️ Make a Post
        </button>
      </div>
    </div>
  );
}

export default CommunityPost;