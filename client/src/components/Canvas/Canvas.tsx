import React from "react";
import CanvasField from "./CanvasField";
import { CanvasProps, ImageProps } from "../../models/canvas/CanvasProps";

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

export default Canvas;
