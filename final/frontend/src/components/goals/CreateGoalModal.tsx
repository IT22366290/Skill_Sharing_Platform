import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XIcon, PlusIcon } from 'lucide-react';
import { CreateLearningPlanDTO, Topic } from '../../types/learningPlan';
import { learningPlanService } from '../../services/learningPlanService';
interface CreateGoalModalProps {
  onClose: () => void;
  onCreate: (goal: any) => void;
}
const CreateGoalModal: React.FC<CreateGoalModalProps> = ({
  onClose,
  onCreate
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [newTopic, setNewTopic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const calculatePercentage = (topicsList: Topic[]) => {
    if (topicsList.length === 0) return 0;
    const finishedTopics = topicsList.filter(t => t.status === 'Finished').length;
    return Math.round(finishedTopics / topicsList.length * 100);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    try {
      const userId = Number(localStorage.getItem('userId'));
      const finishPercentage = calculatePercentage(topics);
      const planData: CreateLearningPlanDTO = {
        userId,
        title,
        description,
        categoryName: category,
        topics: topics.map(t => ({
          topic: t.topic,
          status: 'NotFinished'
        })),
        startDate,
        endDate: targetDate
      };
      const newPlan = await learningPlanService.createPlan(planData);
      onCreate(newPlan);
      onClose();
    } catch (error) {
      console.error('Error creating learning plan:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const addTopic = () => {
    if (newTopic.trim()) {
      setTopics([...topics, {
        topic: newTopic.trim(),
        status: 'NotFinished'
      }]);
      setNewTopic('');
    }
  };
  const removeTopic = (index: number) => {
    setTopics(topics.filter((_, i) => i !== index));
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div initial={{
      scale: 0.95
    }} animate={{
      scale: 1
    }} exit={{
      scale: 0.95
    }} className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Create New Goal
          </h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
            <XIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goal Title
              </label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Enter your goal title" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Describe your goal" rows={3} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" required>
                <option value="">Select a category</option>
                <option value="Programming">Programming</option>
                <option value="Language">Language</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Date
                </label>
                <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Topics
              </label>
              <div className="flex space-x-2">
                <input type="text" value={newTopic} onChange={e => setNewTopic(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Add a topic" onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTopic();
                }
              }} />
                <button type="button" onClick={addTopic} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <PlusIcon size={20} />
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {topics.map((topic, index) => <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-sm text-gray-700">{topic.topic}</span>
                    <button type="button" onClick={() => removeTopic(index)} className="text-red-500 hover:text-red-600">
                      <XIcon size={16} />
                    </button>
                  </div>)}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create Goal
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>;
};
export default CreateGoalModal;