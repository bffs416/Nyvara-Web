
import { z } from "zod";
import { surveySchema, generalSurveySchema, briefFormSchema } from "./schema";

export type SurveyFormData = z.infer<typeof surveySchema>;
export type GeneralSurveyFormData = z.infer<typeof generalSurveySchema>;
export type BriefFormValues = z.infer<typeof briefFormSchema>;

export type ContentType =
  | 'reel'
  | 'historia'
  | 'carrusel'
  | 'video'
  | 'post'
  | 'pdf'
  | 'carnet'
  | 'otro';

export interface ProjectKpis {
  contentType: ContentType;
  platform?: string;
  periodMonth?: string; // YYYY-MM
  reach?: number;
  impressions?: number;
  interactions?: number;
  plays?: number;
  likes?: number;
  reposts?: number;
  profileVisits?: number;
  linkClicks?: number;
  shares?: number;
  comments?: number;
  saves?: number;
  newFollowers?: number;
  followerViewsPercent?: number;
  nonFollowerViewsPercent?: number;
  followerInteractionsPercent?: number;
  nonFollowerInteractionsPercent?: number;
  avgWatchTimeSec?: number;
  videoDurationSec?: number;
  skipRatePercent?: number;
  usualSkipRatePercent?: number;
  feedViewsPercent?: number;
  reelsTabViewsPercent?: number;
  profileViewsPercent?: number;
  storiesViewsPercent?: number;
  searchViewsPercent?: number;
  exploreViewsPercent?: number;
  womenAudiencePercent?: number;
  menAudiencePercent?: number;
  storyNavigation?: number;
  storyBacks?: number;
  storyForwards?: number;
  storyNextStory?: number;
  storyExits?: number;
  storyReplies?: number;
  strategicSummary?: string;
  notes?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  reason: string;
  imageUrl: string;
  dueDate: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'archived' | 'urgent';
  publishTime?: string;
  kpis?: ProjectKpis;
}

export interface Client {
  nit: string;
  clientName: string;
  projects: Project[];
}
