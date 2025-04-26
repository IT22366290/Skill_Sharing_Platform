import { CreatePostDTO, Post } from '../types/post';
import api from './api';
export const skillPostService = {
  getAllPosts: async (): Promise<Post[]> => {
    try {
      const response = await api.get<Post[]>('/skillPosts');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  },
  getPostById: async (id: string): Promise<Post> => {
    try {
      const response = await api.get<Post>(`/skillPosts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch post');
    }
  },
  createSkillPost: async (data: CreatePostDTO): Promise<Post> => {
    try {
      const formData = new FormData();
      formData.append('userId', data.userId);
      formData.append('description', data.description);
      if (data.image) {
        formData.append('image', data.image);
      }
      const response = await api.post<Post>('/skillPosts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create post');
    }
  },
  updatePost: async (id: string, data: Partial<CreatePostDTO>): Promise<Post> => {
    try {
      const formData = new FormData();
      if (data.description) {
        formData.append('description', data.description);
      }
      if (data.image) {
        formData.append('image', data.image);
      }
      const response = await api.put<Post>(`/skillPosts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update post');
    }
  },
  deletePost: async (id: string): Promise<void> => {
    try {
      await api.delete(`/skillPosts/${id}`);
    } catch (error) {
      throw new Error('Failed to delete post');
    }
  }
};