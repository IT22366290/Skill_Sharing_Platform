import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PostCard from '../components/posts/PostCard';
import { PenIcon } from 'lucide-react';
import { skillPostService } from '../services/skillPostService';
import { userService } from '../services/userService';
import { Post } from '../types/post';
import { User } from '../types/user';
interface HomeProps {
  onCreatePost: () => void;
}
const Home: React.FC<HomeProps> = ({
  onCreatePost
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await skillPostService.getAllPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError('Failed to load posts');
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
    // Fetch current user data
    const fetchCurrentUser = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const userData = await userService.getUserById(userId);
          setCurrentUser(userData);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };
    fetchCurrentUser();
  }, []);
  return <div className="w-full">
      <div className="bg-white rounded-xl shadow mb-4 p-4">
        <div className="flex items-center space-x-3">
          <img src={currentUser?.profilePictureBase64 ? `data:image/jpeg;base64,${currentUser.profilePictureBase64}` : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="Your avatar" className="h-10 w-10 rounded-full object-cover" />
          <button onClick={onCreatePost} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 text-left px-4 py-2 rounded-full">
            What are you learning today?
          </button>
        </div>
        <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
          <button onClick={onCreatePost} className="flex items-center px-4 py-1.5 text-gray-500 hover:bg-gray-100 rounded-lg">
            <PenIcon size={18} className="mr-2" />
            <span className="text-sm font-medium">Create Post</span>
          </button>
        </div>
      </div>
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>}
      {isLoading ? <div className="flex justify-center my-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div> : <>
          {posts.map(post => <PostCard key={post.id} post={post} />)}
          {posts.length === 0 && !error && <div className="text-center my-8 text-gray-500">
              No posts yet. Be the first to share!
            </div>}
        </>}
      {/* Mobile action button */}
      <motion.button whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.95
    }} onClick={onCreatePost} className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-10">
        <PenIcon size={24} />
      </motion.button>
    </div>;
};
export default Home;