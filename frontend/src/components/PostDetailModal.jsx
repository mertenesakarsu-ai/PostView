import React from 'react';
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';

const PostDetailModal = ({ post, onClose, onUpdateCaption }) => {
  if (!post) return null;

  const handleCaptionChange = (e) => {
    onUpdateCaption(post.id, e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-6xl h-[90vh] bg-black flex flex-col md:flex-row" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side - Media */}
        <div className="flex-1 bg-black flex items-center justify-center">
          {post.isVideo ? (
            <video
              src={post.image}
              controls
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <img
              src={post.image}
              alt="Post"
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>

        {/* Right Side - Instagram Style Info */}
        <div className="w-full md:w-[400px] bg-black border-l border-gray-800 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
                <span className="text-white text-sm font-bold">P</span>
              </div>
              <span className="text-white font-semibold text-sm">postview_app</span>
            </div>
            <button className="text-white">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Caption Section */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">P</span>
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <span className="text-white font-semibold text-sm mr-2">postview_app</span>
                </div>
                <textarea
                  value={post.caption || ''}
                  onChange={handleCaptionChange}
                  placeholder="Açıklama ekle..."
                  className="w-full bg-transparent text-gray-300 text-sm resize-none border-none focus:outline-none focus:ring-0 min-h-[100px]"
                />
              </div>
            </div>
            
            {/* Views Stats */}
            {post.views && (
              <div className="text-gray-500 text-xs ml-11">
                {post.views.toLocaleString('tr-TR')} görüntülenme
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button className="text-white hover:text-gray-300 transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="text-white hover:text-gray-300 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button className="text-white hover:text-gray-300 transition-colors">
                  <Send className="w-6 h-6" />
                </button>
              </div>
              <button className="text-white hover:text-gray-300 transition-colors">
                <Bookmark className="w-6 h-6" />
              </button>
            </div>
            
            {/* Time */}
            <div className="text-gray-500 text-xs uppercase">
              {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
