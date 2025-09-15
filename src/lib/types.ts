import { z } from "zod";
import { surveySchema } from "./schema";

export type SurveyFormData = z.infer<typeof surveySchema>;
