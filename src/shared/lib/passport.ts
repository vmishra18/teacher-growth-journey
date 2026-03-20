import type { JourneyState } from '@/shared/types';

export interface PassportEntry {
  id: string;
  category: 'evidence' | 'technique' | 'reflection' | 'goal';
  title: string;
  detail: string;
  date: string;
  focusAreaName: string;
}

export const getPassportEntries = (state: JourneyState): PassportEntry[] => {
  const evidenceEntries: PassportEntry[] = state.evidenceSignals
    .filter((signal) => signal.status === 'used')
    .map((signal) => ({
      id: `passport-${signal.id}`,
      category: 'evidence',
      title:
        signal.sourceType === 'student-survey'
          ? 'Used pupil survey feedback to shape the next insight'
          : 'Used observation feedback to shape the next insight',
      detail: signal.title,
      date: signal.createdAt,
      focusAreaName: signal.focusAreaName,
    }));

  const techniqueEntries: PassportEntry[] = state.focusAreas.flatMap((focusArea) =>
    focusArea.techniques
      .filter((technique) => technique.tried && technique.lastTriedAt)
      .map((technique) => ({
        id: `passport-${focusArea.id}-${technique.id}`,
        category: 'technique' as const,
        title: `Tried ${technique.title.replace(/^Use\s+/i, '').toLowerCase()} in classroom practice`,
        detail: technique.summary,
        date: technique.lastTriedAt ?? new Date(0).toISOString(),
        focusAreaName: focusArea.name,
      })),
  );

  const reflectionEntries: PassportEntry[] = state.reflections.map((reflection) => ({
    id: `passport-${reflection.id}`,
    category: 'reflection',
    title: 'Logged a reflection on classroom practice',
    detail: reflection.wentWell,
    date: reflection.createdAt,
    focusAreaName: reflection.focusAreaName,
  }));

  const goalEntries: PassportEntry[] = state.goals.map((goal) => ({
    id: `passport-${goal.id}`,
    category: 'goal',
    title:
      goal.status === 'active'
        ? 'Set the current development goal'
        : 'Completed a previous development goal',
    detail: goal.title,
    date: goal.createdAt,
    focusAreaName: goal.focusAreaName,
  }));

  return [...evidenceEntries, ...techniqueEntries, ...reflectionEntries, ...goalEntries].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
};
