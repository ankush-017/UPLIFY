import React, { useState } from 'react';
import { supabase } from '../../../superbaseClient.js';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MakePost() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();

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

        if (uploadError) {
          console.error('Upload Error:', uploadError);
          toast.error('Image upload failed');
          setLoading(false);
          return;
        }

        const { data: publicUrlData, error: publicUrlError } = supabase
          .storage
          .from('uplify-images')
          .getPublicUrl(filePath);

        if (publicUrlError || !publicUrlData?.publicUrl) {
          toast.error('Could not get image URL');
          setLoading(false);
          return;
        }

        imageUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase.from('uplify_discussion').insert([
        { image: imageUrl, message },
      ]);

      if (insertError) {
        toast.error('Could not submit post');
        setLoading(false);
        return;
      }

      toast.success('Post submitted!');
      setMessage('');
      setImage(null);
      navigate('/user/uplify-community');
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`h-[70vh] flex items-center justify-center px-4 ${
        darkMode ? 'bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]' : 'bg-gradient-to-br from-gray-50 to-white'
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-2xl backdrop-blur-xl p-6 rounded-3xl border ${
          darkMode
            ? 'bg-white/5 border-gray-700 shadow-[0_4px_30px_rgba(0,0,0,0.3)] text-white'
            : 'bg-white/60 border-gray-200 shadow-xl text-gray-900'
        } transition-all duration-300`}
      >
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>
          📢 Share Your Thoughts
        </h2>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          className={`w-full rounded-xl p-4 text-sm focus:outline-none focus:ring-2 resize-none transition ${
            darkMode
              ? 'bg-black/30 border border-gray-600 text-white focus:ring-blue-600 placeholder-gray-400'
              : 'bg-gray-100 border border-gray-300 text-gray-800 focus:ring-blue-400 placeholder-gray-500'
          }`}
          rows={5}
        />

        <div className="flex items-center justify-between mt-4 gap-4 flex-col sm:flex-row">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0])}
            className={`text-sm ${darkMode?"text-blue-300":"text-blue-600"}`}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
export default MakePost;