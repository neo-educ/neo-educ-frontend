export type ClassPlanStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface ClassPlan {
  id: number;
  topic: string;
  classDate: string;
  inputData: string;
  aiGeneratedContent: string;
  status: ClassPlanStatus;
}

export interface ClassPlanCreate {
  topic: string;
  classDate: Date;
  inputData: string;
  teacher_email: string;
}