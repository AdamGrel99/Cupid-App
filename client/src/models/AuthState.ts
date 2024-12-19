export interface AuthState {
  token: string | null;
  role: 'admin' | 'couple' | 'guest' | null;
  isLoggedIn: boolean;
  displayName: string | null;
}