import { appRoutes } from '@/shared/config/routes';
import type { FocusArea, JourneyState, NextStepRecommendation, Technique } from '@/shared/types';
import { getFocusAreaProgress, getRecentReflection } from './progress';

const buildTechniquePath = (focusAreaId: string, techniqueId?: string) => {
  const params = new URLSearchParams();

  params.set('focus', focusAreaId);

  if (techniqueId) {
    params.set('technique', techniqueId);
  }

  return `${appRoutes.reflection}?${params.toString()}`;
};

const getCurrentFocus = (state: JourneyState) =>
  state.focusAreas.find((focusArea) => focusArea.id === state.currentFocusAreaId) ?? state.focusAreas[0];

const latestTriedTechnique = (focusArea: FocusArea) =>
  [...focusArea.techniques]
    .filter((technique) => technique.tried && technique.lastTriedAt)
    .sort((first, second) => (second.lastTriedAt ?? '').localeCompare(first.lastTriedAt ?? ''))[0];

export const getRecommendedNextStep = (state: JourneyState): NextStepRecommendation => {
  const currentFocus = getCurrentFocus(state);
  const progress = getFocusAreaProgress(currentFocus, state.reflections);
  const recentReflection = getRecentReflection(state);
  const recentTriedTechnique = latestTriedTechnique(currentFocus);

  if (currentFocus.id === 'questioning') {
    return {
      title: 'Recommended next step',
      description:
        'Reflect on your recent lesson using the questioning technique you selected.',
      path: buildTechniquePath(currentFocus.id, recentTriedTechnique?.id),
      actionLabel: 'Write reflection',
    };
  }

  if (progress.triedTechniqueCount === 0 && progress.nextTechnique) {
    return {
      title: `Try ${progress.nextTechnique.title}`,
      description:
        'You have guidance ready. Logging one classroom attempt is the fastest way to move from reading to deliberate practice.',
      path: appRoutes.focusAreaById(currentFocus.id),
      actionLabel: 'Open technique',
    };
  }

  if (
    recentTriedTechnique &&
    (!recentReflection || recentReflection.focusAreaId !== currentFocus.id)
  ) {
    return {
      title: 'Capture a reflection while the lesson is fresh',
      description:
        'A short reflection will turn your recent classroom try into a clearer next step for the next lesson.',
      path: buildTechniquePath(currentFocus.id, recentTriedTechnique.id),
      actionLabel: 'Reflect now',
    };
  }

  if (progress.progress < 70 && progress.nextTechnique) {
    return {
      title: `Build consistency with ${progress.nextTechnique.title}`,
      description:
        'You have started this focus area. Adding one more technique will broaden your repertoire without increasing planning load too much.',
      path: appRoutes.focusAreaById(currentFocus.id),
      actionLabel: 'See techniques',
    };
  }

  return {
    title: `Review progress in ${currentFocus.name}`,
    description:
      'Your recent practice is building momentum. Check the timeline and decide which refinement to prioritise next.',
    path: appRoutes.progress,
    actionLabel: 'View progress',
  };
};

export const getSuggestedTechnique = (focusArea: FocusArea): Technique | undefined =>
  focusArea.techniques.find((technique) => technique.bookmarked && !technique.tried) ??
  focusArea.techniques.find((technique) => !technique.tried) ??
  focusArea.techniques[0];
