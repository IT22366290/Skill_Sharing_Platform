import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SearchIcon, TrendingUpIcon, UserPlusIcon, FilterIcon } from 'lucide-react';
const Explore = () => {
  const [activeCategory, setActiveCategory] = useState('trending');
  const categories = [{
    id: 'trending',
    name: 'Trending'
  }, {
    id: 'design',
    name: 'Design'
  }, {
    id: 'programming',
    name: 'Programming'
  }, {
    id: 'languages',
    name: 'Languages'
  }, {
    id: 'music',
    name: 'Music'
  }, {
    id: 'fitness',
    name: 'Fitness'
  }];
  const trendingUsers = [{
    id: 'user1',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'UI/UX Designer | Learning React & Figma',
    goals: ['UI/UX', 'React'],
    followers: 1.2,
    following: false
  }, {
    id: 'user2',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Full Stack Developer | Teaching Python',
    goals: ['Python', 'JavaScript'],
    followers: 3.4,
    following: true
  }, {
    id: 'user3',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Language Enthusiast | Learning Spanish & French',
    goals: ['Spanish', 'French'],
    followers: 0.8,
    following: false
  }, {
    id: 'user4',
    name: 'Michael Brown',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Guitar Teacher | Music Theory Expert',
    goals: ['Guitar', 'Music Theory'],
    followers: 5.6,
    following: false
  }];
  const trendingGoals = [{
    id: 'goal1',
    title: 'Learn UI/UX Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    learners: 15243,
    category: 'design'
  }, {
    id: 'goal2',
    title: 'Master React Development',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    learners: 12982,
    category: 'programming'
  }, {
    id: 'goal3',
    title: 'Learn Spanish',
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    learners: 8879,
    category: 'languages'
  }, {
    id: 'goal4',
    title: 'Play Guitar',
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    learners: 7654,
    category: 'music'
  }];
  const toggleFollow = (userId: string) => {
    // In a real app, this would update state properly
    console.log(`Toggle follow for user ${userId}`);
  };
  return <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Explore</h1>
        <p className="text-gray-600">
          Discover new skills, goals, and people to follow
        </p>
      </div>
      <div className="bg-white rounded-xl shadow mb-6">
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="Search for skills, goals, or people..." />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
              {categories.map(category => <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {category.name}
                </button>)}
            </div>
            <button className="p-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200">
              <FilterIcon size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Trending People */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            People to Follow
          </h2>
          <Link to="#" className="text-sm text-blue-600 hover:text-blue-800">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingUsers.map(user => <motion.div key={user.id} whileHover={{
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
                </div>
                <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={() => toggleFollow(user.id)} className={`shrink-0 flex items-center px-3 py-1 rounded-full text-sm font-medium ${user.following ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  {!user.following && <UserPlusIcon size={16} className="mr-1" />}
                  {user.following ? 'Following' : 'Follow'}
                </motion.button>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                {user.followers}k followers
              </div>
            </motion.div>)}
        </div>
      </div>
      {/* Trending Goals */}
      <div>
        <div className="flex items-center mb-4">
          <TrendingUpIcon className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            Trending Goals
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingGoals.filter(goal => activeCategory === 'trending' || goal.category === activeCategory).map(goal => <motion.div key={goal.id} whileHover={{
          y: -4,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }} className="bg-white rounded-xl shadow overflow-hidden">
                <div className="h-32 w-full overflow-hidden">
                  <img src={goal.image} alt={goal.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500">
                      {goal.learners.toLocaleString()} learners
                    </span>
                    <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Join
                    </motion.button>
                  </div>
                </div>
              </motion.div>)}
        </div>
      </div>
    </div>;
};
export default Explore;