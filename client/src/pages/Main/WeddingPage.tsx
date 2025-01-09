import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Canvas from "../../components/Canvas";
import ImageViewer from "../../components/ImageViewer";

const WeddingPage: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState<string[]>([]);

  const handleLogout = () => {
    console.log("Log out");
  };

  const handleSettings = () => {
    console.log("Settings");
  };

  const handleSave = () => {
    console.log("Save");
  };

  const handleExport = (format: "pdf" | "html" | "docx") => {
    console.log(`Eksport do ${format.toUpperCase()}`);
  };

  const handleWeddingCard = () => {
    console.log("Generate Card");
  };

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
      <Canvas pageNumber={pageNumber} />
      <ImageViewer images={images} />
    </div>
  );
};

export default WeddingPage;
