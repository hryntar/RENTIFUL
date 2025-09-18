"use client";

import React from "react";

interface FileUploadProps {
  onChange: (files: File[]) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onChange, className }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    onChange(files);
  };

  return (
    <div className={`h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}>
      <input
        multiple
        type="file"
        accept="image/*"
        className="w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
      <div className="absolute pointer-events-none text-gray-500">
        Drag & Drop your images or click to browse
      </div>
    </div>
  );
};