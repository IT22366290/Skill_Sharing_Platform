import React from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, EditIcon, XIcon, CheckCircleIcon, Circle } from 'lucide-react';
interface ChatListProps {
  onClose: () => void;
  onStartChat: (user: {
    id: string;
    name: string;
    avatar: string;
  }) => void;
}
const ChatList: React.FC<ChatListProps> = ({
  onClose,
  onStartChat
}) => {
  // Sample recent chats data
  const recentChats = [{
    id: 'user1',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Thanks for your help with React!',
    timestamp: '2m ago',
    unread: 2,
    online: true
  }, {
    id: 'user2',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Let me know when you want to practice Spanish',
    timestamp: '1h ago',
    unread: 0,
    online: true
  }, {
    id: 'user3',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'The design looks great!',
    timestamp: '3h ago',
    unread: 1,
    online: false
  }, {
    id: 'user4',
    name: 'Michael Brown',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'See you at the workshop tomorrow',
    timestamp: 'Yesterday',
    unread: 0,
    online: false
  }];
  return <motion.div initial={{
    opacity: 0,
    y: -10
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -10
  }} className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
      <div className="px-4 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">Messages</h3>
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <EditIcon size={16} className="text-gray-500" />
            </button>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <XIcon size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input type="text" placeholder="Search messages..." className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
      </div>
      <div className="overflow-y-auto max-h-[400px]">
        {recentChats.map(chat => <motion.button key={chat.id} whileHover={{
        backgroundColor: '#F3F4F6'
      }} onClick={() => onStartChat({
        id: chat.id,
        name: chat.name,
        avatar: chat.avatar
      })} className="w-full px-4 py-3 flex items-center space-x-3">
            <div className="relative">
              <img src={chat.avatar} alt={chat.name} className="h-12 w-12 rounded-full object-cover" />
              {chat.online && <div className="absolute bottom-0 right-0">
                  <CheckCircleIcon size={16} className="text-green-500 fill-white" />
                </div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  {chat.name}
                </span>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && <span className="ml-2 inline-flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                    {chat.unread}
                  </span>}
              </div>
            </div>
          </motion.button>)}
      </div>
      <div className="px-4 py-2 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
          See all messages
        </button>
      </div>
    </motion.div>;
};
export default ChatList;