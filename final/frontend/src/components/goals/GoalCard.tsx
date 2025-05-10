import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, EditIcon, TrashIcon, MoreVerticalIcon } from 'lucide-react';
import { LearningPlan } from '../../types/learningPlan';
interface GoalCardProps {
  goal: LearningPlan;
  onEdit: () => void;
  onDelete: () => void;
}
const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onDelete
}) => {
  const [showTopics, setShowTopics] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const statusColors = {
    NotStarted: 'bg-gray-100 text-gray-800',
    InProgress: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800'
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return <motion.div layout className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {goal.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
          </div>
          <div className="relative">
            <motion.button whileTap={{
            scale: 0.95
          }} onClick={() => setShowActions(!showActions)} className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVerticalIcon size={20} className="text-gray-500" />
            </motion.button>
            {showActions && <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                <button onClick={() => {
              onEdit();
              setShowActions(false);
            }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                  <EditIcon size={16} className="mr-2" />
                  Edit Goal
                </button>
                <button onClick={() => {
              onDelete();
              setShowActions(false);
            }} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
                  <TrashIcon size={16} className="mr-2" />
                  Delete Goal
                </button>
              </div>}
          </div>
        </div>
        <div className="flex items-center mt-4 space-x-4">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[goal.status]}`}>
            {goal.status === 'NotStarted' ? 'Not Started' : goal.status}
          </span>
          <span className="text-sm text-gray-500">
            {goal.finishPercentage}% Complete
          </span>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div initial={{
            width: 0
          }} animate={{
            width: `${goal.finishPercentage}%`
          }} className="bg-blue-600 h-2 rounded-full" />
          </div>
        </div>
        <div className="flex items-center mt-4 text-sm text-gray-500">
          <CalendarIcon size={16} className="mr-1" />
          <span>
            {formatDate(goal.startDate)} - {formatDate(goal.endDate)}
          </span>
        </div>
        <button onClick={() => setShowTopics(!showTopics)} className="flex items-center mt-4 text-blue-600 text-sm font-medium">
          {showTopics ? <>
              <ChevronUpIcon size={20} className="mr-1" />
              Hide Topics
            </> : <>
              <ChevronDownIcon size={20} className="mr-1" />
              Show Topics (
              {goal.topics.filter(t => t.status === 'Finished').length}/
              {goal.topics.length})
            </>}
        </button>
      </div>
      {showTopics && <motion.div initial={{
      height: 0
    }} animate={{
      height: 'auto'
    }} exit={{
      height: 0
    }} className="border-t border-gray-100 bg-gray-50">
          <div className="p-4 space-y-2">
            {goal.topics.map((topic, index) => <div key={index} className="flex items-center text-sm">
                <CheckCircleIcon size={16} className={`mr-2 ${topic.status === 'Finished' ? 'text-green-500' : 'text-gray-300'}`} />
                <span className={topic.status === 'Finished' ? 'line-through text-gray-500' : 'text-gray-700'}>
                  {topic.topic}
                </span>
              </div>)}
          </div>
        </motion.div>}
    </motion.div>;
};
export default GoalCard;