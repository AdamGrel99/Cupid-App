import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../models/AuthState';

const initialState: AuthState = {
  token: null,
  displayName: null,
  isLoggedIn: false,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; displayName: string; role: 'admin' | 'couple' | 'guest' }>) => {
      state.token = action.payload.token;
      state.displayName = action.payload.displayName;
      state.role = action.payload.role;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.displayName = null;
      state.role = null; 
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;