export interface Topic {
  topic: string;
  status: "Finished" | "NotFinished";
}
export interface LearningPlan {
  id?: number;
  userId: number;
  title: string;
  description: string;
  finishPercentage: number;
  categoryName: string;
  status: "NotStarted" | "InProgress" | "Completed";
  topics: Topic[];
  startDate: string;
  endDate: string;
}
export interface CreateLearningPlanDTO {
  userId: number;
  title: string;
  description: string;
  categoryName: string;
  topics: Topic[];
  startDate: string;
  endDate: string;
}