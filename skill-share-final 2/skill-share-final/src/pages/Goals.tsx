import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TargetIcon, CalendarIcon, FilterIcon, ChevronRightIcon, MoreVerticalIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
import CreateGoalModal from '../components/goals/CreateGoalModal';
import EditGoalModal from '../components/goals/EditGoalModal';
import GoalCard from '../components/goals/GoalCard';
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
const Goals = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [goals, setGoals] = useState<Goal[]>([{
    id: '1',
    title: 'Master React Development',
    description: 'Learn advanced React patterns and build complex applications',
    category: 'programming',
    startDate: '2023-10-01',
    targetDate: '2024-03-01',
    progress: 45,
    status: 'in-progress',
    milestones: [{
      id: 'm1',
      title: 'Learn React Hooks',
      completed: true
    }, {
      id: 'm2',
      title: 'Master Context API',
      completed: true
    }, {
      id: 'm3',
      title: 'Study Redux',
      completed: false
    }, {
      id: 'm4',
      title: 'Build Portfolio Project',
      completed: false
    }]
  }, {
    id: '2',
    title: 'Learn Spanish',
    description: 'Achieve B1 level in Spanish language',
    category: 'language',
    startDate: '2023-09-15',
    targetDate: '2024-06-30',
    progress: 25,
    status: 'in-progress',
    milestones: [{
      id: 'm1',
      title: 'Complete Basics',
      completed: true
    }, {
      id: 'm2',
      title: 'Master Present Tense',
      completed: false
    }, {
      id: 'm3',
      title: 'Learn Past Tense',
      completed: false
    }]
  }, {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn design principles and tools',
    category: 'design',
    startDate: '2023-11-01',
    targetDate: '2024-02-01',
    progress: 75,
    status: 'in-progress',
    milestones: [{
      id: 'm1',
      title: 'Color Theory',
      completed: true
    }, {
      id: 'm2',
      title: 'Typography',
      completed: true
    }, {
      id: 'm3',
      title: 'Layout Design',
      completed: true
    }, {
      id: 'm4',
      title: 'User Research',
      completed: false
    }]
  }]);
  const filters = [{
    id: 'all',
    label: 'All Goals'
  }, {
    id: 'in-progress',
    label: 'In Progress'
  }, {
    id: 'completed',
    label: 'Completed'
  }, {
    id: 'not-started',
    label: 'Not Started'
  }];
  const handleCreateGoal = (newGoal: Omit<Goal, 'id'>) => {
    const goal = {
      ...newGoal,
      id: `goal-${Date.now()}`
    };
    setGoals([...goals, goal]);
    setShowCreateModal(false);
  };
  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    setShowEditModal(false);
    setSelectedGoal(null);
  };
  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };
  const handleEditClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowEditModal(true);
  };
  const filteredGoals = goals.filter(goal => {
    if (activeFilter === 'all') return true;
    return goal.status === activeFilter;
  });
  return <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Goals</h1>
          <p className="text-gray-600 mt-1">
            Track and manage your learning journey
          </p>
        </div>
        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={() => setShowCreateModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
          <PlusIcon size={20} className="mr-2" />
          New Goal
        </motion.button>
      </div>
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center text-blue-600 mb-2">
            <TargetIcon size={20} className="mr-2" />
            <h3 className="font-semibold">Total Goals</h3>
          </div>
          <p className="text-2xl font-bold">{goals.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center text-green-600 mb-2">
            <CheckCircleIcon size={20} className="mr-2" />
            <h3 className="font-semibold">Completed</h3>
          </div>
          <p className="text-2xl font-bold">
            {goals.filter(goal => goal.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center text-orange-600 mb-2">
            <ClockIcon size={20} className="mr-2" />
            <h3 className="font-semibold">In Progress</h3>
          </div>
          <p className="text-2xl font-bold">
            {goals.filter(goal => goal.status === 'in-progress').length}
          </p>
        </div>
      </div>
      {/* Filters */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        {filters.map(filter => <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === filter.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
            {filter.label}
          </button>)}
        <button className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 ml-auto">
          <FilterIcon size={20} />
        </button>
      </div>
      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGoals.map(goal => <GoalCard key={goal.id} goal={goal} onEdit={() => handleEditClick(goal)} onDelete={() => handleDeleteGoal(goal.id)} />)}
      </div>
      {/* Create Goal Modal */}
      <AnimatePresence>
        {showCreateModal && <CreateGoalModal onClose={() => setShowCreateModal(false)} onCreate={handleCreateGoal} />}
      </AnimatePresence>
      {/* Edit Goal Modal */}
      <AnimatePresence>
        {showEditModal && selectedGoal && <EditGoalModal goal={selectedGoal} onClose={() => {
        setShowEditModal(false);
        setSelectedGoal(null);
      }} onUpdate={handleUpdateGoal} />}
      </AnimatePresence>
    </div>;
};
export default Goals;