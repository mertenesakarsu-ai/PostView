import React from 'react';
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Home, Search, PlusSquare, PlayCircle, User } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

const MobilePreview = ({ posts, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Close Button - Fixed at top right of screen */}
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="fixed top-6 right-6 text-white hover:bg-red-500 z-[60] bg-gray-800 rounded-full w-12 h-12 border-2 border-white/20 hover:border-red-400 transition-all shadow-xl"
      >
        <X className="w-7 h-7" />
      </Button>
      
      <div className="relative max-w-[500px] w-full">

        {/* Mobile Frame - Larger Size */}
        <div className="w-[450px] h-[900px] bg-black rounded-[3rem] border-[14px] border-gray-900 shadow-2xl overflow-hidden">
          {/* Status Bar */}
          <div className="bg-black px-6 py-3 flex items-center justify-between text-white text-sm">
            <span className="font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-5 h-4 border border-white rounded-sm" />
              <div className="w-5 h-4 border border-white rounded-sm" />
              <div className="w-5 h-4 bg-white rounded-sm" />
            </div>
          </div>

          {/* Instagram Header */}
          <div className="bg-black border-b border-gray-800 px-5 py-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'cursive' }}>Instagram</h1>
            <div className="flex items-center gap-4">
              <Heart className="w-7 h-7 text-white" />
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Profile Section */}
          <ScrollArea className="h-[calc(900px-180px)] bg-black">
            <div className="px-5 py-5 border-b border-gray-800">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl">
                      🚤
                    </div>
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-base">queenatlantisyacht</h2>
                    <p className="text-gray-400 text-sm mt-1">Queen Atlantis Yacht</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-10 mb-4">
                <div className="text-center">
                  <div className="text-white font-semibold text-lg">{posts.length}</div>
                  <div className="text-gray-400 text-sm">posts</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold text-lg">59</div>
                  <div className="text-gray-400 text-sm">followers</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold text-lg">44</div>
                  <div className="text-gray-400 text-sm">following</div>
                </div>
              </div>
              <p className="text-white text-sm leading-relaxed">
                📍 Based in Fethiye/Turkey<br />
                Embark on luxury adventures aboard our 36m charter motor sailor! 🛥️ ⛵
              </p>
            </div>

            {/* Grid - Instagram exact proportions */}
            <div className="grid grid-cols-3 bg-[#262626]" style={{ gap: '2px' }}>
              {posts.map((post) => (
                <div key={post.id} className="aspect-square bg-black relative group overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                  {post.caption && (
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-center justify-center">
                      <p className="text-white text-[10px] line-clamp-4 text-center leading-tight">
                        {post.caption.substring(0, 100)}...
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Bottom Navigation */}
          <div className="bg-black border-t border-gray-800 px-10 py-3 flex items-center justify-between">
            <Home className="w-7 h-7 text-white" />
            <Search className="w-7 h-7 text-gray-500" />
            <PlusSquare className="w-7 h-7 text-gray-500" />
            <PlayCircle className="w-7 h-7 text-gray-500" />
            <User className="w-7 h-7 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;