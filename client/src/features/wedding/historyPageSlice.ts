import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryPageStack } from '../../models/canvas/HistoryPageStack';

interface HistoryPageState {
  stackElements: HistoryPageStack[];
}

const initialState: HistoryPageState = {
  stackElements: [],
};

const historyPageSlice = createSlice({
  name: 'historyPage',
  initialState,
  reducers: {
    addToStack(state, action: PayloadAction<HistoryPageStack>) {
      state.stackElements.push(action.payload);
    },
    removeFromStack(state) {
      state.stackElements.pop();
    },
  },
});

export const { addToStack, removeFromStack } = historyPageSlice.actions;
export default historyPageSlice.reducer;
