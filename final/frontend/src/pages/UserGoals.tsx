import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FilterIcon, TargetIcon, BookOpenIcon, AlertCircleIcon } from 'lucide-react';
import { Post } from '../types/post';
import { skillPostService } from '../services/skillPostService';
import PostCard from '../components/posts/PostCard';
const UserGoals = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const currentUserId = localStorage.getItem('userId');
  useEffect(() => {
    fetchUserGoals();
  }, []);
  const fetchUserGoals = async () => {
    if (!currentUserId) return;
    setIsLoading(true);
    try {
      const response = await skillPostService.getUserPosts(currentUserId);
      setPosts(response);
      setError(null);
    } catch (err) {
      console.error('Error fetching user goals:', err);
      setError('Failed to load your goals');
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-2xl font-bold text-gray-900">
            My Learning Journey
          </h1>
          <p className="text-gray-600 mt-1">
            Track your progress and achievements
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Posts</option>
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center text-blue-600 mb-2">
            <TargetIcon size={20} className="mr-2" />
            <h3 className="font-semibold">Total Posts</h3>
          </div>
          <p className="text-2xl font-bold">{posts.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center text-green-600 mb-2">
            <BookOpenIcon size={20} className="mr-2" />
            <h3 className="font-semibold">Learning Streak</h3>
          </div>
          <p className="text-2xl font-bold">7 days</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center text-purple-600 mb-2">
            <FilterIcon size={20} className="mr-2" />
            <h3 className="font-semibold">Most Active In</h3>
          </div>
          <p className="text-sm font-medium">Web Development</p>
        </div>
      </div>
      {/* Posts Grid */}
      {posts.length > 0 ? <div className="space-y-4">
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div> : <div className="text-center py-12">
          <TargetIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No goals posted yet
          </h3>
          <p className="text-gray-500">
            Start sharing your learning journey and track your progress
          </p>
        </div>}
    </div>;
};
export default UserGoals;