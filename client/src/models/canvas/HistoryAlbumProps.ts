import { ImageProps } from "./ImageProps";

export interface HistoryPageStack {
  pageNumber: number;
  images: ImageProps[];
}

export interface HistoryAlbumStack {
  albumStack: HistoryPageStack[];
}