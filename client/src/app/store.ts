import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import historyPageReducer from '../features/wedding/historyPageSlice';
import historyAlbumReducer from '../features/wedding/historyAlbumSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    historyPage: historyPageReducer,
    historyAlbum: historyAlbumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;