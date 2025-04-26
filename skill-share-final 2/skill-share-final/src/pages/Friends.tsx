import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SearchIcon, UserPlusIcon, FilterIcon, UsersIcon, UserIcon, MessageCircleIcon } from 'lucide-react';
import ChatBox from '../components/chat/ChatBox';
import { AnimatePresence } from 'framer-motion';
interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  goals: string[];
  followers: number;
  following: boolean;
  mutualFriends?: number;
}
const Friends = () => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [searchQuery, setSearchQuery] = useState('');
  const [followingIds, setFollowingIds] = useState<string[]>(['user2', 'user5']);
  const [chatUser, setChatUser] = useState<{
    id: string;
    name: string;
    avatar: string;
  } | null>(null);
  const users: User[] = [{
    id: 'user1',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'UI/UX Designer | Learning React & Figma',
    goals: ['UI/UX', 'React'],
    followers: 1243,
    following: false,
    mutualFriends: 12
  }, {
    id: 'user2',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Full Stack Developer | Teaching Python',
    goals: ['Python', 'JavaScript'],
    followers: 3421,
    following: true,
    mutualFriends: 8
  }, {
    id: 'user3',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Language Enthusiast | Learning Spanish & French',
    goals: ['Spanish', 'French'],
    followers: 892,
    following: false,
    mutualFriends: 15
  }, {
    id: 'user4',
    name: 'Michael Brown',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Guitar Teacher | Music Theory Expert',
    goals: ['Guitar', 'Music Theory'],
    followers: 5632,
    following: false,
    mutualFriends: 5
  }, {
    id: 'user5',
    name: 'Lisa Anderson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Data Scientist | Machine Learning Enthusiast',
    goals: ['Python', 'ML'],
    followers: 2341,
    following: true,
    mutualFriends: 3
  }];
  const tabs = [{
    id: 'suggestions',
    label: 'Suggestions',
    icon: <UserPlusIcon size={20} className="mr-2" />
  }, {
    id: 'followers',
    label: 'Followers',
    icon: <UsersIcon size={20} className="mr-2" />
  }, {
    id: 'following',
    label: 'Following',
    icon: <UserIcon size={20} className="mr-2" />
  }];
  const toggleFollow = (userId: string) => {
    setFollowingIds(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
  };
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'suggestions' ? !followingIds.includes(user.id) : activeTab === 'followers' ? true // In a real app, would filter for actual followers
    : followingIds.includes(user.id);
    return matchesSearch && matchesTab;
  });
  return <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
          <p className="text-gray-600 mt-1">
            Connect with fellow learners and expand your network
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{followingIds.length}</span>{' '}
            Following
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">
              {users.filter(u => followingIds.includes(u.id)).length}
            </span>{' '}
            Followers
          </div>
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
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-2">
              {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {tab.icon}
                  {tab.label}
                </button>)}
            </div>
            <button className="p-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200">
              <FilterIcon size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.map(user => <motion.div key={user.id} whileHover={{
        y: -4,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }} className="bg-white rounded-xl shadow p-4">
            <div className="flex items-start">
              <Link to={`/profile/${user.id}`} className="shrink-0">
                <img src={user.avatar} alt={user.name} className="h-14 w-14 rounded-full object-cover" />
              </Link>
              <div className="ml-3 flex-1">
                <Link to={`/profile/${user.id}`}>
                  <h3 className="font-medium text-gray-900 hover:text-blue-600">
                    {user.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-0.5">{user.bio}</p>
                <div className="flex flex-wrap mt-2">
                  {user.goals.map((goal, idx) => <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-1 mb-1">
                      {goal}
                    </span>)}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="mr-3">{user.followers} followers</span>
                  {user.mutualFriends && <span>{user.mutualFriends} mutual friends</span>}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={() => toggleFollow(user.id)} className={`shrink-0 flex items-center px-3 py-1 rounded-full text-sm font-medium ${followingIds.includes(user.id) ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  {!followingIds.includes(user.id) && <UserPlusIcon size={16} className="mr-1" />}
                  {followingIds.includes(user.id) ? 'Following' : 'Follow'}
                </motion.button>
                <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={() => setChatUser({
              id: user.id,
              name: user.name,
              avatar: user.avatar
            })} className="shrink-0 p-1.5 rounded-full text-gray-500 hover:bg-gray-100">
                  <MessageCircleIcon size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>)}
      </div>
      {filteredUsers.length === 0 && <div className="text-center py-8">
          <UsersIcon size={48} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No users found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>}
      <AnimatePresence>
        {chatUser && <ChatBox user={chatUser} onClose={() => setChatUser(null)} />}
      </AnimatePresence>
    </div>;
};
export default Friends;