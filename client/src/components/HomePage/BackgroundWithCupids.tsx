import React from "react";
import cupidImage from "../../assets/images/cupid.png";

interface CupidImageProps {
  className?: string;
}

const CupidImage: React.FC<CupidImageProps> = ({ className }) => (
  <img src={cupidImage} alt="Cupid" className={className} />
);

const BackgroundWithCupids = () => {
  return (
    <div>
      <CupidImage className="absolute h-48 left-24 top-8" />
      <CupidImage className="absolute h-48 right-24 top-8" />
      <CupidImage className="absolute h-16 right-64 top-1/3" />
      <CupidImage className="absolute h-32 left-56 top-1/3" />
      <CupidImage className="absolute h-16 left-24 bottom-48" />
      <CupidImage className="absolute h-36 right-32 bottom-1/4" />
    </div>
  );
};

export default BackgroundWithCupids;
