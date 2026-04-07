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
      title: 'Write a reflection',
      description:
        'Capture what happened in your most recent questioning lesson while it is still fresh.',
      path: buildTechniquePath(currentFocus.id, recentTriedTechnique?.id),
      actionLabel: 'Write reflection',
    };
  }

  if (progress.triedTechniqueCount === 0 && progress.nextTechnique) {
    return {
      title: `Try ${progress.nextTechnique.title}`,
      description:
        'You have the guidance ready. Try it in class next so you can see what works and what still needs adjusting.',
      path: appRoutes.focusAreaById(currentFocus.id),
      actionLabel: 'Open technique',
    };
  }

  if (
    recentTriedTechnique &&
    (!recentReflection || recentReflection.focusAreaId !== currentFocus.id)
  ) {
    return {
      title: 'Write a quick reflection',
      description:
        'A short note now will make it easier to decide what to repeat or change next lesson.',
      path: buildTechniquePath(currentFocus.id, recentTriedTechnique.id),
      actionLabel: 'Reflect now',
    };
  }

  if (progress.progress < 70 && progress.nextTechnique) {
    return {
      title: `Build consistency with ${progress.nextTechnique.title}`,
      description:
        'You have already started this focus area. Trying one more technique will help you see which approach fits best in class.',
      path: appRoutes.focusAreaById(currentFocus.id),
      actionLabel: 'See techniques',
    };
  }

  return {
    title: `Review your progress in ${currentFocus.name}`,
    description:
      'Look back over your recent notes and decide what to keep working on next.',
    path: appRoutes.progress,
    actionLabel: 'View progress',
  };
};

export const getSuggestedTechnique = (focusArea: FocusArea): Technique | undefined =>
  focusArea.techniques.find((technique) => technique.bookmarked && !technique.tried) ??
  focusArea.techniques.find((technique) => !technique.tried) ??
  focusArea.techniques[0];
