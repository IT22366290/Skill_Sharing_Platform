import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XIcon, ImageIcon } from 'lucide-react';
import { CreateEventDTO, EventType, EventCategory } from '../../types/event';
interface CreateEventModalProps {
  onClose: () => void;
  onCreate: (eventData: CreateEventDTO) => void;
}
const CreateEventModal: React.FC<CreateEventModalProps> = ({
  onClose,
  onCreate
}) => {
  const [formData, setFormData] = useState({
    eventTitle: '',
    description: '',
    eventType: 'ONLINE' as EventType,
    eventCategory: 'TECH_PROGRAMMING' as EventCategory,
    date: '',
    time: '',
    duration: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.eventTitle.trim()) return;
    setIsSubmitting(true);
    try {
      const userId = localStorage.getItem('userId') || '';
      const eventData: CreateEventDTO = {
        ...formData,
        userId,
        image: selectedImage || undefined
      };
      await onCreate(eventData);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{
      scale: 0.95
    }} animate={{
      scale: 1
    }} exit={{
      scale: 0.95
    }} className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Create New Event
          </h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
            <XIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input type="text" value={formData.eventTitle} onChange={e => setFormData({
              ...formData,
              eventTitle: e.target.value
            })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea value={formData.description} onChange={e => setFormData({
              ...formData,
              description: e.target.value
            })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" rows={3} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select value={formData.eventType} onChange={e => setFormData({
                ...formData,
                eventType: e.target.value as EventType
              })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" required>
                  <option value="ONLINE">Online</option>
                  <option value="IN_PERSON">In Person</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select value={formData.eventCategory} onChange={e => setFormData({
                ...formData,
                eventCategory: e.target.value as EventCategory
              })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" required>
                  <option value="TECH_PROGRAMMING">Tech & Programming</option>
                  <option value="DESIGN">Design</option>
                  <option value="LANGUAGE">Language</option>
                  <option value="MUSIC">Music</option>
                  <option value="BUSINESS">Business</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input type="date" value={formData.date} onChange={e => setFormData({
                ...formData,
                date: e.target.value
              })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input type="time" value={formData.time} onChange={e => setFormData({
                ...formData,
                time: e.target.value
              })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input type="text" value={formData.duration} onChange={e => setFormData({
                ...formData,
                duration: e.target.value
              })} placeholder="e.g. 2 hours" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Image
              </label>
              <div className="flex items-center space-x-2">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="event-image" />
                <label htmlFor="event-image" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer flex items-center">
                  <ImageIcon size={20} className="mr-2" />
                  Choose Image
                </label>
                {selectedImage && <span className="text-sm text-gray-600">
                    {selectedImage.name}
                  </span>}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {isSubmitting ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>;
};
export default CreateEventModal;