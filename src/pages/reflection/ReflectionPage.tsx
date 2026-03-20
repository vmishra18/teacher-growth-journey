import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useJourney } from '@/app/providers';
import { appRoutes } from '@/shared/config/routes';
import { getActiveGoal, getRecentEvidenceSignals } from '@/shared/lib/development';
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
  const [savedMessage, setSavedMessage] = useState('');

  if (isLoading || !journey) {
    return (
      <Layout>
        <LoadingState />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorState message={error} onRetry={() => void refreshJourney()} />
      </Layout>
    );
  }

  const selectedFocusId = searchParams.get('focus') ?? journey.currentFocusAreaId;
  const selectedTechniqueId = searchParams.get('technique') ?? '';
  const selectedFocus =
    journey.focusAreas.find((focusArea) => focusArea.id === selectedFocusId) ?? journey.focusAreas[0];
  const matchingTechnique = selectedFocus.techniques.find(
    (technique) => technique.id === selectedTechniqueId,
  );
  const filteredReflections = journey.reflections.filter(
    (reflection) => reflection.focusAreaId === selectedFocus.id,
  );
  const filteredEvidenceSignals = getRecentEvidenceSignals(journey, selectedFocus.id);
  const filteredInsights = journey.insights.filter((insight) => insight.focusAreaId === selectedFocus.id);
  const activeGoal = getActiveGoal(journey, selectedFocus.id);
  const latestEvidence = filteredEvidenceSignals[0];

  const handleFocusChange = (focusId: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('focus', focusId);
    nextParams.delete('technique');
    setSearchParams(nextParams);
  };

  const handleTechniqueChange = (techniqueId: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (techniqueId) {
      nextParams.set('technique', techniqueId);
    } else {
      nextParams.delete('technique');
    }

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
    setSavedMessage('Your reflection has been saved. Keep building your practice.');
  };

  return (
    <Layout>
      <SectionHeader
        title="Reflect on your practice"
        copy="A short reflection helps you refine your development cycle, review impact, and decide the most useful next step."
      />

      <div className={styles.grid}>
        <section className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.workspaceHeader}>
              <div className={styles.workspaceHero}>
                <div className={styles.workspaceCopy}>
                  <span className={styles.workspaceLabel}>Reflection studio</span>
                  <h2 className={styles.workspaceTitle}>Capture the lesson while it is still fresh</h2>
                  <p className={styles.panelCopy}>
                    This is a quieter workspace for turning one classroom moment into a clearer next step.
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
            </div>

            <div className={styles.formIntro}>
              <div>
                <span className={styles.eyebrow}>Current reflection</span>
                <h2 className={styles.panelTitle}>{selectedFocus.name}</h2>
              </div>
              <div className={styles.contextMeta}>
                <span className={styles.contextLabel}>
                  {matchingTechnique ? matchingTechnique.title : 'General focus reflection'}
                </span>
                <span className={styles.contextHint}>
                  Short notes are enough to keep momentum and support deliberate practice.
                </span>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="focus-area-select">
                Focus area
              </label>
              <select
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

            <div className={styles.field}>
              <label className={styles.label} htmlFor="technique-select">
                Technique used
              </label>
              <select
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
              <span className={styles.hint}>
                {matchingTechnique
                  ? `Reflecting on: ${matchingTechnique.title}`
                  : 'Choose a specific technique if this reflection relates to one classroom move.'}
              </span>
            </div>

            <RatingInput
              label="How confident do you feel using this technique?"
              onChange={setConfidence}
              value={confidence}
            />

            <TextArea
              id="went-well"
              label="What went well?"
              onChange={(event) => setWentWell(event.target.value)}
              placeholder="Describe what worked effectively in your lesson"
              required
              value={wentWell}
            />

            <TextArea
              id="improve-next"
              label="What could be improved?"
              onChange={(event) => setImproveNext(event.target.value)}
              placeholder="Identify areas to refine next time"
              required
              value={improveNext}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              <Button disabled={activeAction === 'saveReflection'} type="submit">
                Save reflection
              </Button>
              <Link className={buttonClassName('secondary')} to={appRoutes.focusAreaById(selectedFocus.id)}>
                Back to guidance
              </Link>
            </div>

            {savedMessage ? (
              <p className={styles.success} aria-live="polite">
                {savedMessage}
              </p>
            ) : null}
          </form>
        </section>

        <aside className={styles.historyPanel}>
          <div className={styles.history}>
            <div className={styles.historyHeader}>
              <div>
                <span className={styles.eyebrow}>Development thread</span>
                <h2 className={styles.panelTitle}>{selectedFocus.name} reflection history</h2>
              </div>
              <p className={styles.panelCopy}>
                Review recent reflections to see what is becoming more consistent, where feedback is pointing, and what needs refining next.
              </p>
            </div>

            <div className={styles.flowCard}>
              <span className={styles.eyebrow}>Evidence input</span>
              {filteredEvidenceSignals.length === 0 ? (
                <p className={styles.panelCopy}>
                  No survey or observation notes are currently linked to this focus area.
                </p>
              ) : (
                <div className={styles.evidenceList}>
                  {filteredEvidenceSignals.map((signal) => (
                    <article className={styles.evidenceCard} key={signal.id}>
                      <div className={styles.evidenceTop}>
                        <div>
                          <h3 className={styles.insightTitle}>{signal.title}</h3>
                          <p className={styles.insightText}>{signal.summary}</p>
                        </div>
                        <span
                          className={`${styles.statusBadge} ${
                            signal.status === 'used' ? styles.statusSuccess : styles.statusPrimary
                          }`}
                        >
                          {signal.sourceType === 'student-survey' ? 'Student survey' : 'Observation note'}
                        </span>
                      </div>
                      {signal.status === 'new' ? (
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <Button
                            disabled={activeAction === 'createInsightFromEvidence'}
                            onClick={() => void createInsightFromEvidence(signal.id)}
                            variant="secondary"
                          >
                            Turn into insight
                          </Button>
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.flowCard}>
              <span className={styles.eyebrow}>Development cycle</span>
              <div className={styles.flowSteps}>
                <span className={styles.flowStepActive}>Reflection</span>
                <span className={styles.flowStep}>Insight</span>
                <span className={styles.flowStep}>Goal</span>
              </div>
            </div>

            <div className={styles.insightList}>
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

              {filteredInsights.length === 0 ? (
                <EmptyState
                  title="No insights yet"
                  copy="Saving a reflection will create a practical insight you can use to set a clear next goal."
                />
              ) : (
                filteredInsights.map((insight) => (
                  <article className={styles.insightCard} key={insight.id}>
                    <div className={styles.insightTop}>
                      <div>
                        <h3 className={styles.insightTitle}>{insight.title}</h3>
                        <p className={styles.insightText}>{insight.description}</p>
                      </div>
                      <span
                        className={`${styles.statusBadge} ${
                          insight.status === 'goal' ? styles.statusSuccess : styles.statusPrimary
                        }`}
                      >
                        {insight.status === 'goal' ? 'Current goal' : 'New insight'}
                      </span>
                    </div>
                    {insight.status === 'new' ? (
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <Button
                          disabled={activeAction === 'promoteInsightToGoal'}
                          onClick={() => void promoteInsightToGoal(insight.id)}
                          variant="secondary"
                        >
                          Turn into current goal
                        </Button>
                      </div>
                    ) : null}
                  </article>
                ))
              )}
            </div>

            {filteredReflections.length === 0 ? (
              <EmptyState
                title="No reflections for this focus yet"
                copy="Once a reflection is saved, it will appear here as part of the progress timeline."
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
