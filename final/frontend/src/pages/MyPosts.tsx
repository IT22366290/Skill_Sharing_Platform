import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PenIcon, AlertCircleIcon } from 'lucide-react';
import PostCard from '../components/posts/PostCard';
import EditPostModal from '../components/posts/EditPostModal';
import { Post } from '../types/post';
import { skillPostService } from '../services/skillPostService';
const MyPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const currentUserId = localStorage.getItem('userId');
  useEffect(() => {
    fetchUserPosts();
  }, []);
  const fetchUserPosts = async () => {
    if (!currentUserId) {
      setError('User not authenticated');
      setIsLoading(false);
      return;
    }
    try {
      const fetchedPosts = await skillPostService.getUserPosts(currentUserId);
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load your posts');
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditClick = (post: Post) => {
    setSelectedPost(post);
  };
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
  }
  if (error) {
    return <div className="flex flex-col items-center justify-center h-64">
        <AlertCircleIcon className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
        <p className="text-gray-500">{error}</p>
      </div>;
  }
  return <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Posts</h1>
          <p className="text-gray-600 mt-1">
            View and manage all your shared posts
          </p>
        </div>
        <div className="text-sm text-gray-600">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </div>
      </div>
      {posts.length > 0 ? <div className="space-y-4">
          {posts.map(post => <PostCard key={post.id} post={post} onEdit={() => handleEditClick(post)} showActions={true} />)}
        </div> : <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="text-center py-12">
          <PenIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-500">
            Start sharing your learning journey with the community
          </p>
        </motion.div>}
      {selectedPost && <EditPostModal post={selectedPost} onClose={() => setSelectedPost(null)} onUpdate={() => {
      fetchUserPosts();
      setSelectedPost(null);
    }} />}
    </div>;
};
export default MyPosts;