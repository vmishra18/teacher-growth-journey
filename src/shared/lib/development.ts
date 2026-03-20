import type { EvidenceSignal, Goal, Insight, JourneyState } from '@/shared/types';

export const getLatestInsight = (state: JourneyState, focusAreaId?: string): Insight | undefined => {
  const insights = focusAreaId
    ? state.insights.filter((insight) => insight.focusAreaId === focusAreaId)
    : state.insights;

  return [...insights].sort((first, second) => second.createdAt.localeCompare(first.createdAt))[0];
};

export const getActiveGoal = (state: JourneyState, focusAreaId?: string): Goal | undefined => {
  const activeGoals = state.goals.filter((goal) => goal.status === 'active');
  const matchingGoals = focusAreaId
    ? activeGoals.filter((goal) => goal.focusAreaId === focusAreaId)
    : activeGoals;

  return [...matchingGoals].sort((first, second) => second.createdAt.localeCompare(first.createdAt))[0];
};

export const getDevelopmentCycleStats = (state: JourneyState, focusAreaId?: string) => ({
  reflections: focusAreaId
    ? state.reflections.filter((reflection) => reflection.focusAreaId === focusAreaId).length
    : state.reflections.length,
  insights: focusAreaId
    ? state.insights.filter((insight) => insight.focusAreaId === focusAreaId).length
    : state.insights.length,
  goals: focusAreaId
    ? state.goals.filter((goal) => goal.focusAreaId === focusAreaId).length
    : state.goals.length,
});

export const getRecentEvidenceSignals = (
  state: JourneyState,
  focusAreaId?: string,
): EvidenceSignal[] => {
  const evidenceSignals = focusAreaId
    ? state.evidenceSignals.filter((signal) => signal.focusAreaId === focusAreaId)
    : state.evidenceSignals;

  return [...evidenceSignals].sort((first, second) => second.createdAt.localeCompare(first.createdAt));
};
