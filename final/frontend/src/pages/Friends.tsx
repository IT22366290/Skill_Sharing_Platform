import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, UsersIcon, MessageCircleIcon, UserPlusIcon, CheckIcon } from 'lucide-react';
import ChatBox from '../components/chat/ChatBox';
import { AnimatePresence } from 'framer-motion';
import { User } from '../types/user';
import { userService } from '../services/userService';
const Friends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [followings, setFollowings] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'following' | 'followers'>('all');
  const [isFollowLoading, setIsFollowLoading] = useState<number | null>(null);
  const [chatUser, setChatUser] = useState<{
    id: string;
    name: string;
    avatar: string;
  } | null>(null);
  const currentUserId = Number(localStorage.getItem('userId'));
  useEffect(() => {
    fetchUsers();
    if (currentUserId) {
      fetchFollowings();
    }
  }, [currentUserId]);
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const fetchedUsers = await userService.getAllUsers();
      setUsers(fetchedUsers);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchFollowings = async () => {
    try {
      const followingUsers = await userService.getFollowings(currentUserId);
      setFollowings(followingUsers.map(user => user.id));
    } catch (err) {
      console.error('Error fetching followings:', err);
    }
  };
  const handleFollowToggle = async (userId: number) => {
    if (!currentUserId) return;
    setIsFollowLoading(userId);
    try {
      if (followings.includes(userId)) {
        await userService.unfollowUser(currentUserId, userId);
        setFollowings(prev => prev.filter(id => id !== userId));
      } else {
        await userService.followUser(currentUserId, userId);
        setFollowings(prev => [...prev, userId]);
      }
    } catch (err) {
      console.error('Error toggling follow:', err);
    } finally {
      setIsFollowLoading(null);
    }
  };
  const filteredUsers = users.filter(user => {
    if (user.id === currentUserId) return false;
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' ? true : activeFilter === 'following' ? followings.includes(user.id) : activeFilter === 'followers' ? false : true; // TODO: Implement followers filter when API is available
    return matchesSearch && matchesFilter;
  });
  const getProfileImage = (user: User) => {
    if (user.profilePictureBase64) {
      return `data:image/jpeg;base64,${user.profilePictureBase64}`;
    }
    return 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
  };
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
  }
  return <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
          <p className="text-gray-600 mt-1">
            Connect with fellow learners and expand your network
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow mb-6">
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search for friends by name..." />
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={() => setActiveFilter('all')} className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              All Users
            </button>
            <button onClick={() => setActiveFilter('following')} className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'following' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              Following
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsers.map(user => <motion.div key={user.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} whileHover={{
        y: -4
      }} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="relative">
              {/* Banner - randomized gradient background */}
              <div className="h-24 w-full" style={{
            background: `linear-gradient(120deg, ${['#60A5FA', '#34D399', '#F472B6', '#A78BFA'][Math.floor(Math.random() * 4)]} 0%, ${['#3B82F6', '#10B981', '#EC4899', '#8B5CF6'][Math.floor(Math.random() * 4)]} 100%)`
          }} />
              {/* Profile Section */}
              <div className="px-6 pb-6">
                {/* Avatar */}
                <div className="relative -mt-12 mb-3">
                  <img src={getProfileImage(user)} alt={user.username} className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md" />
                  <div className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-green-400 border-2 border-white"></div>
                </div>
                {/* User Info */}
                <div className="flex flex-col space-y-1 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {user.username}
                  </h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <motion.div whileHover={{
                  scale: 1.05
                }} className="flex items-center">
                      <UsersIcon size={14} className="mr-1" />
                      <span>{user.followingCount || 0} following</span>
                    </motion.div>
                    <span className="mx-2">•</span>
                    <span>Joined 2024</span>
                  </div>
                </div>
                {/* Skills/Interests */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'TypeScript', 'UI/UX'].map((skill, idx) => <motion.span key={idx} whileHover={{
                scale: 1.05
              }} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                      {skill}
                    </motion.span>)}
                </div>
                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={() => handleFollowToggle(user.id)} disabled={isFollowLoading === user.id} className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${followings.includes(user.id) ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700'} ${isFollowLoading === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isFollowLoading === user.id ? <div className="h-5 w-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div> : followings.includes(user.id) ? <>
                        <CheckIcon size={18} className="mr-2" />
                        Following
                      </> : <>
                        <UserPlusIcon size={18} className="mr-2" />
                        Follow
                      </>}
                  </motion.button>
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={() => setChatUser({
                id: user.id.toString(),
                name: user.username,
                avatar: getProfileImage(user)
              })} className="flex-1 flex items-center justify-center px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200">
                    <MessageCircleIcon size={18} className="mr-2" />
                    Message
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>)}
      </div>
      {filteredUsers.length === 0 && <div className="text-center py-8">
          <UsersIcon size={48} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No users found
          </h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>}
      <AnimatePresence>
        {chatUser && <ChatBox user={chatUser} onClose={() => setChatUser(null)} />}
      </AnimatePresence>
    </div>;
};
export default Friends;