export interface User {
  id: number;
  username: string;
  email: string;
  profilePictureBase64?: string | null;
}
export interface SignUpData {
  username: string;
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