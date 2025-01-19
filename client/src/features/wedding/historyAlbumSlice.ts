import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryAlbumStack, HistoryPageStack } from '../../models/canvas/HistoryAlbumProps';
import { ImageProps } from '../../models/canvas/ImageProps';

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
      action: PayloadAction<{ pageNumber: number; image: ImageProps }>
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
  },
});


export const { addAlbumPage, addImageToPage, removeLastPage } =
  historyAlbumSlice.actions;
export default historyAlbumSlice.reducer;
