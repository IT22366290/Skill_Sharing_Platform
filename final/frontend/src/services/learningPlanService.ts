import api from './api';
import { LearningPlan, CreateLearningPlanDTO } from '../types/learningPlan';
export const learningPlanService = {
  getAllPlans: async (): Promise<LearningPlan[]> => {
    try {
      const response = await api.get<LearningPlan[]>('/learningPlans');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch learning plans:', error);
      throw error;
    }
  },
  getUserPlans: async (userId: number): Promise<LearningPlan[]> => {
    try {
      const response = await api.get<LearningPlan[]>(`/learningPlans/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user learning plans:', error);
      throw error;
    }
  },
  getPlanById: async (id: number): Promise<LearningPlan> => {
    try {
      const response = await api.get<LearningPlan>(`/learningPlans/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch learning plan:', error);
      throw error;
    }
  },
  createPlan: async (data: CreateLearningPlanDTO): Promise<LearningPlan> => {
    try {
      const finishedTopics = data.topics.filter(t => t.status === 'Finished').length;
      const finishPercentage = data.topics.length > 0 ? Math.round(finishedTopics / data.topics.length * 100) : 0;
      const planData = {
        ...data,
        finishPercentage,
        status: finishPercentage === 100 ? "Completed" : finishPercentage > 0 ? "InProgress" : "NotStarted"
      };
      const response = await api.post<LearningPlan>('/learningPlans', planData);
      return response.data;
    } catch (error) {
      console.error('Failed to create learning plan:', error);
      throw error;
    }
  },
  updatePlan: async (id: number, data: Partial<LearningPlan>): Promise<LearningPlan> => {
    try {
      const response = await api.put<LearningPlan>(`/learningPlans/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update learning plan:', error);
      throw error;
    }
  },
  deletePlan: async (id: number): Promise<void> => {
    try {
      await api.delete(`/learningPlans/${id}`);
    } catch (error) {
      console.error(`Failed to delete learning plan with ID ${id}:`, error);
      throw new Error('Failed to delete learning plan. Please try again later.');
    }
  }
};