import React, { useEffect, useRef } from "react";
import { Image, Rect, Transformer } from "react-konva";
import useImage from "use-image";
import Konva from "konva";

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

interface URLImageProps extends ImageProps {
  updateImage: (updates: Partial<ImageProps>) => void;
}

export const URLImage = (image: URLImageProps) => {
  const [img, status] = useImage(image.src);
  const prepared_id = image.src.split("/").pop(); // pobierz numer id z url
  const shapeRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current as unknown as Konva.Node]);
      if (trRef.current.getLayer()) {
        trRef.current.getLayer()?.batchDraw();
      }
    }
  }, [status]);

  useEffect(() => {
    if (image.isSelected && trRef.current) {
      trRef.current.nodes([shapeRef.current as unknown as Konva.Node]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [image.isSelected, image.src, image.x, image.y]);

  if (status === "loaded") {
    return (
      <>
        <Image
          id={prepared_id}
          image={img}
          x={image.x}
          y={image.y}
          rotation={image.rotation}
          height={image.height}
          width={image.width}
          draggable
          ref={shapeRef as React.RefObject<Konva.Image>}
          onClick={image.onSelect}
          onTransformEnd={() => {
            const node = shapeRef.current;
            if (node) {
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();

              node.scaleX(1);
              node.scaleY(1);

              const newWidth = node.width() * scaleX;
              const newHeight = node.height() * scaleY;

              image.updateImage({
                width: newWidth,
                height: newHeight,
                rotation: node.rotation(),
              });
            }
          }}
          onDblClick={image.onDeselect}
        />
        <Transformer visible={image.isSelected} ref={trRef} />
      </>
    );
  } else if (status === "failed") {
    return (
      <>
        <Rect
          x={image.x}
          y={image.y}
          width={400}
          height={400}
          fill="grey"
          draggable
        />
      </>
    );
  }

  return null;
};
