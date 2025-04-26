import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartIcon, MessageCircleIcon, ShareIcon, BookmarkIcon } from 'lucide-react';
import { userService } from '../../services/userService';
import { likeService } from '../../services/likeService';
import CommentsPanel from './CommentsPanel';
import { commentService } from '../../services/commentService';
interface PostCardProps {
  post: {
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
  };
}
const PostCard: React.FC<PostCardProps> = ({
  post
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [author, setAuthor] = useState(post.user);
  const [isLoadingAuthor, setIsLoadingAuthor] = useState(!post.user);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    const fetchAuthor = async () => {
      if (!post.user) {
        try {
          const userData = await userService.getUserById(post.userId);
          setAuthor(userData);
        } catch (error) {
          console.error('Failed to fetch author:', error);
        } finally {
          setIsLoadingAuthor(false);
        }
      }
    };
    const fetchLikeCount = async () => {
      try {
        const count = await likeService.getLikeCount(post.id);
        setLikeCount(count);
      } catch (error) {
        console.error('Failed to fetch like count:', error);
      }
    };
    const checkUserLike = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const hasLiked = await likeService.checkUserLike(post.id, userId);
          setIsLiked(hasLiked);
        } catch (error) {
          console.error('Failed to check like status:', error);
        }
      }
    };
    const fetchCommentCount = async () => {
      try {
        const comments = await commentService.getPostComments(post.id);
        setCommentCount(comments.length);
      } catch (error) {
        console.error('Failed to fetch comment count:', error);
      }
    };
    fetchAuthor();
    if (!post.likeCount) {
      fetchLikeCount();
    }
    checkUserLike();
    fetchCommentCount();
  }, [post.userId, post.user, post.id, post.likeCount]);
  const handleLikeClick = async () => {
    if (isLiking) return;
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    setIsLiking(true);
    try {
      if (!isLiked) {
        await likeService.likePost({
          postId: post.id,
          userId
        });
        setLikeCount(prev => prev + 1);
      } else {
        await likeService.unlikePost({
          postId: post.id,
          userId
        });
        setLikeCount(prev => Math.max(0, prev - 1));
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    } finally {
      setIsLiking(false);
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="bg-white rounded-xl shadow mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-3">
          {isLoadingAuthor ? <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="ml-3">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>
            </div> : <Link to={`/profile/${post.userId}`} className="flex items-center group">
              <img src={author?.profilePictureBase64 ? `data:image/jpeg;base64,${author.profilePictureBase64}` : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt={author?.username || 'User'} className="w-10 h-10 rounded-full object-cover" />
              <div className="ml-3">
                <span className="font-medium text-gray-900 group-hover:text-blue-600">
                  {author?.username || 'Unknown User'}
                </span>
                <div className="text-xs text-gray-500">
                  {post.createdAt && (() => {
                const timeParts = post.createdAt.split(':');
                if (timeParts.length < 2) return 'Invalid time';
                let hour = parseInt(timeParts[0]);
                const minute = timeParts[1];
                const suffix = hour >= 12 ? 'PM' : 'AM';
                hour = hour % 12 || 12;
                return `${hour}:${minute} ${suffix}`;
              })()}
                </div>
              </div>
            </Link>}
        </div>
        <div className="mt-3">
          <p className="text-gray-800">{post.description}</p>
        </div>
        {post.postPictureBase64 && <div className="mt-3 -mx-4">
            <img src={`data:image/jpeg;base64,${post.postPictureBase64}`} alt="Post content" className="w-full max-h-96 object-cover" />
          </div>}
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
          <motion.button whileTap={{
          scale: 0.9
        }} onClick={handleLikeClick} disabled={isLiking} className={`flex items-center px-3 py-1.5 rounded-lg ${isLiked ? 'text-red-500' : 'text-gray-500 hover:bg-gray-100'} ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <HeartIcon size={18} className={isLiked ? 'fill-red-500' : ''} />
            <span className="ml-2 text-sm font-medium">
              {likeCount > 0 ? `${likeCount} Likes` : 'Like'}
            </span>
          </motion.button>
          <motion.button whileTap={{
          scale: 0.9
        }} onClick={() => setShowComments(!showComments)} className="flex items-center px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-100">
            <MessageCircleIcon size={18} />
            <span className="ml-2 text-sm font-medium">
              {commentCount > 0 ? `${commentCount} Comments` : 'Comment'}
            </span>
          </motion.button>
          <motion.button whileTap={{
          scale: 0.9
        }} className="flex items-center px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-100">
            <ShareIcon size={18} />
            <span className="ml-2 text-sm font-medium">Share</span>
          </motion.button>
          <motion.button whileTap={{
          scale: 0.9
        }} onClick={() => setIsBookmarked(!isBookmarked)} className={`flex items-center px-3 py-1.5 rounded-lg ${isBookmarked ? 'text-blue-500' : 'text-gray-500 hover:bg-gray-100'}`}>
            <BookmarkIcon size={18} className={isBookmarked ? 'fill-blue-500' : ''} />
            <span className="ml-2 text-sm font-medium">Save</span>
          </motion.button>
        </div>
      </div>
      {showComments && <CommentsPanel postId={post.id} onClose={() => setShowComments(false)} onCommentAdded={() => setCommentCount(prev => prev + 1)} />}
    </motion.div>;
};
export default PostCard;