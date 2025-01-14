export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  surname?: string;
  token: string
  role: string 
}