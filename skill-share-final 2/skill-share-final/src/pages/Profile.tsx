import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import PostCard from '../components/posts/PostCard';
import { UserPlusIcon, MessageCircleIcon, SettingsIcon, BriefcaseIcon, BookOpenIcon, MapPinIcon, CalendarIcon, LinkIcon } from 'lucide-react';
const Profile = () => {
  const {
    id
  } = useParams();
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  // Sample user data
  const user = {
    id: id || 'user1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    coverImage: 'https://images.unsplash.com/photo-1557682250-4b6f00d2b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    bio: 'UI/UX Designer | Learning React & Tailwind | Guitar enthusiast',
    location: 'San Francisco, CA',
    joinDate: 'Joined January 2023',
    website: 'sarahjohnson.design',
    occupation: 'Senior Designer at CreativeHub',
    followers: 245,
    following: 118,
    skills: ['UI/UX Design', 'Figma', 'React', 'Tailwind CSS', 'Guitar'],
    currentGoals: [{
      id: '1',
      name: 'Master React Hooks',
      progress: 65
    }, {
      id: '2',
      name: 'Learn Spanish',
      progress: 30
    }, {
      id: '3',
      name: 'Complete 100 Days of UI',
      progress: 82
    }]
  };
  // Sample posts data
  const posts = [{
    id: '1',
    user: {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    },
    content: 'Just completed my first UI design project using Figma! Learning so much about design principles and user experience. Would love some feedback from fellow designers!',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 5,
    goals: ['UI/UX Design', 'Figma'],
    isLiked: false
  }, {
    id: '2',
    user: {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    },
    content: 'Working on improving my React skills today. Built a small component library with Tailwind CSS. Progress feels good!',
    timestamp: '3 days ago',
    likes: 15,
    comments: 3,
    goals: ['React', 'Tailwind CSS'],
    isLiked: true
  }];
  const tabs = [{
    id: 'posts',
    label: 'Posts'
  }, {
    id: 'goals',
    label: 'Goals'
  }, {
    id: 'followers',
    label: 'Followers'
  }, {
    id: 'following',
    label: 'Following'
  }];
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };
  return <div className="w-full">
      {/* Cover and Profile Picture */}
      <div className="relative mb-6">
        <div className="h-48 md:h-64 rounded-lg overflow-hidden">
          <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover" />
        </div>
        <div className="absolute left-4 -bottom-16 border-4 border-white rounded-full">
          <motion.div whileHover={{
          scale: 1.05
        }} className="h-32 w-32 rounded-full overflow-hidden">
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </div>
      {/* Profile Info */}
      <div className="pl-4 pr-4 pt-16 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 mt-1">{user.bio}</p>
            <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
              {user.occupation && <div className="flex items-center mr-4 mb-2">
                  <BriefcaseIcon size={16} className="mr-1" />
                  <span>{user.occupation}</span>
                </div>}
              {user.location && <div className="flex items-center mr-4 mb-2">
                  <MapPinIcon size={16} className="mr-1" />
                  <span>{user.location}</span>
                </div>}
              {user.joinDate && <div className="flex items-center mr-4 mb-2">
                  <CalendarIcon size={16} className="mr-1" />
                  <span>{user.joinDate}</span>
                </div>}
              {user.website && <div className="flex items-center mb-2">
                  <LinkIcon size={16} className="mr-1" />
                  <a href="#" className="text-blue-600 hover:underline">
                    {user.website}
                  </a>
                </div>}
            </div>
            <div className="flex items-center mt-3 space-x-6">
              <span className="text-sm">
                <span className="font-semibold">{user.followers}</span>{' '}
                followers
              </span>
              <span className="text-sm">
                <span className="font-semibold">{user.following}</span>{' '}
                following
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={handleFollowToggle} className={`flex items-center px-4 py-2 rounded-lg font-medium ${isFollowing ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              {isFollowing ? 'Following' : <>
                  <UserPlusIcon size={18} className="mr-1" />
                  Follow
                </>}
            </motion.button>
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="flex items-center px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300">
              <MessageCircleIcon size={18} className="mr-1" />
              Message
            </motion.button>
            {id === 'me' && <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="p-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300">
                <SettingsIcon size={18} />
              </motion.button>}
          </div>
        </div>
        {/* Skills */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Skills & Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, idx) => <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {skill}
              </span>)}
          </div>
        </div>
        {/* Current Goals */}
        <div className="mt-6">
          <div className="flex items-center">
            <BookOpenIcon size={18} className="text-gray-500 mr-2" />
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Current Learning Goals
            </h3>
          </div>
          <div className="mt-2 space-y-3">
            {user.currentGoals.map(goal => <div key={goal.id} className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">{goal.name}</span>
                  <span className="text-xs text-gray-500">
                    {goal.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{
                width: `${goal.progress}%`
              }}></div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-t border-gray-200 mt-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
            </button>)}
        </div>
      </div>
      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'posts' && <div className="space-y-4">
            {posts.map(post => <PostCard key={post.id} post={post} />)}
          </div>}
        {activeTab === 'goals' && <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-4">Learning Journey</h3>
            <div className="space-y-6">
              {user.currentGoals.map(goal => <div key={goal.id} className="border-l-2 border-blue-500 pl-4 pb-6 relative">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-500"></div>
                  <h4 className="font-medium">{goal.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Progress: {goal.progress}%
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{
                width: `${goal.progress}%`
              }}></div>
                  </div>
                </div>)}
            </div>
          </div>}
        {activeTab === 'followers' && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="flex items-center p-4 bg-white rounded-lg shadow">
                <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`} alt="Follower" className="h-12 w-12 rounded-full object-cover" />
                <div className="ml-3">
                  <h4 className="font-medium">User Name {i}</h4>
                  <p className="text-sm text-gray-500">
                    Learning React, Python
                  </p>
                </div>
                <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="ml-auto px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-full">
                  Follow Back
                </motion.button>
              </div>)}
          </div>}
        {activeTab === 'following' && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="flex items-center p-4 bg-white rounded-lg shadow">
                <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 5}.jpg`} alt="Following" className="h-12 w-12 rounded-full object-cover" />
                <div className="ml-3">
                  <h4 className="font-medium">User Name {i}</h4>
                  <p className="text-sm text-gray-500">
                    Learning Design, Spanish
                  </p>
                </div>
                <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="ml-auto px-3 py-1 text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-full">
                  Following
                </motion.button>
              </div>)}
          </div>}
      </div>
    </div>;
};
export default Profile;