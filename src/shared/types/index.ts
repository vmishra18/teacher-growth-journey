export type ResourceType = 'article' | 'video';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  duration: string;
  url: string;
}

export interface Technique {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  classroomExample: string;
  tried: boolean;
  bookmarked: boolean;
  lastTriedAt?: string;
}

export interface FocusArea {
  id: string;
  name: string;
  strapline: string;
  description: string;
  evidenceSummary: string;
  whyItMatters: string;
  currentGoal: string;
  progressNotes: string;
  baselineProgress: number;
  techniques: Technique[];
  resources: Resource[];
  colorToken: 'teal' | 'blue' | 'amber' | 'green';
}

export interface Reflection {
  id: string;
  focusAreaId: string;
  focusAreaName: string;
  techniqueId?: string;
  confidence: number;
  wentWell: string;
  improveNext: string;
  createdAt: string;
}

export type EvidenceSourceType = 'student-survey' | 'mentor-observation';

export interface EvidenceSignal {
  id: string;
  focusAreaId: string;
  focusAreaName: string;
  sourceType: EvidenceSourceType;
  title: string;
  summary: string;
  insightTitle: string;
  insightDescription: string;
  createdAt: string;
  status: 'new' | 'used';
}

export interface Insight {
  id: string;
  focusAreaId: string;
  focusAreaName: string;
  reflectionId?: string;
  evidenceId?: string;
  sourceType: 'reflection' | 'evidence';
  title: string;
  description: string;
  createdAt: string;
  status: 'new' | 'goal';
}

export interface Goal {
  id: string;
  focusAreaId: string;
  focusAreaName: string;
  insightId: string;
  title: string;
  description: string;
  createdAt: string;
  status: 'active' | 'completed';
}

export interface JourneyState {
  currentFocusAreaId: string;
  focusAreas: FocusArea[];
  reflections: Reflection[];
  evidenceSignals: EvidenceSignal[];
  insights: Insight[];
  goals: Goal[];
  activeGoalId?: string;
}

export interface ReflectionInput {
  focusAreaId: string;
  techniqueId?: string;
  confidence: number;
  wentWell: string;
  improveNext: string;
}

export interface FocusAreaProgress {
  focusAreaId: string;
  progress: number;
  reflectionCount: number;
  triedTechniqueCount: number;
  bookmarkedTechniqueCount: number;
  lastReflection?: Reflection;
  nextTechnique?: Technique;
}

export interface NextStepRecommendation {
  title: string;
  description: string;
  path: string;
  actionLabel: string;
}
