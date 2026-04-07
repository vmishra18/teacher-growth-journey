import { Link, useParams } from 'react-router-dom';
import { useJourney } from '@/app/providers';
import { TechniqueCard } from '@/features/focus-area-techniques';
import { appRoutes } from '@/shared/config/routes';
import { focusAreaAccent } from '@/shared/lib/colorTokens';
import { getActiveGoal, getRecentEvidenceSignals } from '@/shared/lib/development';
import { getFocusAreaProgress } from '@/shared/lib/progress';
import { getSuggestedTechnique } from '@/shared/lib/recommendations';
import {
  buttonClassName,
  EmptyState,
  ErrorState,
  Layout,
  LoadingState,
  ProgressBar,
  SectionHeader,
  Tag,
} from '@/shared/ui';
import styles from './FocusAreaDetailPage.module.css';

export const FocusAreaDetailPage = () => {
  const { focusAreaId } = useParams();
  const {
    journey,
    isLoading,
    error,
    refreshJourney,
    activeAction,
    markTechniqueTried,
    toggleBookmark,
    setCurrentFocus,
  } = useJourney();

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

  const focusArea = journey.focusAreas.find((item) => item.id === focusAreaId);

  if (!focusArea) {
    return (
      <Layout>
        <EmptyState
          title="Focus area not found"
          copy="Choose another teaching focus to continue."
          action={
            <Link className={buttonClassName('secondary')} to={appRoutes.focusAreas}>
              Back to focus areas
            </Link>
          }
        />
      </Layout>
    );
  }

  const progress = getFocusAreaProgress(focusArea, journey.reflections);
  const accentColor = focusAreaAccent(focusArea.colorToken);
  const isCurrentFocus = journey.currentFocusAreaId === focusArea.id;
  const reflectionCount = journey.reflections.filter(
    (reflection) => reflection.focusAreaId === focusArea.id,
  ).length;
  const triedCount = focusArea.techniques.filter((technique) => technique.tried).length;
  const activeGoal = getActiveGoal(journey, focusArea.id);
  const latestEvidence = getRecentEvidenceSignals(journey, focusArea.id)[0];
  const suggestedTechnique = getSuggestedTechnique(focusArea);
  const latestReflection = [...journey.reflections]
    .filter((reflection) => reflection.focusAreaId === focusArea.id)
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))[0];
  const latestReflectionDate = latestReflection
    ? new Date(latestReflection.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
    : null;
  const latestEvidenceDate = latestEvidence
    ? new Date(latestEvidence.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
    : null;
  const reflectionPath = suggestedTechnique
    ? `${appRoutes.reflection}?focus=${focusArea.id}&technique=${suggestedTechnique.id}`
    : `${appRoutes.reflection}?focus=${focusArea.id}`;
  const reflectionHandoff = latestEvidence
    ? `When you next reflect, note whether this move changes ${latestEvidence.title.toLowerCase()}.`
    : latestReflection
      ? `When you next reflect, compare it with your last note from ${latestReflectionDate}.`
      : 'When you next reflect, capture what pupils did, what you repeated, and what you want to tighten next.';
  const orderedTechniques = [...focusArea.techniques].sort((left, right) => {
    const score = (techniqueId: string, tried: boolean, bookmarked: boolean, lastTriedAt?: string) => {
      if (suggestedTechnique?.id === techniqueId) return 40;
      if (bookmarked && !tried) return 30;
      if (!tried) return 20;
      return lastTriedAt ? 10 + Date.parse(lastTriedAt) / 1_000_000_000_000 : 10;
    };

    return score(right.id, right.tried, right.bookmarked, right.lastTriedAt) -
      score(left.id, left.tried, left.bookmarked, left.lastTriedAt);
  });

  return (
    <Layout>
      <SectionHeader title={focusArea.name} copy={focusArea.strapline} eyebrow="Focus detail" />

      <section className={styles.header}>
        <div className={`${styles.headerCard} ${styles.headerHero}`}>
          <div className={styles.titleRow}>
            <div className={styles.metaStack}>
              <Tag color={accentColor} label={isCurrentFocus ? 'Current focus' : 'Focus area'} />
              <span className={styles.heroKicker}>Current focus</span>
            </div>
            <span className={styles.progressValue}>{progress.progress}% complete</span>
          </div>
          <h2 className={styles.title}>{focusArea.name}</h2>
          <p className={styles.description}>{focusArea.whyItMatters}</p>
          <div className={styles.journeyRail} aria-label="Development cycle">
            <span className={`${styles.journeyStep} ${styles.journeyStepActive}`}>Learn the strategy</span>
            <span className={styles.journeyStep}>Try in class</span>
            <span className={styles.journeyStep}>Reflect and refine</span>
          </div>
          <ProgressBar
            label={`${focusArea.name} progress`}
            value={progress.progress}
            color="var(--success)"
          />
          <div className={styles.metricsRow}>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>Reflections</span>
              <strong className={styles.metricNumber}>{reflectionCount}</strong>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>Strategies tried</span>
              <strong className={styles.metricNumber}>{triedCount}</strong>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>Last review</span>
              <strong className={styles.metricNumber}>{latestReflectionDate ?? 'Not yet'}</strong>
            </div>
          </div>
          {activeGoal ? <p className={styles.goal}>{activeGoal.description}</p> : null}
          <div className={styles.actions}>
            <button
              className={buttonClassName('primary')}
              disabled={activeAction === 'setCurrentFocus' || isCurrentFocus}
              onClick={() => void setCurrentFocus(focusArea.id)}
              type="button"
            >
              {isCurrentFocus ? 'Current focus selected' : 'Continue'}
            </button>
            <Link className={buttonClassName('secondary')} to={`${appRoutes.reflection}?focus=${focusArea.id}`}>
              Write reflection
            </Link>
          </div>
        </div>

        <div className={`${styles.headerCard} ${styles.evidenceCard}`}>
          <div className={styles.sectionIntro}>
            <span className={styles.sectionKicker}>Evidence and next move</span>
            <h3 className={styles.sectionTitle}>What to do next</h3>
          </div>
          <div className={styles.evidenceSummary}>
            <div className={styles.evidenceMeta}>
              <Tag
                color={accentColor}
                label={
                  latestEvidence
                    ? latestEvidence.sourceType === 'student-survey'
                      ? 'Student survey'
                      : 'Observation note'
                    : 'Research summary'
                }
              />
              <span className={styles.evidenceDate}>{latestEvidenceDate ?? 'Current cycle'}</span>
            </div>
            <strong className={styles.workflowTitle}>
              {latestEvidence ? latestEvidence.title : 'Keep this evidence idea visible'}
            </strong>
            <p className={styles.bodyText}>
              {latestEvidence ? latestEvidence.summary : focusArea.evidenceSummary}
            </p>
          </div>
          <div className={styles.workflowGrid}>
            <div className={styles.workflowBlock}>
              <span className={styles.detailLabel}>Suggested next move</span>
              <strong className={styles.workflowTitle}>
                {suggestedTechnique ? suggestedTechnique.title : 'Review the current strategy'}
              </strong>
              <p className={styles.bodyText}>
                {suggestedTechnique ? suggestedTechnique.summary : focusArea.currentGoal}
              </p>
            </div>
            <div className={styles.workflowBlock}>
              <span className={styles.detailLabel}>When you reflect next</span>
              <p className={styles.bodyText}>{reflectionHandoff}</p>
            </div>
            <div className={styles.workflowBlock}>
              <span className={styles.detailLabel}>Current goal</span>
              <strong className={styles.workflowTitle}>
                {activeGoal ? activeGoal.title : focusArea.currentGoal}
              </strong>
              <p className={styles.bodyText}>
                {latestReflectionDate
                  ? `Last reflection saved ${latestReflectionDate}. Use it to judge what is becoming more consistent.`
                  : 'One short note after the lesson is enough to keep this cycle moving.'}
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <Link className={buttonClassName('secondary')} to={reflectionPath}>
              Write reflection
            </Link>
            <Link className={buttonClassName('ghost')} to={appRoutes.focusAreas}>
              Back to all focus areas
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.techniques} aria-label="Practical techniques">
        <SectionHeader
          compact
          title="Techniques"
          copy="Practical classroom moves to try and refine."
        />

        {orderedTechniques.map((technique, index) => (
          <TechniqueCard
            accentColor={accentColor}
            evidenceCue={latestEvidence?.title}
            focusAreaId={focusArea.id}
            isBusy={activeAction === 'markTechniqueTried' || activeAction === 'toggleBookmark'}
            index={index}
            isRecommended={suggestedTechnique?.id === technique.id}
            key={technique.id}
            onToggleBookmark={() => void toggleBookmark(focusArea.id, technique.id)}
            onTry={() => void markTechniqueTried(focusArea.id, technique.id)}
            reflectionCue={reflectionHandoff}
            technique={technique}
          />
        ))}
      </section>

      <section className={styles.summaryGrid}>
        <section className={styles.resourcesPanel}>
          <div className={styles.sectionIntro}>
            <span className={styles.sectionKicker}>Related resources</span>
            <h3 className={styles.sectionTitle}>Supporting resources</h3>
          </div>
          <div className={styles.resources}>
            {focusArea.resources.map((resource) => (
              <a
                className={styles.resourceCard}
                href={resource.url}
                key={resource.id}
                rel="noreferrer"
                target="_blank"
              >
                <h4 className={styles.resourceTitle}>{resource.title}</h4>
                <p className={styles.resourceDescription}>{resource.description}</p>
                <div className={styles.resourceMeta}>
                  <span>{resource.type}</span>
                  <span>{resource.duration}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </section>
    </Layout>
  );
};
