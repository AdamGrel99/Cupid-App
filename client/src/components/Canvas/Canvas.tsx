import React, { RefObject, useState } from "react";
import CanvasField from "./CanvasField";
import { addImageToPage } from "../../features/wedding/historyAlbumSlice";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";

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
  setCurrentPage: (pageNumber: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  stageRef,
  dragUrl,
  currentPage,
  setCurrentPage,
}) => {
  const dispatch: AppDispatch = useDispatch();
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

  const handleAddImage = () => {
    const newImage = {
      src: "https://picsum.photos/200",
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      rotation: 0,
      isSelected: false,
    };

    dispatch(addImageToPage({ pageNumber: currentPage, image: newImage }));
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
      />
    </div>
  );
};

export default Canvas;
