import React, { useState, useEffect } from 'react';
import { supabase } from '../../superbaseClient.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MessageSquare, Heart, Send, PlusCircle, Sparkles, Maximize2, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const CommunityPost = ({ filter }) => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [firebaseUid, setFirebaseUid] = useState(null);
  const [userName, setUserName] = useState(null);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    // 1. Initialize the base query
    let query = supabase
      .from('uplify_discussion')
      .select('*')
      .order('created_at', { ascending: false });

    // 2. Conditionally apply the time filter to the query variable
    if (filter && filter !== 'All Time') {
      const now = new Date();
      let filterDate;

      if (filter === 'Today') filterDate = new Date(now.setDate(now.getDate() - 1));
      else if (filter === 'Last 48h') filterDate = new Date(now.setDate(now.getDate() - 2));
      else if (filter === 'This Week') filterDate = new Date(now.setDate(now.getDate() - 7));
      else if (filter === 'This Month') filterDate = new Date(now.setMonth(now.getMonth() - 1));

      if (filterDate) {
        // Apply filter to the 'query' variable
        query = query.gte('created_at', filterDate.toISOString());
      }
    }

    // 3. Execute the query
    const { data: postsData, error: postError } = await query;

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
  }, [filter]);


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setFirebaseUid(user.uid);
        setUserName(user.displayName);
        setFirebaseUid(null);
        setUserName(null); // Clear on logout
      }
    });

    return () => unsubscribe();
  }, []);

  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`min-h-screen transition-colors duration-700 pb-24`}>

      {/* --- IMAGE LIGHTBOX (Bigger Image on Click) --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]">
            <X size={40} />
          </button>
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="relative z-[105] max-w-full max-h-full rounded-2xl shadow-2xl object-contain animate-in zoom-in-95 duration-300"
          />
        </div>
      )}

      {/* --- PREMIUM HEADER --- */}
      <header className="relative pt-16 pb-12 px-6 max-w-7xl mx-auto">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 blur-[120px] rounded-full opacity-50 ${darkMode ? 'bg-emerald-500/20' : 'bg-emerald-500/10'}`}></div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div className="text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 text-[10px] font-black tracking-[0.2em] uppercase transition-all ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700'
              }`}>
              <Sparkles size={12} className="animate-pulse" /> Community Feed
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
              <span className={darkMode ? 'text-white' : 'text-slate-900'}>Uplify</span>
              <span className="bg-gradient-to-r from-emerald-500 via-yellow-500 to-emerald-400 bg-clip-text text-transparent"> Circle</span>
            </h1>
          </div>

          {/* MAKE POST MOVED TO TOP RIGHT */}
          <button
            onClick={() => navigate('/user/uplify-community/make-post')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all shadow-lg hover:-translate-y-1 active:scale-95 ${darkMode ? 'bg-emerald-500 text-emerald-950 shadow-emerald-500/20' : 'bg-slate-900 text-white shadow-slate-900/20'
              }`}
          >
            <PlusCircle size={18} />
            Make a Post
          </button>
        </div>
      </header>

      {/* --- FEED SECTION --- */}
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {posts.map(p => (
          <div
            key={p.id}
            className={`group relative rounded-[2.5rem] transition-all duration-500 border shadow-xl ${darkMode ? 'bg-[#081508]/60 border-emerald-500/10 shadow-black' : 'bg-white border-slate-100 shadow-slate-200/50'
              }`}
          >
            <div className="p-6 md:p-10">
              {/* User Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400 to-emerald-500 p-[1px]">
                    <div className={`w-full h-full rounded-[11px] flex items-center justify-center font-black text-lg ${darkMode ? 'bg-black text-white' : 'bg-white text-emerald-950'}`}>
                      {p.user_name?.charAt(0) || 'U'}
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>{p.user_name || 'Elite Member'}</h3>
                    <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${darkMode ? 'text-emerald-500/40' : 'text-slate-400'}`}>
                      {new Date(p.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Layout */}
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className={p.image ? 'lg:col-span-8' : 'lg:col-span-12'}>
                  {/* TEXT MADE SMALLER FOR PREMIUM FEEL */}
                  <p className={`text-base md:text-lg leading-relaxed font-medium mb-8 ${darkMode ? 'text-emerald-50/80' : 'text-slate-700'}`}>
                    {p.message}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLike(p.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[11px] transition-all ${likes[p.id]
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                        : (darkMode ? 'bg-white/5 text-emerald-400 hover:bg-emerald-500/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100')
                        }`}
                    >
                      <Heart size={16} fill={likes[p.id] ? "currentColor" : "none"} />
                      {likes[p.id] || 0}
                    </button>

                    <button
                      onClick={() => setShowComments(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[11px] transition-all ${darkMode ? 'bg-yellow-500/10 text-yellow-500' : 'bg-yellow-50 text-yellow-700'
                        }`}
                    >
                      <MessageSquare size={16} />
                      {comments[p.id]?.length || 0}
                    </button>
                  </div>
                </div>

                {p.image && (
                  <div className="lg:col-span-4 relative group/img cursor-zoom-in" onClick={() => setSelectedImage(p.image)}>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity rounded-2xl z-10 flex items-center justify-center">
                      <Maximize2 className="text-white" size={24} />
                    </div>
                    <img
                      src={p.image}
                      alt="post"
                      className="w-full h-48 md:h-56 object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover/img:scale-[1.02]"
                    />
                  </div>
                )}
              </div>

              {/* Comments Section */}
              {showComments[p.id] && (
                <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-emerald-500/10' : 'border-slate-100'}`}>
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6 custom-scrollbar">
                    {comments[p.id]?.map(c => (
                      <div key={c.id} className="flex gap-3">
                        <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-black text-[10px] ${darkMode ? 'bg-white/5 text-yellow-500' : 'bg-slate-100 text-emerald-600'}`}>
                          {c.user_name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <span className={`block font-bold text-[9px] uppercase tracking-wider mb-0.5 ${darkMode ? 'text-emerald-500/60' : 'text-slate-400'}`}>
                            {c.user_name || 'Anonymous'}
                          </span>
                          <p className={`text-xs leading-relaxed ${darkMode ? 'text-emerald-100/70' : 'text-slate-600'}`}>
                            {c.comment_text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Comment Input */}
                  <div className={`flex gap-2 p-1.5 rounded-2xl border ${darkMode ? 'bg-black/40 border-emerald-500/10' : 'bg-slate-50 border-slate-200'}`}>
                    <input
                      type="text"
                      placeholder="Share a perspective..."
                      className="flex-1 bg-transparent px-4 py-2 text-xs outline-none"
                      style={{ color: darkMode ? 'white' : '#0f172a' }}
                      value={newComments[p.id] || ''}
                      onChange={e => setNewComments(prev => ({ ...prev, [p.id]: e.target.value }))}
                    />
                    <button
                      onClick={() => handleAddComment(p.id)}
                      className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityPost;