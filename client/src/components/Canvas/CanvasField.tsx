import React, { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import { URLImage } from "./URLImage";
import { CanvasFieldProps } from "../../models/canvas/CanvasProps";

const A4_WIDTH = 3508;
const A4_HEIGHT = 2480;

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
      let newWidth = window.innerWidth * 0.7;
      let newHeight = newWidth / aspectRatio;

      if (newHeight > window.innerHeight * 0.7) {
        newHeight = window.innerHeight * 0.7;
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
    <Stage
      width={size.width}
      height={size.height}
      scaleX={scale}
      scaleY={scale}
      className="bg-white-200 border border-gray-700"
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
  );
};

export default CanvasField;
