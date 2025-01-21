export interface HistoryImageProps {
  x: number;
  y: number;
  rotation: number;
  height: number;
  width: number;
  src: string;
  isSelected: boolean;
}

export interface HistoryPageStack {
  pageNumber: number;
  images: HistoryImageProps[];
}

export interface HistoryAlbumStack {
  albumStack: HistoryPageStack[];
}