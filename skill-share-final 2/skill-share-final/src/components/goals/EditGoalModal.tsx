import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XIcon, PlusIcon, CheckIcon, TrashIcon } from 'lucide-react';
interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  targetDate: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  milestones: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}
interface EditGoalModalProps {
  goal: Goal;
  onClose: () => void;
  onUpdate: (goal: Goal) => void;
}
const EditGoalModal: React.FC<EditGoalModalProps> = ({
  goal,
  onClose,
  onUpdate
}) => {
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [category, setCategory] = useState(goal.category);
  const [startDate, setStartDate] = useState(goal.startDate);
  const [targetDate, setTargetDate] = useState(goal.targetDate);
  const [status, setStatus] = useState(goal.status);
  const [progress, setProgress] = useState(goal.progress);
  const [milestones, setMilestones] = useState(goal.milestones);
  const [newMilestone, setNewMilestone] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...goal,
      title,
      description,
      category,
      startDate,
      targetDate,
      status,
      progress,
      milestones
    });
  };
  const addMilestone = () => {
    if (newMilestone.trim()) {
      setMilestones([...milestones, {
        id: `m-${Date.now()}`,
        title: newMilestone.trim(),
        completed: false
      }]);
      setNewMilestone('');
    }
  };
  const toggleMilestone = (id: string) => {
    setMilestones(milestones.map(m => m.id === id ? {
      ...m,
      completed: !m.completed
    } : m));
  };
  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
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
          <h2 className="text-lg font-semibold text-gray-900">Edit Goal</h2>
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
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" rows={3} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" required>
                  <option value="programming">Programming</option>
                  <option value="language">Language</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select value={status} onChange={e => setStatus(e.target.value as Goal['status'])} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
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
                Progress
              </label>
              <input type="range" min="0" max="100" value={progress} onChange={e => setProgress(parseInt(e.target.value))} className="w-full" />
              <div className="text-sm text-gray-500 text-right">
                {progress}%
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Milestones
              </label>
              <div className="flex space-x-2">
                <input type="text" value={newMilestone} onChange={e => setNewMilestone(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Add a milestone" onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addMilestone();
                }
              }} />
                <button type="button" onClick={addMilestone} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <PlusIcon size={20} />
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {milestones.map(milestone => <div key={milestone.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <div className="flex items-center flex-1">
                      <button type="button" onClick={() => toggleMilestone(milestone.id)} className={`p-1 rounded-full mr-2 ${milestone.completed ? 'text-green-500' : 'text-gray-400'}`}>
                        <CheckIcon size={16} />
                      </button>
                      <span className={`text-sm ${milestone.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                        {milestone.title}
                      </span>
                    </div>
                    <button type="button" onClick={() => removeMilestone(milestone.id)} className="text-red-500 hover:text-red-600">
                      <TrashIcon size={16} />
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
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>;
};
export default EditGoalModal;