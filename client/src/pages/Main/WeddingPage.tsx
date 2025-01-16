import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Canvas from "../../components/Canvas/Canvas";
import ImageViewer from "../../components/ImageViewer";
import AlbumNavigator from "../../components/Canvas/AlbumNavigator";

const WeddingPage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const stageRef = React.useRef(null);
  const [dragUrl, setDragUrl] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://picsum.photos/v2/list");
      const data = await response.json();
      const imageUrls = data.map((image: any) => image.download_url);
      console.log(imageUrls);
      setImages(imageUrls);
    } catch (error) {
      console.log("Błąd podczas ładowania zdjęć");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleLogout = () => console.log("Log out");
  const handleSettings = () => console.log("Settings");
  const handleSave = () => console.log("Save");
  const handleExport = (format: "pdf" | "html" | "docx") =>
    console.log(`Eksport do ${format.toUpperCase()}`);
  const handleWeddingCard = () => console.log("Generate Card");

  return (
    <div className="h-screen flex">
      <Sidebar
        buttons={[
          { label: "Wyloguj się", onClick: handleLogout },
          { label: "Ustawienia", onClick: handleSettings },
          { label: "Zapisz", onClick: handleSave },
          { label: "Eksportuj do PDF", onClick: () => handleExport("pdf") },
          { label: "Eksportuj do HTML", onClick: () => handleExport("html") },
          { label: "Eksportuj do DOCX", onClick: () => handleExport("docx") },
          { label: "Generuj Wizytówkę", onClick: handleWeddingCard },
        ]}
      />
      <div className="flex flex-col flex-grow bg-gray-100 p-8">
        <Canvas stageRef={stageRef} dragUrl={dragUrl || ""} />
        <div className="flex items-center justify-center p-4">
          <AlbumNavigator />
        </div>
      </div>
      <ImageViewer images={images} loading={loading} onImageDrag={setDragUrl} />
    </div>
  );
};

export default WeddingPage;
