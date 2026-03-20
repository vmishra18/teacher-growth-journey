import { initialJourneyState } from '@/shared/mocks/mockData';
import type { EvidenceSignal, JourneyState, Reflection, ReflectionInput } from '@/shared/types';

const STORAGE_KEY = 'teacher-growth-journey-state';
const LATENCY_MS = import.meta.env.MODE === 'test' ? 12 : 420;

const delay = (ms = LATENCY_MS) => new Promise((resolve) => window.setTimeout(resolve, ms));

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const cloneState = (state: JourneyState): JourneyState =>
  JSON.parse(JSON.stringify(state)) as JourneyState;

const normalizeState = (state: JourneyState): JourneyState => ({
  ...state,
  evidenceSignals: Array.isArray(state.evidenceSignals)
    ? state.evidenceSignals.map((signal) => ({
        ...signal,
        status: signal.status === 'used' ? 'used' : 'new',
      }))
    : cloneState(initialJourneyState).evidenceSignals,
  insights: Array.isArray(state.insights)
    ? state.insights.map((insight) => ({
        ...insight,
        sourceType: insight.sourceType === 'evidence' ? 'evidence' : 'reflection',
      }))
    : cloneState(initialJourneyState).insights,
  goals: Array.isArray(state.goals) ? state.goals : cloneState(initialJourneyState).goals,
  activeGoalId:
    'activeGoalId' in state && typeof state.activeGoalId === 'string'
      ? state.activeGoalId
      : cloneState(initialJourneyState).activeGoalId,
});

const readState = (): JourneyState => {
  if (!canUseStorage()) {
    return cloneState(initialJourneyState);
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    const seeded = cloneState(initialJourneyState);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  return normalizeState(JSON.parse(storedValue) as JourneyState);
};

const writeState = (state: JourneyState) => {
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
};

const updateState = (updater: (current: JourneyState) => JourneyState) => {
  const nextState = updater(readState());
  writeState(nextState);
  return cloneState(nextState);
};

const makeReflectionId = () => `reflection-${Math.random().toString(36).slice(2, 10)}`;
const makeInsightId = () => `insight-${Math.random().toString(36).slice(2, 10)}`;
const makeGoalId = () => `goal-${Math.random().toString(36).slice(2, 10)}`;

const buildInsightFromReflection = (
  reflection: Reflection,
  current: JourneyState,
) => {
  const focusArea = current.focusAreas.find((item) => item.id === reflection.focusAreaId);
  const technique = focusArea?.techniques.find((item) => item.id === reflection.techniqueId);
  const trimmedImproveNext = reflection.improveNext.trim();

  let title = `Refine ${reflection.focusAreaName.toLowerCase()} practice`;

  if (technique?.id === 'increase-wait-time') {
    title = 'Increase wait time more consistently';
  } else if (trimmedImproveNext.toLowerCase().includes('pause')) {
    title = 'Hold the pause across the whole lesson';
  } else if (technique) {
    title = `Refine ${technique.title.toLowerCase()}`;
  }

  return {
    id: makeInsightId(),
    focusAreaId: reflection.focusAreaId,
    focusAreaName: reflection.focusAreaName,
    reflectionId: reflection.id,
    sourceType: 'reflection' as const,
    title,
    description: trimmedImproveNext,
    createdAt: new Date().toISOString(),
    status: 'new' as const,
  };
};

const buildInsightFromEvidence = (evidence: EvidenceSignal) => ({
  id: makeInsightId(),
  focusAreaId: evidence.focusAreaId,
  focusAreaName: evidence.focusAreaName,
  evidenceId: evidence.id,
  sourceType: 'evidence' as const,
  title: evidence.insightTitle,
  description: evidence.insightDescription,
  createdAt: new Date().toISOString(),
  status: 'new' as const,
});

export const mockApi = {
  async fetchJourney() {
    await delay();
    return cloneState(readState());
  },

  async setCurrentFocus(focusAreaId: string) {
    await delay();
    return updateState((current) => ({
      ...current,
      currentFocusAreaId: focusAreaId,
    }));
  },

  async toggleTechniqueBookmark(focusAreaId: string, techniqueId: string) {
    await delay(220);
    return updateState((current) => ({
      ...current,
      focusAreas: current.focusAreas.map((focusArea) =>
        focusArea.id === focusAreaId
          ? {
              ...focusArea,
              techniques: focusArea.techniques.map((technique) =>
                technique.id === techniqueId
                  ? { ...technique, bookmarked: !technique.bookmarked }
                  : technique,
              ),
            }
          : focusArea,
      ),
    }));
  },

  async markTechniqueTried(focusAreaId: string, techniqueId: string) {
    await delay(220);
    return updateState((current) => ({
      ...current,
      currentFocusAreaId: focusAreaId,
      focusAreas: current.focusAreas.map((focusArea) =>
        focusArea.id === focusAreaId
          ? {
              ...focusArea,
              techniques: focusArea.techniques.map((technique) =>
                technique.id === techniqueId
                  ? {
                      ...technique,
                      tried: true,
                      lastTriedAt: new Date().toISOString(),
                    }
                  : technique,
              ),
            }
          : focusArea,
      ),
    }));
  },

  async saveReflection(input: ReflectionInput) {
    await delay(260);
    return updateState((current) => {
      const focusArea = current.focusAreas.find((item) => item.id === input.focusAreaId);

      if (!focusArea) {
        throw new Error('Focus area not found.');
      }

      const nextReflection = {
        id: makeReflectionId(),
        focusAreaId: focusArea.id,
        focusAreaName: focusArea.name,
        techniqueId: input.techniqueId,
        confidence: input.confidence,
        wentWell: input.wentWell.trim(),
        improveNext: input.improveNext.trim(),
        createdAt: new Date().toISOString(),
      };
      const nextInsight = buildInsightFromReflection(nextReflection, current);

      return {
        ...current,
        currentFocusAreaId: focusArea.id,
        reflections: [
          nextReflection,
          ...current.reflections,
        ],
        insights: [nextInsight, ...current.insights],
      };
    });
  },

  async createInsightFromEvidence(evidenceId: string) {
    await delay(220);
    return updateState((current) => {
      const evidence = current.evidenceSignals.find((item) => item.id === evidenceId);

      if (!evidence) {
        throw new Error('Evidence note not found.');
      }

      if (evidence.status === 'used') {
        return current;
      }

      const nextInsight = buildInsightFromEvidence(evidence);

      return {
        ...current,
        currentFocusAreaId: evidence.focusAreaId,
        evidenceSignals: current.evidenceSignals.map((item) =>
          item.id === evidence.id ? { ...item, status: 'used' } : item,
        ),
        insights: [nextInsight, ...current.insights],
      };
    });
  },

  async promoteInsightToGoal(insightId: string) {
    await delay(220);
    return updateState((current) => {
      const insight = current.insights.find((item) => item.id === insightId);

      if (!insight) {
        throw new Error('Insight not found.');
      }

      const nextGoal = {
        id: makeGoalId(),
        focusAreaId: insight.focusAreaId,
        focusAreaName: insight.focusAreaName,
        insightId: insight.id,
        title: insight.title,
        description: insight.description,
        createdAt: new Date().toISOString(),
        status: 'active' as const,
      };

      return {
        ...current,
        activeGoalId: nextGoal.id,
        focusAreas: current.focusAreas.map((focusArea) =>
          focusArea.id === insight.focusAreaId
            ? {
                ...focusArea,
                currentGoal: insight.description,
              }
            : focusArea,
        ),
        insights: current.insights.map((item) =>
          item.id === insight.id ? { ...item, status: 'goal' } : item,
        ),
        goals: [
          nextGoal,
          ...current.goals.map((goal) =>
            goal.status === 'active' ? { ...goal, status: 'completed' as const } : goal,
          ),
        ],
      };
    });
  },

  reset() {
    if (canUseStorage()) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  },
};
