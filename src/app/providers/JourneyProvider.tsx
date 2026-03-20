import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { mockApi } from '@/shared/api/mockApi';
import type { JourneyState, ReflectionInput } from '@/shared/types';

interface JourneyContextValue {
  journey: JourneyState | null;
  isLoading: boolean;
  error: string | null;
  activeAction: string | null;
  refreshJourney: () => Promise<void>;
  setCurrentFocus: (focusAreaId: string) => Promise<void>;
  toggleBookmark: (focusAreaId: string, techniqueId: string) => Promise<void>;
  markTechniqueTried: (focusAreaId: string, techniqueId: string) => Promise<void>;
  saveReflection: (input: ReflectionInput) => Promise<void>;
  createInsightFromEvidence: (evidenceId: string) => Promise<void>;
  promoteInsightToGoal: (insightId: string) => Promise<void>;
}

const JourneyContext = createContext<JourneyContextValue | undefined>(undefined);

const useAsyncAction = () => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const runAction = useCallback(async (actionName: string, action: () => Promise<JourneyState>) => {
    setActiveAction(actionName);

    try {
      return await action();
    } finally {
      if (isMountedRef.current) {
        setActiveAction(null);
      }
    }
  }, []);

  return { activeAction, runAction };
};

export const JourneyProvider = ({ children }: { children: ReactNode }) => {
  const [journey, setJourney] = useState<JourneyState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { activeAction, runAction } = useAsyncAction();

  const refreshJourney = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await mockApi.fetchJourney();
      startTransition(() => {
        setJourney(data);
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to load your journey.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshJourney();
  }, [refreshJourney]);

  const setCurrentFocus = useCallback(
    async (focusAreaId: string) => {
      const nextJourney = await runAction('setCurrentFocus', () =>
        mockApi.setCurrentFocus(focusAreaId),
      );
      setJourney(nextJourney);
    },
    [runAction],
  );

  const toggleBookmark = useCallback(
    async (focusAreaId: string, techniqueId: string) => {
      const nextJourney = await runAction('toggleBookmark', () =>
        mockApi.toggleTechniqueBookmark(focusAreaId, techniqueId),
      );
      setJourney(nextJourney);
    },
    [runAction],
  );

  const markTechniqueTried = useCallback(
    async (focusAreaId: string, techniqueId: string) => {
      const nextJourney = await runAction('markTechniqueTried', () =>
        mockApi.markTechniqueTried(focusAreaId, techniqueId),
      );
      setJourney(nextJourney);
    },
    [runAction],
  );

  const saveReflection = useCallback(
    async (input: ReflectionInput) => {
      const nextJourney = await runAction('saveReflection', () => mockApi.saveReflection(input));
      setJourney(nextJourney);
    },
    [runAction],
  );

  const createInsightFromEvidence = useCallback(
    async (evidenceId: string) => {
      const nextJourney = await runAction('createInsightFromEvidence', () =>
        mockApi.createInsightFromEvidence(evidenceId),
      );
      setJourney(nextJourney);
    },
    [runAction],
  );

  const promoteInsightToGoal = useCallback(
    async (insightId: string) => {
      const nextJourney = await runAction('promoteInsightToGoal', () =>
        mockApi.promoteInsightToGoal(insightId),
      );
      setJourney(nextJourney);
    },
    [runAction],
  );

  const value = useMemo(
    () => ({
      journey,
      isLoading,
      error,
      activeAction,
      refreshJourney,
      setCurrentFocus,
      toggleBookmark,
      markTechniqueTried,
      saveReflection,
      createInsightFromEvidence,
      promoteInsightToGoal,
    }),
    [
      activeAction,
      error,
      isLoading,
      journey,
      markTechniqueTried,
      createInsightFromEvidence,
      refreshJourney,
      saveReflection,
      setCurrentFocus,
      toggleBookmark,
      promoteInsightToGoal,
    ],
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
};

export const useJourney = () => {
  const context = useContext(JourneyContext);

  if (!context) {
    throw new Error('useJourney must be used inside JourneyProvider.');
  }

  return context;
};
