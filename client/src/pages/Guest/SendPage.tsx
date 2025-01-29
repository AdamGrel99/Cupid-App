import React, { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import {
  CanvasFieldProps,
  CanvasProps,
  ImageProps,
} from "../../models/canvas/CanvasProps";
import { URLImage } from "../../components/Canvas/URLImage";
import { useNavigate } from "react-router-dom";

import kissImage from "../../assets/images/guestPage/kiss.png";
import smileImage from "../../assets/images/guestPage/smile.png";
import loveImage from "../../assets/images/guestPage/love.png";

export interface ImageProps2 {
  x: number;
  y: number;
  rotation: number;
  height: number;
  width: number;
  src: string;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}

const A4_WIDTH = 2480;
const A4_HEIGHT = 3508;

const CanvasField: React.FC<CanvasFieldProps> = ({
  images,
  stageRef,
  updateImage,
}) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const checkSize = () => {
      const aspectRatio = A4_WIDTH / A4_HEIGHT;
      let newWidth = window.innerWidth * 0.9; // 90% szerokości ekranu
      let newHeight = newWidth / aspectRatio;

      if (newHeight > window.innerHeight * 0.8) {
        // Maksymalnie 80% wysokości ekranu
        newHeight = window.innerHeight * 0.8;
        newWidth = newHeight * aspectRatio;
      }

      setSize({
        width: newWidth,
        height: newHeight,
      });
    };

    window.addEventListener("resize", checkSize);
    checkSize();
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const scale = size.width / A4_WIDTH;

  return (
    <div className="flex justify-center items-center w-full h-full p-2 bg-gray-100">
      <Stage
        width={size.width}
        height={size.height}
        scaleX={scale}
        scaleY={scale}
        className="bg-white border border-gray-300 rounded-lg shadow-md"
        ref={stageRef}
      >
        <Layer>
          {images.map((image, index) => (
            <URLImage
              key={index}
              {...image}
              updateImage={(updates) => updateImage(index, updates)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

const Canvas: React.FC<CanvasProps> = ({
  stageRef,
  dragUrl,
  handleSelect,
  handleDeselect,
  images,
  setImages,
}) => {
  const updateImage = (index: number, updates: Partial<ImageProps>) => {
    setImages((prevImages) =>
      prevImages.map((image, i) =>
        i === index ? { ...image, ...updates } : image
      )
    );
  };

  return (
    <div
      className="flex justify-center items-center h-88vh"
      onDrop={(e) => {
        e.preventDefault();
        if (stageRef.current) {
          stageRef.current.setPointersPositions(e);
        }
        const newImage = {
          ...stageRef.current.getPointerPosition(),
          src: dragUrl,
          onSelect: () => handleSelect(images.length),
          onDeselect: () => handleDeselect(),
        };
        setImages((prevImages) => {
          if (!Array.isArray(prevImages)) return [newImage];
          return [...prevImages, newImage];
        });
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <CanvasField
        images={images}
        stageRef={stageRef}
        updateImage={updateImage}
      />
    </div>
  );
};

interface ImageViewerProps {
  onImageDrag: (url: string) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ onImageDrag }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    const localImages = [kissImage, smileImage, loveImage];
    setImages(localImages);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 bg-white flex items-center justify-center border-t">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-1/5 bg-white overflow-x-auto overflow-y-hidden p-4 border-t flex space-x-4">
      {images.length > 0 ? (
        images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            className="h-full max-w-xs object-contain cursor-pointer"
            draggable="true"
            onDragStart={(e: React.DragEvent<HTMLImageElement>) => {
              return onImageDrag((e.target as HTMLImageElement).src);
            }}
            onDoubleClick={() => {
              onImageDrag(src);
            }}
          />
        ))
      ) : (
        <div className="text-gray-500 text-center">Brak emoji</div>
      )}
    </div>
  );
};

function SendPage() {
  const stageRef = React.useRef(null);
  const [dragUrl, setDragUrl] = useState<string | null>(null);

  const [images, setImages] = useState<ImageProps[]>([]);

  const handleSelect = (index: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        isSelected: i === index,
      }))
    );
  };

  const handleDeselect = () => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isSelected: false,
      }))
    );
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <Canvas
        stageRef={stageRef}
        dragUrl={dragUrl || ""}
        handleSelect={handleSelect}
        handleDeselect={handleDeselect}
        images={images}
        setImages={setImages}
      />
      <ImageViewer onImageDrag={setDragUrl} />
    </div>
  );
}

export default SendPage;
