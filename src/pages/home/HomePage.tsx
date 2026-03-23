import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useJourney } from '@/app/providers';
import { appRoutes } from '@/shared/config/routes';
import { getActiveGoal, getLatestInsight, getRecentEvidenceSignals } from '@/shared/lib/development';
import {
  buildReflectionDraftPath,
  formatSavedAt,
  hasMeaningfulReflectionDraft,
  readReflectionDraft,
} from '@/shared/lib/localPersistence';
import { getFocusAreaProgress, getRecentReflection } from '@/shared/lib/progress';
import { getSuggestedTechnique, getRecommendedNextStep } from '@/shared/lib/recommendations';
import type { ReflectionDraft } from '@/shared/types';
import {
  buttonClassName,
  Card,
  EmptyState,
  ErrorState,
  GoalRoadmapScene,
  Layout,
  LoadingState,
  ProgressBar,
  SectionHeader,
} from '@/shared/ui';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const { journey, isLoading, error, refreshJourney } = useJourney();
  const [savedDraft, setSavedDraft] = useState<ReflectionDraft | null>(null);

  useEffect(() => {
    const nextDraft = readReflectionDraft();
    setSavedDraft(hasMeaningfulReflectionDraft(nextDraft) ? nextDraft : null);
  }, [journey]);

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

  const currentFocus =
    journey.focusAreas.find((focusArea) => focusArea.id === journey.currentFocusAreaId) ??
    journey.focusAreas[0];
  const currentFocusProgress = getFocusAreaProgress(currentFocus, journey.reflections);
  const recentReflection = getRecentReflection(journey);
  const nextStep = getRecommendedNextStep(journey);
  const suggestedTechnique = getSuggestedTechnique(currentFocus);
  const activeGoal = getActiveGoal(journey, currentFocus.id);
  const latestInsight = getLatestInsight(journey, currentFocus.id);
  const recentEvidenceSignal = getRecentEvidenceSignals(journey, currentFocus.id)[0];
  const reflectionCount = journey.reflections.length;
  const triedTechniqueCount = journey.focusAreas.flatMap((focusArea) => focusArea.techniques).filter(
    (technique) => technique.tried,
  ).length;
  const insightCount = journey.insights.length;
  const currentFocusReflectionCount = journey.reflections.filter(
    (reflection) => reflection.focusAreaId === currentFocus.id,
  ).length;
  const currentFocusTriedCount = currentFocus.techniques.filter((technique) => technique.tried).length;
  const latestReflectionDate = recentReflection
    ? new Date(recentReflection.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
    : null;
  const activeGoalDate = activeGoal
    ? new Date(activeGoal.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
    : null;
  const recordSignalCount = reflectionCount + insightCount + triedTechniqueCount;
  const currentFocusReflectionPath = `${appRoutes.reflection}?focus=${currentFocus.id}`;
  const evidenceReflectionPath = recentEvidenceSignal
    ? `${appRoutes.reflection}?focus=${recentEvidenceSignal.focusAreaId}`
    : currentFocusReflectionPath;
  const draftFocus = savedDraft
    ? journey.focusAreas.find((focusArea) => focusArea.id === savedDraft.focusAreaId)
    : null;
  const draftPath = savedDraft ? buildReflectionDraftPath(savedDraft) : null;

  return (
    <Layout>
      <section className={styles.page}>
        <div className={styles.welcome}>
          <SectionHeader
            title="Welcome back, Vishal"
            copy="Continue your development cycle with one clear priority, a visible next step, and a short route back into reflection."
          />
        </div>

        <section className={styles.heroSection}>
          <div className={styles.heroArtwork} aria-hidden="true">
            <GoalRoadmapScene className={styles.heroArtworkScene} />
          </div>

          <div className={styles.heroCard}>
            <div className={styles.heroIntro}>
              <span className={styles.eyebrow}>Overview</span>
              <h2 className={styles.heroTitle}>
                Keep your current <span className={styles.heroAccent}>focus</span> moving
              </h2>
              <p className={styles.heroCopy}>
                Start from one practical classroom priority, keep the goal in view, and return to the next action without wading through the whole product.
              </p>
            </div>

            <div className={styles.heroPrimary}>
              <div className={styles.metaRow}>
                <span className={styles.metaPill}>Current focus</span>
                <span className={styles.metaPill}>{currentFocusProgress.progress}% progress</span>
                {activeGoalDate ? <span className={styles.metaPill}>Goal set {activeGoalDate}</span> : null}
              </div>

              <div className={styles.focusBlock}>
                <span className={styles.sectionLabel}>Focus area</span>
                <h3 className={styles.focusTitle}>{currentFocus.name}</h3>
                <p className={styles.bodyText}>{currentFocus.progressNotes}</p>
              </div>

              <div className={styles.heroActionPanel}>
                <div className={styles.heroActionIntro}>
                  <span className={styles.sectionLabel}>Recommended next step</span>
                  <strong className={styles.calloutTitle}>{nextStep.title}</strong>
                  <p className={styles.summaryText}>{nextStep.description}</p>
                </div>

                {activeGoal ? (
                  <div className={styles.supportingLine}>
                    <span className={styles.noteLabel}>Active goal</span>
                    <p className={styles.noteText}>{activeGoal.title}</p>
                  </div>
                ) : null}

                {latestInsight ? (
                  <div className={styles.supportingLine}>
                    <span className={styles.noteLabel}>Latest insight</span>
                    <p className={styles.noteText}>{latestInsight.title}</p>
                  </div>
                ) : null}

                {suggestedTechnique ? (
                  <div className={styles.supportingLine}>
                    <span className={styles.noteLabel}>Best technique to open</span>
                    <p className={styles.noteText}>{suggestedTechnique.title}</p>
                  </div>
                ) : null}
              </div>

              {savedDraft && draftFocus && draftPath ? (
                <div className={styles.resumeDraft}>
                  <div className={styles.resumeDraftCopy}>
                    <span className={styles.noteLabel}>Saved reflection draft</span>
                    <p className={styles.noteText}>
                      Resume your {draftFocus.name.toLowerCase()} note saved {formatSavedAt(savedDraft.updatedAt)} on this device.
                    </p>
                  </div>
                  <Link className={styles.resumeDraftLink} to={draftPath}>
                    Resume draft
                  </Link>
                </div>
              ) : null}

              <div className={styles.actions}>
                <Link className={buttonClassName('primary')} to={nextStep.path}>
                  {nextStep.actionLabel}
                </Link>
                <Link className={buttonClassName('secondary')} to={appRoutes.focusAreaById(currentFocus.id)}>
                  Explore current focus
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.progressSection} aria-label="Progress snapshot">
          <div className={styles.progressSectionInner}>
            <div className={`${styles.progressPanel} ${styles.progressPanelSurface}`}>
              <div className={styles.panelHeader}>
                <div>
                  <span className={styles.sectionLabel}>Progress snapshot</span>
                  <h3 className={styles.panelTitle}>What to keep in view this week</h3>
                </div>
                <strong className={styles.progressValue}>{currentFocusProgress.progress}%</strong>
              </div>

              <p className={styles.bodyText}>
                Keep building {currentFocus.name.toLowerCase()} through one next lesson move, one reflection, and one clear follow-up.
              </p>

              <ProgressBar
                label={`${currentFocus.name} progress`}
                value={currentFocusProgress.progress}
                color="var(--success)"
                showValue={false}
              />

              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Reflections</span>
                  <strong className={styles.statValue}>{currentFocusReflectionCount}</strong>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Techniques tried</span>
                  <strong className={styles.statValue}>{currentFocusTriedCount}</strong>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Resources</span>
                  <strong className={styles.statValue}>{currentFocus.resources.length}</strong>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Record signals</span>
                  <strong className={styles.statValue}>{recordSignalCount}</strong>
                </div>
              </div>

              <div className={styles.actions}>
                <Link className={buttonClassName('secondary')} to={appRoutes.progress}>
                  View progress
                </Link>
                <Link className={buttonClassName('ghost')} to={appRoutes.passport}>
                  Open CPD record
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.snapshotSection} aria-label="Overview details">
          <div className={styles.snapshotSectionHeader}>
            <span className={styles.snapshotSectionEyebrow}>Cycle touchpoints</span>
            <h2 className={styles.snapshotSectionTitle}>Keep the next three things visible</h2>
          </div>

          <div className={styles.snapshotGrid}>
            <Card className={styles.snapshotCard}>
              <div className={styles.cardHeader}>
                <span className={styles.eyebrow}>Recent reflection</span>
                <h2 className={styles.cardTitle}>What happened most recently in class</h2>
              </div>

              {recentReflection ? (
                <>
                  <div className={styles.metaRow}>
                    <span className={styles.metaPill}>{recentReflection.focusAreaName}</span>
                    {latestReflectionDate ? <span className={styles.metaPill}>Saved {latestReflectionDate}</span> : null}
                  </div>
                  <p className={styles.quote}>“{recentReflection.wentWell}”</p>
                  <p className={styles.bodyText}>
                    <strong>Next refinement:</strong> {recentReflection.improveNext}
                  </p>
                </>
              ) : (
                <EmptyState
                  title="No reflections yet"
                  copy="Your latest classroom reflection will appear here to guide the next cycle."
                />
              )}

              <div className={styles.actions}>
                <Link className={buttonClassName('secondary')} to={currentFocusReflectionPath}>
                  Write reflection
                </Link>
              </div>
            </Card>

            <Card className={styles.snapshotCard}>
              <div className={styles.cardHeader}>
                <span className={styles.eyebrow}>Evidence signal</span>
                <h2 className={styles.cardTitle}>One piece of evidence to keep visible</h2>
              </div>

              {recentEvidenceSignal ? (
                <>
                  <div className={styles.metaRow}>
                    <span className={styles.signalTag}>
                      {recentEvidenceSignal.sourceType === 'student-survey' ? 'Student survey' : 'Observation note'}
                    </span>
                    <span className={styles.metaPill}>{recentEvidenceSignal.focusAreaName}</span>
                  </div>
                  <strong className={styles.detailTitle}>{recentEvidenceSignal.title}</strong>
                  <p className={styles.bodyText}>{recentEvidenceSignal.summary}</p>
                </>
              ) : (
                <EmptyState
                  title="No evidence linked yet"
                  copy="Survey or observation signals will appear here when they are ready to shape the next reflection."
                />
              )}

              <div className={styles.actions}>
                <Link className={buttonClassName('secondary')} to={evidenceReflectionPath}>
                  Review in reflection
                </Link>
              </div>
            </Card>

            <Card className={styles.snapshotCard}>
              <div className={styles.cardHeader}>
                <span className={styles.eyebrow}>Suggested support</span>
                <h2 className={styles.cardTitle}>Keep guidance and record close by</h2>
              </div>

              {suggestedTechnique ? (
                <div className={styles.supportBlock}>
                  <span className={styles.sectionLabel}>Suggested technique</span>
                  <strong className={styles.detailTitle}>{suggestedTechnique.title}</strong>
                  <p className={styles.bodyText}>{suggestedTechnique.summary}</p>
                </div>
              ) : (
                <EmptyState title="No techniques yet" copy="Guidance will appear here when a focus area has practical strategies ready to review." />
              )}

              <div className={styles.recordBlock}>
                <span className={styles.sectionLabel}>Professional development record</span>
                <p className={styles.bodyText}>
                  {recordSignalCount} journey signals are already recorded across reflection, insight, and classroom practice.
                </p>
              </div>

              <div className={styles.actions}>
                <Link className={buttonClassName('secondary')} to={appRoutes.focusAreaById(currentFocus.id)}>
                  Open guidance
                </Link>
                <Link className={buttonClassName('ghost')} to={appRoutes.passport}>
                  Open CPD record
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </section>
    </Layout>
  );
};
