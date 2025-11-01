import React, { useState, useEffect } from 'react';
import { Upload, Grid3x3, Smartphone, Download, Trash2, Film, ImageIcon } from 'lucide-react';
import UploadArea from '../components/UploadArea';
import GridView from '../components/GridView';
import ReelsView from '../components/ReelsView';
import StoryView from '../components/StoryView';
import PostDetailModal from '../components/PostDetailModal';
import MobilePreview from '../components/MobilePreview';
import { Button } from '../components/ui/button';
import { mockPosts } from '../mock';

const STORAGE_KEY_GRID = 'postview_grid_posts';
const STORAGE_KEY_REELS = 'postview_reels_posts';
const STORAGE_KEY_STORY = 'postview_story_posts';

const Dashboard = () => {
  // Load posts from localStorage - separate for each view mode
  const [gridPosts, setGridPosts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_GRID);
    return saved ? JSON.parse(saved) : mockPosts;
  });
  
  const [reelsPosts, setReelsPosts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_REELS);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [storyPosts, setStoryPosts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STORY);
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedPost, setSelectedPost] = useState(null);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'reels', 'story'
  const [showStoryView, setShowStoryView] = useState(false);
  const [showPostDetail, setShowPostDetail] = useState(false);

  // Save grid posts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GRID, JSON.stringify(gridPosts));
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded for grid posts.');
        const reduced = gridPosts.slice(0, 20);
        setGridPosts(reduced);
        localStorage.setItem(STORAGE_KEY_GRID, JSON.stringify(reduced));
      }
    }
  }, [gridPosts]);

  // Save reels posts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REELS, JSON.stringify(reelsPosts));
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded for reels posts.');
        const reduced = reelsPosts.slice(0, 20);
        setReelsPosts(reduced);
        localStorage.setItem(STORAGE_KEY_REELS, JSON.stringify(reduced));
      }
    }
  }, [reelsPosts]);

  // Save story posts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STORY, JSON.stringify(storyPosts));
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded for story posts.');
        const reduced = storyPosts.slice(0, 20);
        setStoryPosts(reduced);
        localStorage.setItem(STORAGE_KEY_STORY, JSON.stringify(reduced));
      }
    }
  }, [storyPosts]);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async (files) => {
    const newPostsPromises = files.map(async (file, index) => {
      let imageData;
      
      if (file.type.startsWith('image/')) {
        // Compress images
        imageData = await compressImage(file);
      } else {
        // For videos, just create object URL (not stored in localStorage)
        imageData = URL.createObjectURL(file);
      }

      return {
        id: Date.now() + index,
        image: imageData,
        caption: '',
        views: Math.floor(Math.random() * 1000),
        isVideo: file.type.startsWith('video/')
      };
    });

    const newPosts = await Promise.all(newPostsPromises);
    
    // Add to the appropriate posts array based on current view mode
    if (viewMode === 'grid') {
      setGridPosts([...newPosts, ...gridPosts]);
    } else if (viewMode === 'reels') {
      setReelsPosts([...newPosts, ...reelsPosts]);
    } else if (viewMode === 'story') {
      setStoryPosts([...newPosts, ...storyPosts]);
    }
  };

  const handleReorder = (newPosts) => {
    if (viewMode === 'grid') {
      setGridPosts(newPosts);
    } else if (viewMode === 'reels') {
      setReelsPosts(newPosts);
    } else if (viewMode === 'story') {
      setStoryPosts(newPosts);
    }
  };

  const handleCaptionUpdate = (postId, newCaption) => {
    const updatePosts = (posts) => 
      posts.map(post => 
        post.id === postId ? { ...post, caption: newCaption } : post
      );

    if (viewMode === 'grid') {
      setGridPosts(updatePosts(gridPosts));
    } else if (viewMode === 'reels') {
      setReelsPosts(updatePosts(reelsPosts));
    } else if (viewMode === 'story') {
      setStoryPosts(updatePosts(storyPosts));
    }

    if (selectedPost?.id === postId) {
      setSelectedPost({ ...selectedPost, caption: newCaption });
    }
  };
  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    if (mode === 'story') {
      setShowStoryView(true);
    }
  };

  const handleDeletePost = (postId) => {
    if (viewMode === 'grid') {
      setGridPosts(gridPosts.filter(post => post.id !== postId));
    } else if (viewMode === 'reels') {
      setReelsPosts(reelsPosts.filter(post => post.id !== postId));
    } else if (viewMode === 'story') {
      setStoryPosts(storyPosts.filter(post => post.id !== postId));
    }
    
    if (selectedPost?.id === postId) {
      setSelectedPost(null);
    }
  };

  const handleExport = () => {
    const allData = {
      grid: gridPosts,
      reels: reelsPosts,
      story: storyPosts
    };
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'postview-export.json';
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          // Check if it's the new format with separate arrays
          if (importedData.grid || importedData.reels || importedData.story) {
            if (importedData.grid) setGridPosts(importedData.grid);
            if (importedData.reels) setReelsPosts(importedData.reels);
            if (importedData.story) setStoryPosts(importedData.story);
          } else {
            // Old format - import to grid
            setGridPosts(importedData);
          }
        } catch (error) {
          alert('Geçersiz JSON dosyası');
        }
      };
      reader.readAsText(file);
    }
  };

  // Get current posts based on view mode
  const getCurrentPosts = () => {
    if (viewMode === 'grid') return gridPosts;
    if (viewMode === 'reels') return reelsPosts;
    if (viewMode === 'story') return storyPosts;
    return [];
  };

  const currentPosts = getCurrentPosts();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_5c404b43-a2fd-401c-ad01-c17484d2e425/artifacts/2t21br76_postview.png" 
              alt="PostView Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobilePreview(true)}
              className="border-gray-700 hover:border-pink-400 transition-colors"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="border-gray-700 hover:border-purple-400 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <label>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 hover:border-blue-400 transition-colors cursor-pointer"
                asChild
              >
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </span>
              </Button>
            </label>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* View Mode Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => handleViewModeChange('grid')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'
                : 'bg-gray-900/50 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
            Grid
          </button>
          <button
            onClick={() => handleViewModeChange('reels')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              viewMode === 'reels'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'
                : 'bg-gray-900/50 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Film className="w-5 h-5" />
            Reels
          </button>
          <button
            onClick={() => handleViewModeChange('story')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              viewMode === 'story'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'
                : 'bg-gray-900/50 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            Story
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Upload */}
          <div className="lg:col-span-3">
            <UploadArea onUpload={handleUpload} />
            <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
              <h3 className="text-sm font-semibold mb-2 text-gray-400">İstatistikler</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Toplam Gönderi</span>
                  <span className="font-semibold text-pink-400">{currentPosts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Açıklamalı</span>
                  <span className="font-semibold text-purple-400">
                    {currentPosts.filter(p => p.caption).length}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-800">
                  <span className="text-gray-500 text-xs">Görünüm Modu</span>
                  <span className="font-semibold text-blue-400 text-xs uppercase">{viewMode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - View Content */}
          <div className="lg:col-span-9">
            {viewMode === 'grid' && (
              <GridView
                posts={currentPosts}
                onReorder={handleReorder}
                onSelectPost={handleSelectPost}
                selectedPost={selectedPost}
                onDeletePost={handleDeletePost}
              />
            )}
            {viewMode === 'reels' && (
              <ReelsView
                posts={currentPosts}
                onSelectPost={handleSelectPost}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Preview Modal */}
      {showMobilePreview && (
        <MobilePreview
          posts={currentPosts}
          onClose={() => setShowMobilePreview(false)}
        />
      )}

      {/* Post Detail Modal */}
      {showPostDetail && selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => {
            setShowPostDetail(false);
            setSelectedPost(null);
          }}
          onUpdateCaption={handleCaptionUpdate}
        />
      )}

      {/* Story View */}
      {showStoryView && currentPosts.length > 0 && (
        <StoryView
          posts={currentPosts}
          onClose={() => {
            setShowStoryView(false);
            setViewMode('grid');
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;