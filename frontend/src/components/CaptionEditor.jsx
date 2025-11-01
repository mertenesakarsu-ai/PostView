import React, { useState, useEffect } from 'react';
import { Smile, Hash, AtSign, Type } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const CaptionEditor = ({ selectedPost, onUpdateCaption }) => {
  const [caption, setCaption] = useState('');
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 2200;

  useEffect(() => {
    if (selectedPost) {
      setCaption(selectedPost.caption || '');
      setCharCount(selectedPost.caption?.length || 0);
    }
  }, [selectedPost]);

  const handleCaptionChange = (e) => {
    const newCaption = e.target.value;
    if (newCaption.length <= MAX_CHARS) {
      setCaption(newCaption);
      setCharCount(newCaption.length);
    }
  };

  const handleSave = () => {
    if (selectedPost) {
      onUpdateCaption(selectedPost.id, caption);
    }
  };

  const insertText = (text) => {
    const newCaption = caption + text;
    if (newCaption.length <= MAX_CHARS) {
      setCaption(newCaption);
      setCharCount(newCaption.length);
    }
  };

  if (!selectedPost) {
    return (
      <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6 h-fit">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Caption Editor</h2>
        <div className="flex items-center justify-center h-40 border border-dashed border-gray-700 rounded-lg">
          <p className="text-sm text-gray-500">Select a post to edit caption</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6 sticky top-24">
      <h2 className="text-lg font-semibold mb-4 text-gray-200">Caption Editor</h2>
      
      {/* Preview Image */}
      <div className="aspect-square rounded-lg overflow-hidden mb-4 border border-gray-800">
        <img
          src={selectedPost.image}
          alt="Selected post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Quick Insert Buttons */}
      <div className="flex gap-2 mb-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => insertText('😊')}
          className="flex-1 border-gray-700 hover:border-pink-400 transition-colors"
        >
          <Smile className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => insertText('#')}
          className="flex-1 border-gray-700 hover:border-purple-400 transition-colors"
        >
          <Hash className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => insertText('@')}
          className="flex-1 border-gray-700 hover:border-blue-400 transition-colors"
        >
          <AtSign className="w-4 h-4" />
        </Button>
      </div>

      {/* Caption Textarea */}
      <Textarea
        value={caption}
        onChange={handleCaptionChange}
        placeholder="Write your caption here... Add emojis, hashtags, and mentions!"
        className="min-h-[150px] bg-gray-900 border-gray-700 focus:border-pink-400 transition-colors resize-none"
      />

      {/* Character Count */}
      <div className="flex items-center justify-between mt-2 text-xs">
        <span className="text-gray-500">
          {charCount} / {MAX_CHARS} characters
        </span>
        <span className={charCount > MAX_CHARS * 0.9 ? 'text-red-400' : 'text-gray-500'}>
          {MAX_CHARS - charCount} remaining
        </span>
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all"
      >
        <Type className="w-4 h-4 mr-2" />
        Save Caption
      </Button>
    </div>
  );
};

export default CaptionEditor;