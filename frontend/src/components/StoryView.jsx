import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Pause, Play } from 'lucide-react';

const StoryView = ({ posts, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const STORY_DURATION = 5000; // 5 seconds per story

  const currentPost = posts[currentIndex];

  useEffect(() => {
    if (!isPaused && posts.length > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (STORY_DURATION / 100));
          if (newProgress >= 100) {
            handleNext();
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, posts.length]);

  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const goToStory = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2">
        {posts.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-4 left-0 right-0 z-20 flex items-center justify-between px-4 pt-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
            <span className="text-white text-sm font-bold">P</span>
          </div>
          <div>
            <span className="text-white font-semibold text-sm drop-shadow-lg">postview_app</span>
            <div className="text-white/80 text-xs">
              {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-white hover:scale-110 transition-transform"
          >
            {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
          </button>
          <button
            onClick={onClose}
            className="text-white hover:scale-110 transition-transform"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Story Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {currentPost.isVideo ? (
          <video
            key={currentPost.id}
            src={currentPost.image}
            className="max-w-full max-h-full object-contain"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            key={currentPost.id}
            src={currentPost.image}
            alt="Story"
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>

      {/* Caption at Bottom */}
      {currentPost.caption && (
        <div className="absolute bottom-20 left-0 right-0 px-6 z-20">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white text-sm drop-shadow-lg">
              {currentPost.caption}
            </p>
          </div>
        </div>
      )}

      {/* Views at Bottom */}
      {currentPost.views && (
        <div className="absolute bottom-8 left-6 z-20">
          <div className="text-white/80 text-sm drop-shadow-lg">
            👁 {currentPost.views.toLocaleString('tr-TR')}
          </div>
        </div>
      )}

      {/* Navigation Areas */}
      <div className="absolute inset-0 z-10 flex">
        {/* Left tap area */}
        <button
          onClick={handlePrevious}
          className="flex-1 cursor-pointer group"
          disabled={currentIndex === 0}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            {currentIndex > 0 && (
              <ChevronLeft className="w-10 h-10 text-white drop-shadow-lg" />
            )}
          </div>
        </button>
        
        {/* Right tap area */}
        <button
          onClick={handleNext}
          className="flex-1 cursor-pointer group"
        >
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
        </button>
      </div>

      {/* Story Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToStory(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryView;
