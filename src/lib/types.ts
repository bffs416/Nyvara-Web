
import { z } from "zod";
import { surveySchema, generalSurveySchema } from "./schema";

export type SurveyFormData = z.infer<typeof surveySchema>;
export type GeneralSurveyFormData = z.infer<typeof generalSurveySchema>;

export interface Project {
  id: string;
  title: string;
  description: string;
  reason: string;
  imageUrl: string;
  dueDate: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'archived' | 'urgent';
}
