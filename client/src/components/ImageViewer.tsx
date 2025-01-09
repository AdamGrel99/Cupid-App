import React from "react";

interface ImageViewerProps {
  images: string[];
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images }) => {
  return (
    <div className="w-64 h-full bg-white overflow-y-auto p-4 border-l">
      {images.length > 0 ? (
        images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            className="mb-4 w-full object-contain"
          />
        ))
      ) : (
        <div className="text-gray-500 text-center">Brak zdjęć</div>
      )}
    </div>
  );
};

export default ImageViewer;
