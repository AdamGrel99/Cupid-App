import React, { RefObject, useState } from "react";
import CanvasField from "./CanvasField";
interface CanvasProps {
  stageRef: RefObject<any>;
  dragUrl: string;
}

const Canvas: React.FC<CanvasProps> = ({ stageRef, dragUrl }) => {
  const [images, setImages] = useState([
    {
      src: "https://picsum.photos/id/0/5000/3333",
      x: 250,
      y: 250,
      height: 400,
      width: 400,
      rotation: 0,
      isSelected: false,
      onSelect: () => handleSelect(0),
      onDeselect: () => handleDeselect(),
    },
    {
      src: "https://konvajs.org/assets/lion.png",
      x: 450,
      y: 450,
      height: 400,
      width: 400,
      rotation: 0,
      isSelected: false,
      onSelect: () => handleSelect(1),
      onDeselect: () => handleDeselect(),
    },
    {
      src: "https://konvajs.org/assets/lion.png",
      x: 1450,
      y: 1450,
      height: 400,
      width: 400,
      rotation: 0,
      isSelected: false,
      onSelect: () => handleSelect(2),
      onDeselect: () => handleDeselect(),
    },
  ]);

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
          onSelect: () => handleSelect(3),
          onDeselect: () => handleDeselect(),
        };
        setImages((prevImages) => {
          if (!Array.isArray(prevImages)) return [newImage];
          return [...prevImages, newImage];
        });
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <CanvasField images={images} stageRef={stageRef} />
    </div>
  );
};

export default Canvas;
