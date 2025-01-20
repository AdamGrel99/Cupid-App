import React, { RefObject } from "react";
import CanvasField from "./CanvasField";

interface ImageProps {
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

interface CanvasProps {
  stageRef: RefObject<any>;
  dragUrl: string;
  currentPage: number;
  handleSelect: (index: number) => void;
  handleDeselect: () => void;
  images: ImageProps[];
  setImages: React.Dispatch<React.SetStateAction<ImageProps[]>>;
}

const Canvas: React.FC<CanvasProps> = ({
  stageRef,
  dragUrl,
  currentPage,
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
        currentPage={currentPage}
        updateImage={updateImage}
      />
    </div>
  );
};

export default Canvas;
