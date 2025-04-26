import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrendingUpIcon } from 'lucide-react';
const RightSidebar = () => {
  const suggestedUsers = [{
    id: '1',
    name: 'Emma Watson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    goals: ['UX Design', 'Spanish']
  }, {
    id: '2',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    goals: ['Python', 'Public Speaking']
  }, {
    id: '3',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    goals: ['React Native', 'Guitar']
  }];
  const trendingGoals = [{
    id: '1',
    name: 'UI/UX Design',
    count: 1243
  }, {
    id: '2',
    name: 'React Development',
    count: 982
  }, {
    id: '3',
    name: 'Data Science',
    count: 879
  }, {
    id: '4',
    name: 'Digital Marketing',
    count: 654
  }];
  return <aside className="hidden lg:block w-80 flex-shrink-0 h-screen sticky top-16 overflow-y-auto py-6 px-4 bg-white">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Suggested Connections
        </h3>
        <div className="space-y-4">
          {suggestedUsers.map(user => <motion.div key={user.id} whileHover={{
          backgroundColor: '#F3F4F6'
        }} className="flex items-center p-3 rounded-lg">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">
                  {user.name}
                </h4>
                <div className="flex flex-wrap mt-1">
                  {user.goals.map((goal, idx) => <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded mr-1 mb-1">
                      {goal}
                    </span>)}
                </div>
              </div>
              <motion.button whileTap={{
            scale: 0.95
          }} className="ml-auto flex-shrink-0 p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                <PlusIcon size={16} />
              </motion.button>
            </motion.div>)}
        </div>
      </div>
      <div>
        <div className="flex items-center mb-4">
          <TrendingUpIcon className="w-5 h-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Trending Goals
          </h3>
        </div>
        <div className="space-y-3">
          {trendingGoals.map(goal => <motion.div key={goal.id} whileHover={{
          backgroundColor: '#F3F4F6'
        }} className="flex items-center justify-between p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-800">
                {goal.name}
              </span>
              <span className="text-xs text-gray-500">
                {goal.count} learners
              </span>
            </motion.div>)}
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-3">
          Upcoming Events
        </h3>
        <motion.div whileHover={{
        backgroundColor: '#F3F4F6'
      }} className="p-3 rounded-lg bg-blue-50 border border-blue-100">
          <h4 className="text-sm font-medium text-blue-800">
            Web Design Workshop
          </h4>
          <p className="text-xs text-gray-600 mt-1">Tomorrow, 3:00 PM</p>
          <div className="flex items-center mt-2">
            <div className="flex -space-x-1 overflow-hidden">
              <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </div>
            <span className="text-xs text-gray-500 ml-2">+18 attending</span>
          </div>
        </motion.div>
      </div>
    </aside>;
};
export default RightSidebar;