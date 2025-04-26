import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, CompassIcon, TargetIcon, UsersIcon, BookmarkIcon, CalendarIcon } from 'lucide-react';
const LeftSidebar = () => {
  const location = useLocation();
  const navItems = [{
    name: 'Feed',
    icon: <HomeIcon size={20} />,
    path: '/'
  }, {
    name: 'Explore',
    icon: <CompassIcon size={20} />,
    path: '/explore'
  }, {
    name: 'Goals',
    icon: <TargetIcon size={20} />,
    path: '/goals'
  }, {
    name: 'Friends',
    icon: <UsersIcon size={20} />,
    path: '/friends'
  }, {
    name: 'Saved',
    icon: <BookmarkIcon size={20} />,
    path: '/saved'
  }, {
    name: 'Events',
    icon: <CalendarIcon size={20} />,
    path: '/events'
  }];
  return <aside className="hidden md:block w-64 flex-shrink-0 h-screen sticky top-16 overflow-y-auto py-6 px-3 bg-white">
      <nav className="space-y-1">
        {navItems.map(item => {
        const isActive = location.pathname === item.path;
        return <Link key={item.name} to={item.path}>
              <motion.div whileHover={{
            backgroundColor: '#F3F4F6'
          }} whileTap={{
            scale: 0.98
          }} className={`flex items-center px-4 py-3 rounded-lg cursor-pointer ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                <span className={isActive ? 'text-blue-600' : 'text-gray-500'}>
                  {item.icon}
                </span>
                <span className="ml-3 font-medium">{item.name}</span>
                {item.name === 'Friends' && <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    3
                  </span>}
              </motion.div>
            </Link>;
      })}
      </nav>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            My Learning Goals
          </h3>
          <Link to="/goals" className="text-xs text-blue-600 hover:text-blue-700">
            View All
          </Link>
        </div>
        <div className="mt-3 space-y-2">
          {['Learn React', 'Master UI/UX Design', 'Study Spanish'].map(goal => <motion.div key={goal} whileHover={{
          backgroundColor: '#F3F4F6'
        }} whileTap={{
          scale: 0.98
        }} className="flex items-center px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>{goal}</span>
              </motion.div>)}
          <Link to="/goals">
            <motion.button whileHover={{
            backgroundColor: '#F3F4F6'
          }} whileTap={{
            scale: 0.98
          }} className="flex items-center w-full px-4 py-2 text-sm text-blue-600 font-medium rounded-md hover:bg-gray-50">
              + Add New Goal
            </motion.button>
          </Link>
        </div>
      </div>
    </aside>;
};
export default LeftSidebar;