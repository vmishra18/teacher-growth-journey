import type { FocusArea, FocusAreaProgress, JourneyState, Reflection } from '@/shared/types';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const getFocusAreaProgress = (
  focusArea: FocusArea,
  reflections: Reflection[],
): FocusAreaProgress => {
  const focusReflections = reflections
    .filter((reflection) => reflection.focusAreaId === focusArea.id)
    .sort((first, second) => second.createdAt.localeCompare(first.createdAt));

  const triedTechniqueCount = focusArea.techniques.filter((technique) => technique.tried).length;
  const bookmarkedTechniqueCount = focusArea.techniques.filter(
    (technique) => technique.bookmarked,
  ).length;

  const techniqueScore =
    focusArea.techniques.length === 0 ? 0 : (triedTechniqueCount / focusArea.techniques.length) * 60;
  const reflectionScore = Math.min(focusReflections.length, 3) * 13;
  const confidenceScore =
    focusReflections.length === 0
      ? 0
      : (focusReflections[0].confidence / 5) * 10;
  const calculatedProgress = Math.round(
    clamp(techniqueScore + reflectionScore + confidenceScore, 0, 100),
  );

  return {
    focusAreaId: focusArea.id,
    progress: Math.max(focusArea.baselineProgress, calculatedProgress),
    reflectionCount: focusReflections.length,
    triedTechniqueCount,
    bookmarkedTechniqueCount,
    lastReflection: focusReflections[0],
    nextTechnique: focusArea.techniques.find((technique) => !technique.tried),
  };
};

export const getOverallProgress = (state: JourneyState) => {
  const totals = state.focusAreas.map((focusArea) =>
    getFocusAreaProgress(focusArea, state.reflections).progress,
  );

  return totals.length === 0
    ? 0
    : Math.round(totals.reduce((sum, value) => sum + value, 0) / totals.length);
};

export const getRecentReflection = (state: JourneyState) =>
  [...state.reflections].sort((first, second) => second.createdAt.localeCompare(first.createdAt))[0];
