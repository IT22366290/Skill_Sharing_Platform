import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, XIcon, SmileIcon, SendIcon, TrashIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { commentService, Comment } from '../../services/commentService';
import { userService } from '../../services/userService';
interface CommentsPanelProps {
  postId: string;
  onClose: () => void;
  onCommentAdded?: () => void;
}
const CommentsPanel: React.FC<CommentsPanelProps> = ({
  postId,
  onClose,
  onCommentAdded
}) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const currentUserId = localStorage.getItem('userId');
  useEffect(() => {
    fetchComments();
  }, [postId]);
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const fetchedComments = await commentService.getPostComments(postId);
      const commentsWithUsers = await Promise.all(fetchedComments.map(async comment => {
        try {
          const userData = await userService.getUserById(comment.userId);
          return {
            ...comment,
            user: userData
          };
        } catch (error) {
          console.error(`Failed to fetch user data for comment ${comment.id}:`, error);
          return comment;
        }
      }));
      setComments(commentsWithUsers);
    } catch (error) {
      setError('Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('Please sign in to comment');
      return;
    }
    try {
      const comment = await commentService.createComment({
        postId,
        userId,
        text: newComment
      });
      const userData = await userService.getUserById(userId);
      const commentWithUser = {
        ...comment,
        user: userData
      };
      setComments(prev => [...prev, commentWithUser]);
      setNewComment('');
      setError('');
      onCommentAdded?.();
    } catch (error) {
      setError('Failed to post comment');
    }
  };
  const handleDeleteComment = async (commentId: string) => {
    try {
      await commentService.deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      if (onCommentAdded) {
        onCommentAdded(); // Update the comment count in parent component
      }
    } catch (error) {
      setError('Failed to delete comment');
    }
  };
  return <motion.div initial={{
    opacity: 0,
    height: 0
  }} animate={{
    opacity: 1,
    height: 'auto'
  }} exit={{
    opacity: 0,
    height: 0
  }} className="border-t border-gray-200 bg-gray-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">
            Comments ({comments.length})
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon size={18} />
          </button>
        </div>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>}
        {isLoading ? <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div> : <div className="space-y-4 max-h-80 overflow-y-auto">
            {comments.map(comment => <div key={comment.id} className="flex space-x-3">
                <Link to={`/profile/${comment.userId}`}>
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar" className="h-8 w-8 rounded-full" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="bg-white p-3 rounded-lg shadow-sm relative group">
                    <div className="flex items-center justify-between">
                      <Link to={`/profile/${comment.userId}`} className="text-sm font-medium text-gray-900 hover:underline">
                        {comment.user?.username || `User ${comment.userId}`}
                      </Link>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500">
                          {formatTime(comment.createdAt)}
                        </span>
                        {currentUserId === comment.userId && <motion.button whileHover={{
                    scale: 1.1
                  }} whileTap={{
                    scale: 0.95
                  }} onClick={() => handleDeleteComment(comment.id)} className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <TrashIcon size={14} />
                          </motion.button>}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-800">{comment.text}</p>
                  </div>
                </div>
              </div>)}
            {comments.length === 0 && !isLoading && <div className="text-center py-6 text-gray-500">
                No comments yet. Be the first to comment!
              </div>}
          </div>}
        <form onSubmit={handleSubmitComment} className="mt-4 flex items-center">
          <div className="relative flex-1">
            <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Write a comment..." className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm" />
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <SmileIcon size={18} />
            </button>
          </div>
          <motion.button whileTap={{
          scale: 0.95
        }} type="submit" disabled={!newComment.trim()} className="ml-2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
            <SendIcon size={16} />
          </motion.button>
        </form>
      </div>
    </motion.div>;
};
export default CommentsPanel;