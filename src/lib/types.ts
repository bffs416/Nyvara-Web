
import { z } from "zod";
import { surveySchema, generalSurveySchema, briefFormSchema } from "./schema";

export type SurveyFormData = z.infer<typeof surveySchema>;
export type GeneralSurveyFormData = z.infer<typeof generalSurveySchema>;
export type BriefFormValues = z.infer<typeof briefFormSchema>;

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

export interface Client {
  nit: string;
  clientName: string;
  projects: Project[];
}
