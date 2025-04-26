import api from './api';
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  text: string;
  createdAt: string;
  user?: {
    id: string;
    username: string;
    email: string;
    profilePictureBase64?: string;
  };
}
export interface CreateCommentDTO {
  postId: string;
  userId: string;
  text: string;
}
export const commentService = {
  getPostComments: async (postId: string): Promise<Comment[]> => {
    try {
      const response = await api.get<Comment[]>(`/comments/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      return [];
    }
  },
  createComment: async (data: CreateCommentDTO): Promise<Comment> => {
    try {
      const response = await api.post<Comment>('/comments', {
        postId: data.postId,
        userId: data.userId,
        text: data.text
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create comment:', error);
      throw error;
    }
  },
  deleteComment: async (commentId: string): Promise<void> => {
    try {
      await api.delete(`/comments/${commentId}`);
    } catch (error) {
      console.error('Failed to delete comment:', error);
      throw error;
    }
  }
};