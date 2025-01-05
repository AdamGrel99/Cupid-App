import React from "react";

interface SidebarProps {
  onLogout: () => void;
  onSettings: () => void;
  onSave: () => void;
  onExport: (format: "pdf" | "html" | "docx") => void;
  onWeddingCard: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onLogout,
  onSettings,
  onSave,
  onExport,
  onWeddingCard,
}) => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4 flex flex-col space-y-4">
      <button onClick={onLogout} className="btn">
        Wyloguj się
      </button>
      <button onClick={onSettings} className="btn">
        Ustawienia
      </button>
      <button onClick={onSave} className="btn">
        Zapisz
      </button>
      <button onClick={() => onExport("pdf")} className="btn">
        Eksportuj do PDF
      </button>
      <button onClick={() => onExport("html")} className="btn">
        Eksportuj do HTML
      </button>
      <button onClick={() => onExport("docx")} className="btn">
        Eksportuj do DOCX
      </button>
      <button onClick={onWeddingCard} className="btn">
        Generuj Wizytówkę
      </button>
    </div>
  );
};

export default Sidebar;
