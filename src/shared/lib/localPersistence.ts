import { appRoutes } from '@/shared/config/routes';
import type { ReflectionDraft } from '@/shared/types';

const REFLECTION_DRAFT_KEY = 'teacher-growth-reflection-draft';

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const isReflectionDraft = (value: unknown): value is ReflectionDraft => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const draft = value as Partial<ReflectionDraft>;

  return (
    typeof draft.focusAreaId === 'string' &&
    typeof draft.confidence === 'number' &&
    typeof draft.wentWell === 'string' &&
    typeof draft.improveNext === 'string' &&
    typeof draft.updatedAt === 'string' &&
    (draft.techniqueId === undefined || typeof draft.techniqueId === 'string')
  );
};

export const readReflectionDraft = (): ReflectionDraft | null => {
  if (!canUseStorage()) {
    return null;
  }

  const storedValue = window.localStorage.getItem(REFLECTION_DRAFT_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(storedValue) as unknown;
    return isReflectionDraft(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
};

export const writeReflectionDraft = (draft: ReflectionDraft) => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(REFLECTION_DRAFT_KEY, JSON.stringify(draft));
};

export const clearReflectionDraft = () => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(REFLECTION_DRAFT_KEY);
};

export const hasMeaningfulReflectionDraft = (draft: ReflectionDraft | null) =>
  Boolean(
    draft &&
      (draft.techniqueId ||
        draft.wentWell.trim() ||
        draft.improveNext.trim() ||
        draft.confidence !== 3),
  );

export const buildReflectionDraftPath = (draft: ReflectionDraft) => {
  const params = new URLSearchParams();
  params.set('focus', draft.focusAreaId);

  if (draft.techniqueId) {
    params.set('technique', draft.techniqueId);
  }

  return `${appRoutes.reflection}?${params.toString()}`;
};

export const formatSavedAt = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
