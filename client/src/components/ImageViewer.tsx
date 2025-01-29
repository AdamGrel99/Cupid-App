import React, { useEffect, useState } from "react";

interface ImageViewerProps {
  onImageDrag: (url: string) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ onImageDrag }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {//https://picsum.photos/v2/list
      const response = await fetch("http://localhost:5000/api/get_photo_list?token=53423342"); // backend tutaj 
      const data = await response.json();
      const imageUrls = data.map((image: any) => image.download_url);
      setImages(imageUrls);
    } catch (error) {
      console.log("Błąd podczas ładowania zdjęć");
    } finally {
      setLoading(false);
    }
  };


// {"download_url":"https://picsum.photos/id/0/5000/3333"}

  useEffect(() => {
    fetchImages();
  }, []);

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
