import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Canvas from "../../components/Canvas/Canvas";
import ImageViewer from "../../components/ImageViewer";
import AlbumNavigator from "../../components/Canvas/AlbumNavigator";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import biblioteki do HTTP
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export interface ImageProps {
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

const WeddingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const stageRef = React.useRef(null);
  const [dragUrl, setDragUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const [images, setImages] = useState<ImageProps[]>([]);

  const handleSelect = (index: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        isSelected: i === index,
      }))
    );
  };

  const handleDeselect = () => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isSelected: false,
      }))
    );
  };

  const handleLogout = () => navigate("/login");
  const handleSave = async () => {
    try {
      const albumData = {
        currentPage,
        images, // Zakładam, że `images` jest Twoją listą zdjęć
      };
  
      const response = await axios.post("http://localhost:5000/api/save-album", albumData, {
        headers: {
          "Content-Type": "application/json", // Ustaw właściwy typ danych
        },
      });
  
      console.log("Album zapisany pomyślnie:", response.data);
    } catch (error) {
      console.error("Błąd podczas zapisywania albumu:", error);
    }
  };

  
  const album_export_data = useSelector(
    (state: RootState) => state.historyAlbum.albumStack
    );

  const handleExport = async (format: "pdf" | "html" | "docx") =>
  {
    

    console.log(`Eksport do ${format.toUpperCase()}`);
    
    console.log(album_export_data);
    try {
      
      
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album_export_data),
      };
      console.log(requestOptions.body);
      
      fetch(`http://localhost:5000/api/export_album?token=53423342&export_mode=${ format }`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas żądania: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Lokacja: ", data.location); 
        const a = document.createElement("a");
        a.href = data.location;
        a.download = `album_weselny.${format}`; // Pobieramy nazwę pliku
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }

    catch (error) {
      console.error("Błąd podczas eksportowania albumu:", error);
    }

    
  }

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
          handleSelect={handleSelect}
          handleDeselect={handleDeselect}
          images={images}
          setImages={setImages}
        />
        <div className="flex items-center justify-center p-4">
          <AlbumNavigator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            images={images}
            setImages={setImages}
            handleSelect={handleSelect}
            handleDeselect={handleDeselect}
          />
        </div>
      </div>
      <ImageViewer onImageDrag={setDragUrl} />
    </div>
  );
};

export default WeddingPage;
