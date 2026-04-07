import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useJourney } from '@/app/providers';
import { appRoutes } from '@/shared/config/routes';
import { getActiveGoal, getRecentEvidenceSignals } from '@/shared/lib/development';
import {
  clearReflectionDraft,
  formatSavedAt,
  hasMeaningfulReflectionDraft,
  readReflectionDraft,
  writeReflectionDraft,
} from '@/shared/lib/localPersistence';
import {
  Button,
  buttonClassName,
  EmptyState,
  ErrorState,
  Layout,
  LoadingState,
  RatingInput,
  ReflectionSupportScene,
  SectionHeader,
  TextArea,
} from '@/shared/ui';
import styles from './ReflectionPage.module.css';

export const ReflectionPage = () => {
  const {
    journey,
    isLoading,
    error,
    refreshJourney,
    saveReflection,
    activeAction,
    createInsightFromEvidence,
    promoteInsightToGoal,
  } = useJourney();
  const [searchParams, setSearchParams] = useSearchParams();
  const [confidence, setConfidence] = useState(3);
  const [wentWell, setWentWell] = useState('');
  const [improveNext, setImproveNext] = useState('');
  const [draftReady, setDraftReady] = useState(false);
  const [draftMessage, setDraftMessage] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const selectedFocusId = searchParams.get('focus') ?? journey?.currentFocusAreaId ?? '';
  const selectedTechniqueId = searchParams.get('technique') ?? '';
  const selectedFocus = journey
    ? journey.focusAreas.find((focusArea) => focusArea.id === selectedFocusId) ?? journey.focusAreas[0]
    : null;
  const matchingTechnique = selectedFocus?.techniques.find(
    (technique) => technique.id === selectedTechniqueId,
  );
  const filteredReflections =
    journey && selectedFocus
      ? journey.reflections.filter((reflection) => reflection.focusAreaId === selectedFocus.id)
      : [];
  const filteredEvidenceSignals =
    journey && selectedFocus ? getRecentEvidenceSignals(journey, selectedFocus.id) : [];
  const filteredInsights =
    journey && selectedFocus
      ? journey.insights.filter((insight) => insight.focusAreaId === selectedFocus.id)
      : [];
  const activeGoal = journey && selectedFocus ? getActiveGoal(journey, selectedFocus.id) : undefined;
  const latestEvidence = filteredEvidenceSignals[0];
  const latestReflection = filteredReflections[0];
  const latestInsight = filteredInsights[0];
  const latestReflectionTechnique = latestReflection?.techniqueId
    ? selectedFocus?.techniques.find((technique) => technique.id === latestReflection.techniqueId)
    : null;
  const evidencePrompt = latestEvidence
    ? `While writing, note whether this lesson changed "${latestEvidence.title.toLowerCase()}".`
    : `While writing, note which pupils were thinking more deeply and where the routine still felt inconsistent.`;
  const comparisonPrompt = latestReflection
    ? `Compare this note with your last reflection${latestReflectionTechnique ? ` on ${latestReflectionTechnique.title}` : ''}. What became more consistent, and what still needs tightening?`
    : 'Keep the note short. Capture one thing that worked and one thing you will adjust in the next lesson.';
  const nextMovePrompt = activeGoal
    ? `Name one next lesson adjustment that keeps the current goal moving: ${activeGoal.title}.`
    : matchingTechnique
      ? `Decide how you will repeat ${matchingTechnique.title.toLowerCase()} in the next lesson.`
      : 'Finish with one small classroom adjustment you will deliberately repeat next time.';
  const canSubmit = wentWell.trim().length > 0 && improveNext.trim().length > 0;

  useEffect(() => {
    if (!selectedFocus) {
      return;
    }

    const draft = readReflectionDraft();

    if (
      draft &&
      draftReady === false &&
      hasMeaningfulReflectionDraft(draft) &&
      draft.focusAreaId === selectedFocus.id &&
      (draft.techniqueId ?? '') === selectedTechniqueId
    ) {
      setConfidence(draft.confidence);
      setWentWell(draft.wentWell);
      setImproveNext(draft.improveNext);
      setDraftMessage(`Draft restored from ${formatSavedAt(draft.updatedAt)}.`);
    }

    setDraftReady(true);
  }, [draftReady, selectedFocus?.id, selectedTechniqueId]);

  useEffect(() => {
    if (!draftReady || !selectedFocus) {
      return;
    }

    const draft = {
      focusAreaId: selectedFocus.id,
      techniqueId: selectedTechniqueId || undefined,
      confidence,
      wentWell,
      improveNext,
      updatedAt: new Date().toISOString(),
    };
    const existingDraft = readReflectionDraft();

    if (!hasMeaningfulReflectionDraft(draft)) {
      clearReflectionDraft();
      setDraftMessage('');
      return;
    }

    if (
      existingDraft &&
      hasMeaningfulReflectionDraft(existingDraft) &&
      existingDraft.focusAreaId === draft.focusAreaId &&
      (existingDraft.techniqueId ?? '') === (draft.techniqueId ?? '') &&
      existingDraft.confidence === draft.confidence &&
      existingDraft.wentWell === draft.wentWell &&
      existingDraft.improveNext === draft.improveNext
    ) {
      return;
    }

    writeReflectionDraft(draft);
    setDraftMessage('Draft saved on this device.');
  }, [confidence, draftReady, improveNext, selectedFocus, selectedTechniqueId, wentWell]);

  if (error) {
    return (
      <Layout>
        <ErrorState message={error} onRetry={() => void refreshJourney()} />
      </Layout>
    );
  }

  if (isLoading || !journey || !selectedFocus) {
    return (
      <Layout>
        <LoadingState />
      </Layout>
    );
  }

  const handleFocusChange = (focusId: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('focus', focusId);
    nextParams.delete('technique');
    setConfidence(3);
    setWentWell('');
    setImproveNext('');
    setDraftMessage('');
    setDraftReady(false);
    setSavedMessage('');
    setSearchParams(nextParams);
  };

  const handleTechniqueChange = (techniqueId: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (techniqueId) {
      nextParams.set('technique', techniqueId);
    } else {
      nextParams.delete('technique');
    }

    setConfidence(3);
    setWentWell('');
    setImproveNext('');
    setDraftMessage('');
    setDraftReady(false);
    setSavedMessage('');
    setSearchParams(nextParams);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavedMessage('');

    await saveReflection({
      focusAreaId: selectedFocus.id,
      techniqueId: selectedTechniqueId || undefined,
      confidence,
      wentWell,
      improveNext,
    });

    setWentWell('');
    setImproveNext('');
    setConfidence(3);
    clearReflectionDraft();
    setDraftMessage('');
    setSavedMessage('Reflection saved. A follow-up insight has been added.');
  };

  return (
    <Layout>
      <SectionHeader
        title="Reflect on your practice"
        copy="Capture what happened and decide the next move."
      />

      <div className={styles.grid}>
        <section className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.workspaceHeader}>
              <div className={styles.workspaceHero}>
                <div className={styles.workspaceCopy}>
                  <span className={styles.workspaceLabel}>Reflection</span>
                  <h2 className={styles.workspaceTitle}>Capture the lesson while it is fresh</h2>
                  <p className={styles.panelCopy}>
                    Turn one classroom moment into a clear next step.
                  </p>
                  <div className={styles.workspaceMetaRow}>
                    <div className={styles.contextMeta}>
                      <span className={styles.contextLabel}>{selectedFocus.name}</span>
                      <span className={styles.contextHint}>
                        {matchingTechnique ? matchingTechnique.title : 'General focus reflection'}
                      </span>
                    </div>
                    <div className={styles.contextMeta}>
                      <span className={styles.contextLabel}>Latest evidence</span>
                      <span className={styles.contextHint}>
                        {latestEvidence
                          ? `${latestEvidence.sourceType === 'student-survey' ? 'Student survey' : 'Observation note'} ready to review`
                          : 'No evidence linked yet'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.workspaceVisual}>
                  <ReflectionSupportScene />
                </div>
              </div>

              <div className={styles.statusRow}>
                {draftMessage ? (
                  <p className={styles.draftStatus} aria-live="polite" role="status">
                    {draftMessage}
                  </p>
                ) : null}
                {savedMessage ? (
                  <p className={styles.success} aria-live="polite" role="status">
                    {savedMessage}
                  </p>
                ) : null}
              </div>
            </div>

            <section className={styles.beforeWritePanel} aria-label="Before you write">
              <div className={styles.beforeWriteIntro}>
                <span className={styles.eyebrow}>Before you write</span>
                <p className={styles.panelCopy}>
                  Keep one cue, one comparison point, and one goal in view.
                </p>
              </div>
              <div className={styles.beforeWriteGrid}>
                <div className={styles.beforeWriteItem}>
                  <span className={styles.contextLabel}>Evidence cue</span>
                  <p className={styles.contextHint}>
                    {latestEvidence ? latestEvidence.title : 'Use what you noticed from the lesson itself.'}
                  </p>
                </div>
                <div className={styles.beforeWriteItem}>
                  <span className={styles.contextLabel}>Comparison point</span>
                  <p className={styles.contextHint}>
                    {latestReflection ? comparisonPrompt : 'This is the first note in this cycle, so keep it short and specific.'}
                  </p>
                </div>
                <div className={styles.beforeWriteItem}>
                  <span className={styles.contextLabel}>Current goal</span>
                  <p className={styles.contextHint}>
                    {activeGoal ? activeGoal.title : 'Finish with one classroom adjustment worth repeating next lesson.'}
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.formSection} aria-labelledby="reflection-step-context">
              <div className={styles.formSectionHeader}>
                <span className={styles.stepBadge}>Step 1</span>
                <div>
                  <h2 className={styles.panelTitle} id="reflection-step-context">
                    Set the lesson context
                  </h2>
                  <p className={styles.panelCopy}>
                    Tie the note to one focus and one classroom move.
                  </p>
                </div>
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="focus-area-select">
                    Focus area
                  </label>
                  <div className={styles.selectWrap}>
                    <select
                      aria-describedby="focus-area-hint"
                      className={styles.select}
                      id="focus-area-select"
                      onChange={(event) => handleFocusChange(event.target.value)}
                      value={selectedFocus.id}
                    >
                      {journey.focusAreas.map((focusArea) => (
                        <option key={focusArea.id} value={focusArea.id}>
                          {focusArea.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className={styles.hint} id="focus-area-hint">
                    Choose the focus you are improving.
                  </span>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="technique-select">
                    Technique used
                  </label>
                  <div className={styles.selectWrap}>
                    <select
                      aria-describedby="technique-hint"
                      className={styles.select}
                      id="technique-select"
                      onChange={(event) => handleTechniqueChange(event.target.value)}
                      value={selectedTechniqueId}
                    >
                      <option value="">General focus reflection</option>
                      {selectedFocus.techniques.map((technique) => (
                        <option key={technique.id} value={technique.id}>
                          {technique.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className={styles.hint} id="technique-hint">
                    {matchingTechnique
                      ? `Reflecting on: ${matchingTechnique.title}`
                      : 'Choose a technique only if this note relates to one specific move.'}
                  </span>
                </div>
              </div>

              <RatingInput
                label="How confident do you feel using this technique?"
                onChange={setConfidence}
                value={confidence}
              />
            </section>

            <section className={styles.formSection} aria-labelledby="reflection-step-write">
              <div className={styles.formSectionHeader}>
                <span className={styles.stepBadge}>Step 2</span>
                <div>
                  <h2 className={styles.panelTitle} id="reflection-step-write">
                    Capture what happened in the lesson
                  </h2>
                  <p className={styles.panelCopy}>{evidencePrompt}</p>
                </div>
              </div>

              <TextArea
                aria-describedby="went-well-hint"
                id="went-well"
                label="What went well?"
                onChange={(event) => setWentWell(event.target.value)}
                placeholder="Describe what worked effectively in your lesson"
                required
                value={wentWell}
              />
              <span className={styles.fieldHint} id="went-well-hint">
                Name the strongest response or moment of consistency you noticed.
              </span>

              <TextArea
                aria-describedby="improve-next-hint"
                id="improve-next"
                label="What could be improved?"
                onChange={(event) => setImproveNext(event.target.value)}
                placeholder="Identify areas to refine next time"
                required
                value={improveNext}
              />
              <span className={styles.fieldHint} id="improve-next-hint">
                Name one adjustment to carry into the next lesson.
              </span>
            </section>

            <section className={styles.formSection} aria-labelledby="reflection-step-next">
              <div className={styles.formSectionHeader}>
                <span className={styles.stepBadge}>Step 3</span>
                <div>
                  <h2 className={styles.panelTitle} id="reflection-step-next">
                    Plan the next lesson
                  </h2>
                  <p className={styles.panelCopy}>
                    Saving this note adds it to your history and creates a follow-up insight.
                  </p>
                </div>
              </div>

              <div className={styles.handoffPanel}>
                <div className={styles.handoffBlock}>
                  <span className={styles.contextLabel}>Next lesson adjustment</span>
                  <p className={styles.contextHint}>{nextMovePrompt}</p>
                </div>
                <div className={styles.handoffBlock}>
                  <span className={styles.contextLabel}>What will happen when you save</span>
                  <p className={styles.contextHint}>
                    The note will be added to your history and a follow-up insight will be created.
                  </p>
                </div>
              </div>

              <div className={styles.actions}>
                <Button disabled={activeAction === 'saveReflection' || !canSubmit} type="submit">
                  {activeAction === 'saveReflection' ? 'Saving reflection...' : 'Save reflection'}
                </Button>
                <Link className={buttonClassName('secondary')} to={appRoutes.focusAreaById(selectedFocus.id)}>
                  Back to guidance
                </Link>
              </div>
            </section>
          </form>
        </section>

        <aside className={styles.historyPanel}>
          <div className={styles.history}>
            <div className={styles.historyHeader}>
              <div>
                <span className={styles.eyebrow}>Recent notes</span>
                <h2 className={styles.panelTitle}>{selectedFocus.name} history</h2>
              </div>
              <p className={styles.panelCopy}>
                Review recent reflections, evidence, and follow-up notes in one place.
              </p>
            </div>

            <div className={styles.flowCard}>
              <span className={styles.eyebrow}>Latest evidence</span>
              {latestEvidence ? (
                <article className={styles.evidenceCard}>
                  <div className={styles.evidenceTop}>
                    <div>
                      <h3 className={styles.insightTitle}>{latestEvidence.title}</h3>
                      <p className={styles.insightText}>{latestEvidence.summary}</p>
                    </div>
                    <span
                      className={`${styles.statusBadge} ${
                        latestEvidence.status === 'used' ? styles.statusSuccess : styles.statusPrimary
                      }`}
                    >
                      {latestEvidence.sourceType === 'student-survey' ? 'Student survey' : 'Observation note'}
                    </span>
                  </div>
                  {latestEvidence.status === 'new' ? (
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <Button
                        disabled={activeAction === 'createInsightFromEvidence'}
                        onClick={() => void createInsightFromEvidence(latestEvidence.id)}
                        variant="secondary"
                      >
                        Add as insight
                      </Button>
                    </div>
                  ) : null}
                </article>
              ) : (
                <p className={styles.panelCopy}>
                  No survey or observation notes are linked to this focus area yet.
                </p>
              )}
            </div>

            {activeGoal ? (
              <article className={styles.insightCard}>
                <div className={styles.insightTop}>
                  <div>
                    <h3 className={styles.insightTitle}>Current goal</h3>
                    <p className={styles.insightText}>{activeGoal.title}</p>
                  </div>
                  <span className={`${styles.statusBadge} ${styles.statusSuccess}`}>Active goal</span>
                </div>
                <p className={styles.insightText}>{activeGoal.description}</p>
              </article>
            ) : null}

            {latestInsight && latestInsight.status === 'new' ? (
              <article className={styles.insightCard}>
                <div className={styles.insightTop}>
                  <div>
                    <h3 className={styles.insightTitle}>Latest insight</h3>
                    <p className={styles.insightText}>{latestInsight.title}</p>
                  </div>
                  <span className={`${styles.statusBadge} ${styles.statusPrimary}`}>New insight</span>
                </div>
                <p className={styles.insightText}>{latestInsight.description}</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Button
                    disabled={activeAction === 'promoteInsightToGoal'}
                    onClick={() => void promoteInsightToGoal(latestInsight.id)}
                    variant="secondary"
                  >
                    Set as current goal
                  </Button>
                </div>
              </article>
            ) : null}

            {filteredReflections.length === 0 ? (
              <EmptyState
                title="No reflections for this focus yet"
                copy="Saved reflections will appear here."
              />
            ) : (
              filteredReflections.map((reflection) => (
                <article className={styles.timelineCard} key={reflection.id}>
                  <div className={styles.timelineMeta}>
                    <strong>{new Date(reflection.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}</strong>
                    <span className={`${styles.statusBadge} ${styles.statusSuccess}`}>
                      Confidence {reflection.confidence}/5
                    </span>
                  </div>
                  <p className={styles.timelineText}>{reflection.wentWell}</p>
                  <p className={styles.timelineText}>
                    <strong>Next time:</strong> {reflection.improveNext}
                  </p>
                </article>
              ))
            )}
          </div>
        </aside>
      </div>
    </Layout>
  );
};
