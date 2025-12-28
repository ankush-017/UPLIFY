import React, { useState } from 'react';
import { supabase } from '../../../superbaseClient.js';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ImagePlus, Send, X, Sparkles } from 'lucide-react';

function MakePost() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Message can't be empty");
      return;
    }

    setLoading(true);
    let imageUrl = '';

    try {
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `post/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('uplify-images')
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('uplify-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase.from('uplify_discussion').insert([
        { image: imageUrl, message },
      ]);

      if (insertError) throw insertError;

      toast.success('Post shared to the Circle!');
      navigate('/user/uplify-community');
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-700 ${
      darkMode ? 'bg-[#020617]' : 'bg-slate-50'
    }`}>
      {/* Background Glows */}
      <div className={`absolute top-1/4 left-1/4 w-64 h-64 blur-[120px] rounded-full opacity-30 ${darkMode ? 'bg-emerald-500/20' : 'bg-emerald-500/10'}`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 blur-[120px] rounded-full opacity-30 ${darkMode ? 'bg-yellow-500/20' : 'bg-yellow-500/10'}`}></div>

      <form
        onSubmit={handleSubmit}
        className={`relative w-full max-w-2xl backdrop-blur-3xl p-8 rounded-[2.5rem] border transition-all duration-500 ${
          darkMode
            ? 'bg-[#081508]/40 border-emerald-500/10 shadow-[0_20px_80px_rgba(0,0,0,0.4)] text-white'
            : 'bg-white border-slate-200 shadow-[0_20px_80px_rgba(0,0,0,0.05)] text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-400 to-emerald-500 shadow-lg shadow-emerald-500/20">
            <Sparkles className="text-emerald-950" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tighter">Create Insight</h2>
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${darkMode ? 'text-emerald-500/50' : 'text-slate-400'}`}>
              Sharing with Uplify Circle
            </p>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative group">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share a perspective or update..."
            className={`w-full rounded-3xl p-6 text-base font-medium focus:outline-none border transition-all resize-none ${
              darkMode
                ? 'bg-black/40 border-white/5 focus:border-emerald-500/50 text-emerald-50 placeholder:text-emerald-900/50'
                : 'bg-slate-50 border-slate-100 focus:border-emerald-500 shadow-inner text-slate-800 placeholder:text-slate-400'
            }`}
            rows={6}
          />
        </div>

        {/* Image Preview Area */}
        {previewUrl && (
          <div className="relative mt-4 rounded-2xl overflow-hidden group">
            <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-2xl" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-rose-500 text-white rounded-full backdrop-blur-md transition-all"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-8">
          <label className={`flex items-center gap-2 cursor-pointer px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
            darkMode ? 'bg-white/5 text-emerald-400 hover:bg-emerald-500/10' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
          }`}>
            <ImagePlus size={18} />
            <span>{image ? 'Change Image' : 'Add Image'}</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 active:scale-95 disabled:opacity-50 ${
              darkMode 
                ? 'bg-emerald-500 text-emerald-950 shadow-emerald-500/20 hover:bg-yellow-400' 
                : 'bg-slate-900 text-white shadow-slate-900/20 hover:bg-emerald-600'
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Post <Send size={16} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
export default MakePost;