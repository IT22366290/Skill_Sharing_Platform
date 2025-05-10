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
  },
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get<User[]>('/users');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw new Error('Failed to fetch users');
    }
  },
  // New follow-related functions
  followUser: async (followerId: number, followeeId: number): Promise<void> => {
    try {
      await api.post(`/users/${followerId}/follow/${followeeId}`);
    } catch (error) {
      console.error('Failed to follow user:', error);
      throw new Error('Failed to follow user');
    }
  },
  unfollowUser: async (followerId: number, followeeId: number): Promise<void> => {
    try {
      await api.put(`/users/${followerId}/unfollow/${followeeId}`);
    } catch (error) {
      console.error('Failed to unfollow user:', error);
      throw new Error('Failed to unfollow user');
    }
  },
  getFollowings: async (userId: number): Promise<User[]> => {
    try {
      const response = await api.get<User[]>(`/users/${userId}/followings`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch followings:', error);
      throw new Error('Failed to fetch followings');
    }
  },
  getFollowers: async (userId: number): Promise<User[]> => {
    try {
      const response = await api.get<User[]>(`/users/${userId}/followers`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch followers:', error);
      throw new Error('Failed to fetch followers');
    }
  },
  updateProfile: async (userId: string, data: FormData): Promise<User> => {
    try {
      // Create new FormData with correct part names
      const formDataToSend = new FormData();
      // Extract values from incoming FormData and append with correct part names
      const userName = data.get('username');
      const email = data.get('email');
      const profilePic = data.get('profilePicture');
      // Append with the exact names expected by the backend
      if (userName) formDataToSend.append('userName', userName as string);
      if (email) formDataToSend.append('email', email as string);
      if (profilePic) formDataToSend.append('profilePic', profilePic as Blob);
      const response = await api.put(`/users/${userId}/update-profile`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  },
  updatePassword: async (userId: string, oldPassword: string, newPassword: string): Promise<void> => {
    try {
      await api.put(`/users/${userId}/update-password`, {
        oldPassword,
        newPassword
      });
    } catch (error: any) {
      // Check if the error is due to incorrect old password
      if (error.response?.status === 400) {
        throw new Error('Current password is incorrect');
      }
      throw new Error('Failed to update password');
    }
  },
  verifyPassword: async (userId: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post(`/users/${userId}/verify-password`, {
        password
      });
      return response.data;
    } catch (error) {
      return false;
    }
  }
};