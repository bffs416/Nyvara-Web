
import { z } from "zod";
import { surveySchema, generalSurveySchema } from "./schema";

export type SurveyFormData = z.infer<typeof surveySchema>;
export type GeneralSurveyFormData = z.infer<typeof generalSurveySchema>;
