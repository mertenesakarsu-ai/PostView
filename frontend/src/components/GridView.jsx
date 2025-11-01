import React, { useState } from 'react';
import { Eye, Trash2, GripVertical } from 'lucide-react';

const GridView = ({ posts, onReorder, onSelectPost, selectedPost, onDeletePost }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newPosts = [...posts];
    const draggedPost = newPosts[draggedItem];
    newPosts.splice(draggedItem, 1);
    newPosts.splice(index, 0, draggedPost);
    onReorder(newPosts);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-200">Instagram Grid Preview</h2>
        <span className="text-xs text-gray-500">{posts.length} posts</span>
      </div>
      
      {posts.length === 0 ? (
        <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center border border-dashed border-gray-700">
          <p className="text-gray-500 text-sm">Upload media to start building your grid</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 bg-black p-1 rounded-lg">
          {posts.map((post, index) => (
            <div
              key={post.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => onSelectPost(post)}
              className={`aspect-square relative group cursor-pointer overflow-hidden rounded-sm ${
                selectedPost?.id === post.id ? 'ring-2 ring-pink-400' : ''
              } ${draggedItem === index ? 'opacity-50' : ''}`}
            >
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 text-white text-sm">
                  <Eye className="w-4 h-4" />
                  <span>{post.views}</span>
                </div>
              </div>

              {/* Drag Handle */}
              <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-5 h-5 text-white drop-shadow-lg" />
              </div>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePost(post.id);
                }}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/90 hover:bg-red-600 rounded-full p-1.5"
              >
                <Trash2 className="w-3.5 h-3.5 text-white" />
              </button>

              {/* Caption Indicator */}
              {post.caption && (
                <div className="absolute bottom-1 left-1 bg-purple-500/90 rounded-full px-2 py-0.5 text-xs text-white">
                  Caption
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GridView;