import React from "react";

interface ButtonConfig {
  label: string;
  onClick: () => void;
}

interface SidebarProps {
  buttons: ButtonConfig[];
}

const Sidebar: React.FC<SidebarProps> = ({ buttons }) => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4 flex flex-col space-y-4">
      {buttons.map((button, index) => (
        <button key={index} onClick={button.onClick} className="btn">
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
