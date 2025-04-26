import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, MinimizeIcon, SmileIcon, SendIcon, ImageIcon, PaperclipIcon } from 'lucide-react';
interface ChatBoxProps {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  onClose: () => void;
}
const ChatBox: React.FC<ChatBoxProps> = ({
  user,
  onClose
}) => {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would typically send the message
      console.log('Sending message:', message);
      setMessage('');
    }
  };
  return <motion.div initial={{
    y: 500,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} exit={{
    y: 500,
    opacity: 0
  }} className="fixed bottom-0 right-4 w-80 bg-white rounded-t-xl shadow-lg overflow-hidden z-50">
      {/* Chat Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
          <span className="ml-2 font-medium text-sm">{user.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-gray-100 rounded-full">
            <MinimizeIcon size={16} />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <XIcon size={16} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {!isMinimized && <motion.div initial={{
        height: 0
      }} animate={{
        height: 'auto'
      }} exit={{
        height: 0
      }} transition={{
        duration: 0.2
      }}>
            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50">
              {/* Sample messages - you would map through actual messages here */}
              <div className="flex justify-start mb-4">
                <div className="bg-white rounded-lg px-4 py-2 max-w-[80%] shadow-sm">
                  <p className="text-sm">Hey, how's your learning going?</p>
                </div>
              </div>
              <div className="flex justify-end mb-4">
                <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-[80%] shadow-sm">
                  <p className="text-sm">
                    Great! Making progress with React. How about you?
                  </p>
                </div>
              </div>
            </div>
            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..." className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 pr-10" />
                  <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <SmileIcon size={18} />
                  </button>
                </div>
                <div className="flex items-center space-x-1">
                  <motion.button whileHover={{
                scale: 1.1
              }} whileTap={{
                scale: 0.9
              }} type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <ImageIcon size={18} />
                  </motion.button>
                  <motion.button whileHover={{
                scale: 1.1
              }} whileTap={{
                scale: 0.9
              }} type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <PaperclipIcon size={18} />
                  </motion.button>
                  <motion.button whileHover={{
                scale: 1.1
              }} whileTap={{
                scale: 0.9
              }} type="submit" className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                    <SendIcon size={18} />
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
};
export default ChatBox;