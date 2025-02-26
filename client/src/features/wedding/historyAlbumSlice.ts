import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryAlbumStack, HistoryPageStack, HistoryImageProps } from '../../models/canvas/HistoryAlbumProps';

const initialState: HistoryAlbumStack = {
  albumStack: [{
    pageNumber: 1,
    images: [],
  }],
};

const historyAlbumSlice = createSlice({
  name: 'historyAlbum',
  initialState,
  reducers: {
    addAlbumPage(state, action: PayloadAction<HistoryPageStack>) {
      state.albumStack.push(action.payload);
    },
    addImageToPage(
      state,
      action: PayloadAction<{ pageNumber: number; image: HistoryImageProps }>
    ) {
      const page = state.albumStack.find(
        (page) => page.pageNumber === action.payload.pageNumber
      );
      if (page) {
        page.images.push(action.payload.image);
      }
    },
    removeLastPage(state) {
      state.albumStack.pop();
    },
    clearImagesOnPage(state, action: PayloadAction<number>) {
      const page = state.albumStack.find(
        (page) => page.pageNumber === action.payload
      );
      if (page) {
        page.images = [];
      }
    },
  },
});


export const { addAlbumPage, addImageToPage, removeLastPage, clearImagesOnPage } =
  historyAlbumSlice.actions;
export default historyAlbumSlice.reducer;
