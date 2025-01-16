import React from "react";

interface ImageViewerProps {
  images: string[];
  loading: boolean;
  onImageDrag: (url: string) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  loading,
  onImageDrag,
}) => {
  if (loading) {
    return (
      <div className="w-64 h-full bg-white flex items-center justify-center border-l">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="w-1/5 h-full bg-white overflow-y-auto p-4 border-l">
      {images.length > 0 ? (
        images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            className="mb-4 w-full object-contain"
            draggable="true"
            onDragStart={(e: React.DragEvent<HTMLImageElement>) => {
              return onImageDrag((e.target as HTMLImageElement).src);
            }}
          />
        ))
      ) : (
        <div className="text-gray-500 text-center">Brak zdjęć</div>
      )}
    </div>
  );
};

export default ImageViewer;
