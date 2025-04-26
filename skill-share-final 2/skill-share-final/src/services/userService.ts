import { SignInData, SignUpData, SignUpResponse } from '../types/user';
import api from './api';
export const userService = {
  signUp: async (data: SignUpData): Promise<SignUpResponse> => {
    try {
      const response = await api.post<SignUpResponse>('/users/signup', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to sign up user');
    }
  },
  signIn: async (data: SignInData): Promise<number> => {
    try {
      const response = await api.post<number>('/users/signin', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to sign in user');
    }
  },
  getUserById: async (id: string) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  }
};