export interface User {
  id: string;
  userName: string;
  email: string;
}
export interface SignUpData {
  userName: string;
  email: string;
  password: string;
}
export interface SignInData {
  email: string;
  password: string;
}
export interface SignUpResponse {
  user?: User;
  message?: string;
}