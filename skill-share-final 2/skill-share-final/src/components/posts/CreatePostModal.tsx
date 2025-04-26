import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ImageIcon, VideoIcon, SmileIcon, TagIcon, MapPinIcon } from 'lucide-react';
import { skillPostService } from '../../services/skillPostService';
interface CreatePostModalProps {
  onClose: () => void;
}
const CreatePostModal: React.FC<CreatePostModalProps> = ({
  onClose
}) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      setIsSubmitting(true);
      try {
        // Get userId from localStorage or your auth state management
        const userId = localStorage.getItem('userId') || '';
        if (selectedImage) {
          await skillPostService.createSkillPost({
            userId,
            description: content,
            image: selectedImage
          });
        }
        onClose();
      } catch (error) {
        console.error('Error creating post:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return <AnimatePresence>
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0.9,
        opacity: 0
      }} className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Share Your Progress
            </h2>
            <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
              <XIcon size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Your avatar" className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="What are you learning or achieving today?" className="w-full border-0 focus:ring-0 text-lg text-gray-700 placeholder-gray-500 resize-none h-28" autoFocus />
                  {imagePreview && <div className="relative mt-2">
                      <img src={imagePreview} alt="Preview" className="max-h-64 rounded-lg" />
                      <button type="button" onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                  }} className="absolute top-2 right-2 p-1 bg-gray-900 bg-opacity-50 rounded-full text-white hover:bg-opacity-70">
                        <XIcon size={16} />
                      </button>
                    </div>}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <motion.label htmlFor="image-upload" whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer">
                    <ImageIcon size={20} />
                  </motion.label>
                </div>
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} type="submit" disabled={!content.trim() || isSubmitting} className={`px-4 py-2 rounded-lg font-medium ${!content.trim() || isSubmitting ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  {isSubmitting ? <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </span> : 'Post'}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};
export default CreatePostModal;