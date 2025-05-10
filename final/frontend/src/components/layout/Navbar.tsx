import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { BellIcon, SearchIcon, MessageCircleIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react';
import ChatList from '../chat/ChatList';
import ChatBox from '../chat/ChatBox';
import { userService } from '../../services/userService';
import { User } from '../../types/user';
interface NavbarProps {
  onCreatePost: () => void;
}
const Navbar: React.FC<NavbarProps> = ({
  onCreatePost
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([{
    id: 1,
    text: 'John liked your post',
    isRead: false
  }, {
    id: 2,
    text: 'Sarah commented on your goal',
    isRead: false
  }, {
    id: 3,
    text: 'New skill suggestion: React Native',
    isRead: true
  }]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const [chatUser, setChatUser] = useState<{
    id: string;
    name: string;
    avatar: string;
  } | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
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
  const unreadCount = notifications.filter(n => !n.isRead).length;
  return <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                SkillShare
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" type="text" placeholder="Search for skills, goals, or people..." />
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <motion.button whileTap={{
            scale: 0.95
          }} className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700" onClick={onCreatePost}>
              Share Goal
            </motion.button>
            <div className="relative">
              <motion.button whileTap={{
              scale: 0.95
            }} className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative" onClick={() => setShowNotifications(!showNotifications)}>
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
                    {unreadCount}
                  </span>}
              </motion.button>
              {showNotifications && <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium">Notifications</h3>
                  </div>
                  {notifications.map(notification => <div key={notification.id} className={`px-4 py-3 hover:bg-gray-100 ${!notification.isRead ? 'bg-blue-50' : ''}`}>
                      <p className="text-sm text-gray-700">
                        {notification.text}
                      </p>
                    </div>)}
                </motion.div>}
            </div>

            <Link to="/profile/me">
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                <img src={currentUser?.profilePictureBase64 ? `data:image/jpeg;base64,${currentUser.profilePictureBase64}` : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="Profile" className="h-full w-full object-cover" />
              </motion.div>
            </Link>
            <div className="relative">
              <motion.button whileTap={{
              scale: 0.95
            }} className="p-2 rounded-full text-gray-600 hover:bg-gray-100" onClick={() => setShowChatList(!showChatList)}>
                <MessageCircleIcon className="h-6 w-6" />
              </motion.button>
              <AnimatePresence>
                {showChatList && <ChatList onClose={() => setShowChatList(false)} onStartChat={user => {
                setChatUser(user);
                setShowChatList(false);
              }} />}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
              {isMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && <motion.div initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" type="text" placeholder="Search..." />
            </div>
            <button onClick={onCreatePost} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
              Share Goal
            </button>
            <Link to="/profile/me" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              Profile
            </Link>
            <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              Notifications {unreadCount > 0 && `(${unreadCount})`}
            </button>
            <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              Messages
            </button>
          </div>
        </motion.div>}
      <AnimatePresence>
        {chatUser && <ChatBox user={chatUser} onClose={() => setChatUser(null)} />}
      </AnimatePresence>
    </nav>;
};
export default Navbar;