import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Volume2, VolumeX, Play } from 'lucide-react';

const ReelsView = ({ posts, onSelectPost }) => {
  const [mutedVideos, setMutedVideos] = useState({});

  const toggleMute = (postId) => {
    setMutedVideos(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-900/50 rounded-xl border border-gray-800">
        <p className="text-gray-500">Henüz gönderi yok. Yukarıdan dosya yükleyin.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 group cursor-pointer"
            style={{ aspectRatio: '9/16', maxHeight: '650px' }}
            onClick={() => onSelectPost(post)}
          >
            {/* Media */}
            <div className="absolute inset-0">
              {post.isVideo ? (
                <video
                  src={post.image}
                  className="w-full h-full object-cover"
                  loop
                  autoPlay
                  muted={mutedVideos[post.id] !== false}
                  playsInline
                />
              ) : (
                <img
                  src={post.image}
                  alt="Reel"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

            {/* Top Right - More Options */}
            <div className="absolute top-4 right-4 z-10">
              <button className="text-white drop-shadow-lg hover:scale-110 transition-transform">
                <MoreHorizontal className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">P</span>
                </div>
                <span className="text-white font-semibold text-sm drop-shadow-lg">postview_app</span>
              </div>

              {/* Caption Preview */}
              {post.caption && (
                <p className="text-white text-sm mb-2 line-clamp-2 drop-shadow-lg">
                  {post.caption}
                </p>
              )}

              {/* Views */}
              {post.views && (
                <div className="text-white/80 text-xs drop-shadow-lg">
                  {post.views.toLocaleString('tr-TR')} görüntülenme
                </div>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6 z-10">
              <button className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 drop-shadow-lg" />
                <span className="text-xs drop-shadow-lg">125</span>
              </button>
              
              <button className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 drop-shadow-lg" />
                <span className="text-xs drop-shadow-lg">34</span>
              </button>
              
              <button className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform">
                <Send className="w-7 h-7 drop-shadow-lg" />
              </button>
              
              <button className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform">
                <Bookmark className="w-7 h-7 drop-shadow-lg" />
              </button>

              {/* Volume Control for Videos */}
              {post.isVideo && (
                <button 
                  className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute(post.id);
                  }}
                >
                  {mutedVideos[post.id] !== false ? (
                    <VolumeX className="w-7 h-7 drop-shadow-lg" />
                  ) : (
                    <Volume2 className="w-7 h-7 drop-shadow-lg" />
                  )}
                </button>
              )}
            </div>

            {/* Play Icon Overlay for Videos */}
            {post.isVideo && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsView;
