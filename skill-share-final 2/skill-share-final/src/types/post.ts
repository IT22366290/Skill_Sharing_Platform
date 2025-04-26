export interface Post {
  id: string;
  userId: string;
  description: string;
  postPictureBase64?: string;
  createdAt: string;
  likeCount?: number;
  user?: {
    id: string;
    username: string;
    email: string;
    profilePictureBase64?: string;
  };
}
export interface CreatePostDTO {
  userId: string;
  description: string;
  image?: File;
}