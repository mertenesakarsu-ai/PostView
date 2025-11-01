import React, { useCallback } from 'react';
import { Upload, Image, Video } from 'lucide-react';

const UploadArea = ({ onUpload }) => {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    if (files.length > 0) {
      onUpload(files);
    }
  }, [onUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-200">Upload Media</h2>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-pink-400 transition-all duration-300 cursor-pointer group"
      >
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-pink-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Drop files here</p>
              <p className="text-xs text-gray-500 mt-1">or click to browse</p>
            </div>
          </div>
        </label>
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Image className="w-4 h-4" />
          <span>Images</span>
        </div>
        <div className="flex items-center gap-1">
          <Video className="w-4 h-4" />
          <span>Videos</span>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;