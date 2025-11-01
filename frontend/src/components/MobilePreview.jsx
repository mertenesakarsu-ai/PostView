import React from 'react';
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Home, Search, PlusSquare, PlayCircle, User } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

const MobilePreview = ({ posts, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative">
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 text-white hover:bg-white/20"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Mobile Frame */}
        <div className="w-[375px] h-[667px] bg-black rounded-[3rem] border-[14px] border-gray-900 shadow-2xl overflow-hidden">
          {/* Status Bar */}
          <div className="bg-black px-6 py-2 flex items-center justify-between text-white text-xs">
            <span className="font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-3 border border-white rounded-sm" />
              <div className="w-4 h-3 border border-white rounded-sm" />
              <div className="w-4 h-3 bg-white rounded-sm" />
            </div>
          </div>

          {/* Instagram Header */}
          <div className="bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'cursive' }}>Instagram</h1>
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-white" />
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Profile Section */}
          <ScrollArea className="h-[calc(667px-140px)] bg-black">
            <div className="px-4 py-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-2xl">
                      🚤
                    </div>
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-sm">queenatlantisyacht</h2>
                    <p className="text-gray-400 text-xs">Queen Atlantis Yacht</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 mb-3">
                <div className="text-center">
                  <div className="text-white font-semibold">{posts.length}</div>
                  <div className="text-gray-400 text-xs">posts</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">59</div>
                  <div className="text-gray-400 text-xs">followers</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">44</div>
                  <div className="text-gray-400 text-xs">following</div>
                </div>
              </div>
              <p className="text-white text-xs leading-relaxed">
                📍 Based in Fethiye/Turkey<br />
                Embark on luxury adventures aboard our 36m charter motor sailor! 🛥️ ⛵
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-0.5">
              {posts.map((post) => (
                <div key={post.id} className="aspect-square bg-gray-900 relative group">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                  {post.caption && (
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-center justify-center">
                      <p className="text-white text-[8px] line-clamp-6 text-center">
                        {post.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Bottom Navigation */}
          <div className="bg-black border-t border-gray-800 px-8 py-2 flex items-center justify-between">
            <Home className="w-6 h-6 text-white" />
            <Search className="w-6 h-6 text-gray-500" />
            <PlusSquare className="w-6 h-6 text-gray-500" />
            <PlayCircle className="w-6 h-6 text-gray-500" />
            <User className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;