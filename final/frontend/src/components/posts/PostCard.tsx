import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { HeartIcon, MessageCircleIcon, ShareIcon, BookmarkIcon, MoreVerticalIcon, EditIcon, TrashIcon } from 'lucide-react';
import { userService } from '../../services/userService';
import { likeService } from '../../services/likeService';
import { skillPostService } from '../../services/skillPostService';
import CommentsPanel from './CommentsPanel';
import { commentService } from '../../services/commentService';
import EditPostModal from './EditPostModal';
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
  onEdit?: () => void;
  showActions?: boolean;
  onDelete?: () => void;
}
const PostCard: React.FC<PostCardProps> = ({
  post,
  onEdit,
  showActions
}) => {
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [author, setAuthor] = useState(post.user);
  const [isLoadingAuthor, setIsLoadingAuthor] = useState(!post.user);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const currentUserId = localStorage.getItem('userId');
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
  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await skillPostService.deletePost(post.id);
        // Refresh the page to show updated list
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
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
  return <>
      <motion.div layout className="bg-white rounded-xl shadow mb-4 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link to={`/profile/${post.userId}`} className="flex items-center group">
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
              </Link>
            </div>
            <div className="relative">
              <motion.button whileTap={{
              scale: 0.95
            }} onClick={() => setShowDropdownMenu(!showDropdownMenu)} className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVerticalIcon size={20} className="text-gray-500" />
              </motion.button>
              <AnimatePresence>
                {showDropdownMenu && <motion.div initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -10
              }} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                    <button onClick={() => {
                  setShowDropdownMenu(false);
                  setShowEditModal(true);
                }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                      <EditIcon size={16} className="mr-2" />
                      Edit Post
                    </button>
                    <button onClick={() => {
                  setShowDropdownMenu(false);
                  handleDeletePost();
                }} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
                      <TrashIcon size={16} className="mr-2" />
                      Delete Post
                    </button>
                  </motion.div>}
              </AnimatePresence>
            </div>
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
      </motion.div>
      {/* Add EditPostModal */}
      {showEditModal && <EditPostModal post={post} onClose={() => setShowEditModal(false)} onUpdate={() => {
      setShowEditModal(false);
      window.location.reload(); // Refresh to show updated post
    }} />}
    </>;
};
export default PostCard;