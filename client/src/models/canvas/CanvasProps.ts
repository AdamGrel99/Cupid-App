import { RefObject } from "react";

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

export interface AlbumNavigatorProps {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  images: ImageProps[];
  setImages: React.Dispatch<React.SetStateAction<ImageProps[]>>;
  handleSelect: (index: number) => void;
  handleDeselect: () => void;
}

export interface CanvasProps {
  stageRef: RefObject<any>;
  dragUrl: string;
  handleSelect: (index: number) => void;
  handleDeselect: () => void;
  images: ImageProps[];
  setImages: React.Dispatch<React.SetStateAction<ImageProps[]>>;
}

export interface CanvasFieldProps {
  images: ImageProps[];
  stageRef: React.RefObject<any>;
  updateImage: (index: number, updates: Partial<ImageProps>) => void;
}