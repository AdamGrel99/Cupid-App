import React from "react";

interface CanvasProps {
  pageNumber: number;
}

const Canvas: React.FC<CanvasProps> = ({ pageNumber }) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100">
      <div className="text-xl font-bold">Strona: {pageNumber}</div>
    </div>
  );
};

export default Canvas;
