import React, { useEffect, useRef } from "react";
import { Image, Rect, Transformer } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { ImageProps } from "../../models/canvas/CanvasProps";

interface URLImageProps extends ImageProps {
  updateImage: (updates: Partial<ImageProps>) => void;
}

export const URLImage = (image: URLImageProps) => {
  const [img, status] = useImage(image.src);
  const id = image.src.split("/").pop();
  const shRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (trRef.current && shRef.current) {
      trRef.current.nodes([shRef.current as unknown as Konva.Node]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [status]);

  useEffect(() => {
    if (image.isSelected && trRef.current) {
      trRef.current.nodes([shRef.current as unknown as Konva.Node]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [image.isSelected, image.src, image.x, image.y]);

  const handleTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    const node = shRef.current;
    if (node) {
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      node.scaleX(1);
      node.scaleY(1);

      const newWidth = node.width() * scaleX;
      const newHeight = node.height() * scaleY;

      image.updateImage({
        x: e.target.x(),
        y: e.target.y(),
        width: newWidth,
        height: newHeight,
        rotation: node.rotation(),
      });
    }
  };

  const renderImage = () => (
    <>
      <Image
        id={id}
        image={img}
        x={image.x}
        y={image.y}
        rotation={image.rotation}
        height={image.height}
        width={image.width}
        draggable
        ref={shRef as React.RefObject<Konva.Image>}
        onClick={image.onSelect}
        onTransformEnd={handleTransformEnd}
        onDblClick={image.onDeselect}
      />
      <Transformer visible={image.isSelected} ref={trRef} />
    </>
  );

  const renderPlaceholder = () => (
    <Rect
      x={image.x}
      y={image.y}
      width={500}
      height={500}
      fill="gray"
      draggable
    />
  );

  if (status === "loaded") return renderImage();
  if (status === "failed") return renderPlaceholder();
  return null;
};
