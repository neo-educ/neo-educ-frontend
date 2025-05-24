export interface Student {
  id: string;
  name: string;
  email: string;
  proficiencyLevel: string;
  interests: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ActivityHistory {
  date: Date;
  subject: string;
  unit: number;
  status: "COMPLETED" | "PENDING";
  grade: number;
}
