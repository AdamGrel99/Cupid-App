import React, { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import { ImageProps } from "../../models/canvas/ImageProps";
import { URLImage } from "./URLImage";

const A4_WIDTH = 3508;
const A4_HEIGHT = 2480;

interface CanvasFieldProps {
  images: ImageProps[];
  stageRef: React.RefObject<any>;
}

const CanvasField: React.FC<CanvasFieldProps> = ({ images, stageRef }) => {
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
      {/* {layersData.map((layerElements, layerIndex) => (
        <Layer key={layerIndex} visible={currentPage === layerIndex}>
          {layerElements.map((element, elementIndex) => (
            <React.Fragment key={elementIndex}>{element}</React.Fragment>
          ))}
        </Layer>
      ))} */}
      <Layer>
        {images.map((image, index) => (
          <URLImage key={index} {...image} />
        ))}
      </Layer>
    </Stage>
  );
};

export default CanvasField;
