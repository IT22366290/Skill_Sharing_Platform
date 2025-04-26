import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, FilterIcon, BookmarkIcon, TrashIcon, FolderIcon } from 'lucide-react';
import PostCard from '../components/posts/PostCard';
interface SavedPost {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  goals?: string[];
  isLiked?: boolean;
  savedAt: string;
  category: string;
}
const Saved = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([{
    id: '1',
    user: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    content: 'Just completed my first UI design project using Figma! Learning so much about design principles and user experience. Would love some feedback from fellow designers!',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 5,
    goals: ['UI/UX Design', 'Figma'],
    savedAt: '2024-02-10',
    category: 'Design'
  }, {
    id: '2',
    user: {
      id: 'user2',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    content: "Here's a great React hooks cheatsheet I created for beginners. Hope this helps others in their learning journey! #React #WebDev",
    timestamp: '1 day ago',
    likes: 156,
    comments: 23,
    goals: ['React', 'JavaScript'],
    savedAt: '2024-02-09',
    category: 'Programming'
  }, {
    id: '3',
    user: {
      id: 'user3',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    content: "Quick tip for language learners: Practice with native speakers for 30 minutes daily. It's amazing how much progress you can make! #LanguageLearning",
    timestamp: '3 days ago',
    likes: 89,
    comments: 12,
    goals: ['Spanish', 'Language Learning'],
    savedAt: '2024-02-08',
    category: 'Language'
  }]);
  const categories = [{
    id: 'all',
    name: 'All Saved'
  }, {
    id: 'Design',
    name: 'Design'
  }, {
    id: 'Programming',
    name: 'Programming'
  }, {
    id: 'Language',
    name: 'Language'
  }];
  const removeSavedPost = (postId: string) => {
    setSavedPosts(savedPosts.filter(post => post.id !== postId));
  };
  const filteredPosts = savedPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || post.category === activeFilter;
    return matchesSearch && matchesFilter;
  });
  return <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Posts</h1>
          <p className="text-gray-600 mt-1">
            Your collection of saved learning resources and insights
          </p>
        </div>
        <div className="text-sm text-gray-600">
          {savedPosts.length} saved items
        </div>
      </div>
      <div className="bg-white rounded-xl shadow mb-6">
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search in saved posts..." />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map(category => <button key={category.id} onClick={() => setActiveFilter(category.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === category.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {category.name}
                </button>)}
            </div>
            <button className="p-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200">
              <FilterIcon size={20} />
            </button>
          </div>
        </div>
      </div>
      {filteredPosts.length > 0 ? <div className="space-y-4">
          {filteredPosts.map(post => <div key={post.id} className="relative">
              <PostCard post={post} />
              <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} onClick={() => removeSavedPost(post.id)} className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200">
                <TrashIcon size={16} />
              </motion.button>
            </div>)}
        </div> : <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="text-center py-12">
          <div className="flex justify-center mb-4">
            <BookmarkIcon size={48} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No saved posts found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery ? "We couldn't find any saved posts matching your search" : "You haven't saved any posts yet. Save posts to read them later!"}
          </p>
          {searchQuery && <button onClick={() => setSearchQuery('')} className="text-blue-600 hover:text-blue-700 font-medium">
              Clear search
            </button>}
        </motion.div>}
      {/* Stats Section */}
      {savedPosts.length > 0 && <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center text-blue-600 mb-2">
              <BookmarkIcon size={20} className="mr-2" />
              <h3 className="font-semibold">Total Saved</h3>
            </div>
            <p className="text-2xl font-bold">{savedPosts.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center text-green-600 mb-2">
              <FolderIcon size={20} className="mr-2" />
              <h3 className="font-semibold">Categories</h3>
            </div>
            <p className="text-2xl font-bold">
              {new Set(savedPosts.map(post => post.category)).size}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center text-purple-600 mb-2">
              <FilterIcon size={20} className="mr-2" />
              <h3 className="font-semibold">Most Saved</h3>
            </div>
            <p className="text-sm font-medium">
              {Object.entries(savedPosts.reduce((acc, post) => {
            acc[post.category] = (acc[post.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)).sort(([, a], [, b]) => b - a)[0]?.[0]}
            </p>
          </div>
        </div>}
    </div>;
};
export default Saved;