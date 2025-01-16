import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryAlbumStack } from '../../models/canvas/HistoryAlbumStack';
import { HistoryPageStack } from '../../models/canvas/HistoryPageStack';

interface HistoryAlbumState {
  albumStack: HistoryAlbumStack[];
}

const initialState: HistoryAlbumState = {
  albumStack: [],
};

const historyAlbumSlice = createSlice({
  name: 'historyAlbum',
  initialState,
  reducers: {
    addAlbumPage(state, action: PayloadAction<HistoryPageStack>) {
      const newPage: HistoryAlbumStack = { tabPage: [action.payload] };
      state.albumStack.push(newPage);
    },
    removeLastAlbum(state) {
      state.albumStack.pop();
    },
  },
});

export const { addAlbumPage, removeLastAlbum } = historyAlbumSlice.actions;
export default historyAlbumSlice.reducer;
