import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TargetIcon, CalendarIcon, FilterIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
import CreateGoalModal from '../components/goals/CreateGoalModal';
import EditGoalModal from '../components/goals/EditGoalModal';
import GoalCard from '../components/goals/GoalCard';
import { LearningPlan } from '../types/learningPlan';
import { learningPlanService } from '../services/learningPlanService';
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
  const [selectedGoal, setSelectedGoal] = useState<LearningPlan | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [goals, setGoals] = useState<LearningPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchGoals();
  }, []);
  const fetchGoals = async () => {
    try {
      setIsLoading(true);
      const userId = Number(localStorage.getItem('userId'));
      if (!userId) {
        throw new Error('User not authenticated');
      }
      const fetchedGoals = await learningPlanService.getUserPlans(userId);
      setGoals(fetchedGoals);
      setError(null);
    } catch (err) {
      setError('Failed to fetch goals');
      console.error('Error fetching goals:', err);
    } finally {
      setIsLoading(false);
    }
  };
  const filters = [{
    id: 'all',
    label: 'All Goals'
  }, {
    id: 'InProgress',
    label: 'In Progress'
  }, {
    id: 'Completed',
    label: 'Completed'
  }, {
    id: 'NotStarted',
    label: 'Not Started'
  }];
  const handleCreateGoal = async (newGoal: LearningPlan) => {
    try {
      const createdGoal = await learningPlanService.createPlan(newGoal);
      setGoals(prevGoals => [...prevGoals, createdGoal]);
      setShowCreateModal(false);
    } catch (err) {
      console.error('Error creating goal:', err);
    }
  };
  const handleUpdateGoal = async (updatedGoal: LearningPlan) => {
    try {
      if (!updatedGoal.id) return;
      const updated = await learningPlanService.updatePlan(updatedGoal.id, updatedGoal);
      setGoals(goals.map(goal => goal.id === updated.id ? updated : goal));
      setShowEditModal(false);
      setSelectedGoal(null);
    } catch (err) {
      console.error('Error updating goal:', err);
    }
  };
  const handleDeleteGoal = async (goalId: number) => {
    try {
      if (!goalId) {
        throw new Error('Invalid goal ID');
      }
      await learningPlanService.deletePlan(goalId);
      setGoals(goals.filter(goal => goal.id !== goalId));
    } catch (error) {
      console.error('Error deleting goal:', error);
      setError('Failed to delete goal. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };
  const handleEditClick = (goal: LearningPlan) => {
    setSelectedGoal(goal);
    setShowEditModal(true);
  };
  const filteredGoals = goals.filter(goal => {
    if (activeFilter === 'all') return true;
    return goal.status === activeFilter;
  });
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
  }
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
        {filteredGoals.map(goal => <GoalCard key={goal.id} goal={goal} onEdit={() => handleEditClick(goal)} onDelete={() => goal.id && handleDeleteGoal(goal.id)} />)}
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