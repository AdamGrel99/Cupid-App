import React, { useRef, useEffect } from "react";
// import cupid from "../../assets/images/cupid.png";

interface StickerCanvasProps {
  imageUrl: string; // Definicja typu dla właściwości imageUrl
}

const EditPage: React.FC<StickerCanvasProps> = ({ imageUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Typ dla referencji

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Bezpieczne sprawdzenie, czy referencja istnieje

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Bezpieczne sprawdzenie, czy kontekst został poprawnie pobrany

    // Załaduj obraz
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      console.log(image);
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600}></canvas>;
};

export default EditPage;
