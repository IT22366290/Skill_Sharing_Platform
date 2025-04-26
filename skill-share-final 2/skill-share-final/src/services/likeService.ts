import api from './api';
interface LikeData {
  postId: string;
  userId: string;
}
export const likeService = {
  getLikeCount: async (postId: string): Promise<number> => {
    try {
      const response = await api.get<number>(`/likes/count/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch like count:', error);
      return 0;
    }
  },
  checkUserLike: async (postId: string, userId: string): Promise<boolean> => {
    try {
      const response = await api.get(`/likes/check?postId=${postId}&userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to check like status:', error);
      return false;
    }
  },
  likePost: async (data: LikeData): Promise<void> => {
    try {
      await api.post('/likes', data);
    } catch (error) {
      console.error('Failed to like post:', error);
      throw error;
    }
  },
  unlikePost: async (data: LikeData): Promise<void> => {
    try {
      await api.delete(`/likes?postId=${data.postId}&userId=${data.userId}`);
    } catch (error) {
      console.error('Failed to unlike post:', error);
      throw error;
    }
  }
};