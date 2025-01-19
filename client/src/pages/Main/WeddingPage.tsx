import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Canvas from "../../components/Canvas/Canvas";
import ImageViewer from "../../components/ImageViewer";
import AlbumNavigator from "../../components/Canvas/AlbumNavigator";
import { useNavigate } from "react-router-dom";

const WeddingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const stageRef = React.useRef(null);
  const [dragUrl, setDragUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => console.log("Log out");
  const handleSave = () => console.log("Save");
  const handleExport = (format: "pdf" | "html" | "docx") =>
    console.log(`Eksport do ${format.toUpperCase()}`);
  const handleWeddingCard = () => {
    navigate("/cardqr");
  };

  return (
    <div className="h-screen flex">
      <Sidebar
        buttons={[
          { label: "Wyloguj się", onClick: handleLogout },
          { label: "Zapisz", onClick: handleSave },
          { label: "Eksportuj do PDF", onClick: () => handleExport("pdf") },
          { label: "Eksportuj do HTML", onClick: () => handleExport("html") },
          { label: "Eksportuj do DOCX", onClick: () => handleExport("docx") },
          { label: "Generuj Wizytówkę", onClick: handleWeddingCard },
        ]}
      />
      <div className="flex flex-col flex-grow bg-gray-100 p-8">
        <Canvas
          stageRef={stageRef}
          dragUrl={dragUrl || ""}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <div className="flex items-center justify-center p-4">
          <AlbumNavigator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <ImageViewer onImageDrag={setDragUrl} />
    </div>
  );
};

export default WeddingPage;
