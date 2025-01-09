import React from "react";

interface AlbumFeatureProps {
  image: string;
  title: string;
  description: string;
}

const AlbumFeature: React.FC<AlbumFeatureProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center">
      <img src={image} alt={title} className="w-40 h-40 mb-6" />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-4 text-center">{description}</p>
    </div>
  );
};

export default AlbumFeature;
