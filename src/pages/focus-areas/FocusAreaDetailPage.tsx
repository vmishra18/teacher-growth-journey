import { Link, useParams } from 'react-router-dom';
import { useJourney } from '@/app/providers';
import { TechniqueCard } from '@/features/focus-area-techniques';
import { appRoutes } from '@/shared/config/routes';
import { focusAreaAccent } from '@/shared/lib/colorTokens';
import { getFocusAreaProgress } from '@/shared/lib/progress';
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
          copy="Choose another teaching focus to see evidence summaries, techniques, and resources."
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
  const latestReflection = [...journey.reflections]
    .filter((reflection) => reflection.focusAreaId === focusArea.id)
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))[0];
  const latestReflectionDate = latestReflection
    ? new Date(latestReflection.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
    : null;

  return (
    <Layout>
      <SectionHeader title={focusArea.name} copy={focusArea.strapline} eyebrow="Focus detail" />

      <section className={styles.header}>
        <div className={`${styles.headerCard} ${styles.headerHero}`}>
          <div className={styles.titleRow}>
            <div className={styles.metaStack}>
              <Tag color={accentColor} label={isCurrentFocus ? 'Current focus' : 'Focus area'} />
              <span className={styles.heroKicker}>Current development thread</span>
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
            <span className={styles.sectionKicker}>Aligned to the Model for Great Teaching</span>
            <h3 className={styles.sectionTitle}>Evidence snapshot</h3>
          </div>
          <p className={styles.bodyText}>{focusArea.whyItMatters}</p>
          <p className={styles.bodyText}>{focusArea.evidenceSummary}</p>
          <div className={styles.detailList}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Element focus</span>
              <strong>{focusArea.name}</strong>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Strategies available</span>
              <strong>{focusArea.techniques.length}</strong>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Related resources</span>
              <strong>{focusArea.resources.length}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.techniques} aria-label="Practical techniques">
        <SectionHeader
          compact
          title="Techniques"
          copy="Practical classroom strategies to trial, notice, and refine as part of a development cycle."
        />

        {focusArea.techniques.map((technique, index) => (
          <TechniqueCard
            accentColor={accentColor}
            focusAreaId={focusArea.id}
            isBusy={activeAction === 'markTechniqueTried' || activeAction === 'toggleBookmark'}
            index={index}
            key={technique.id}
            onToggleBookmark={() => void toggleBookmark(focusArea.id, technique.id)}
            onTry={() => void markTechniqueTried(focusArea.id, technique.id)}
            technique={technique}
          />
        ))}
      </section>

      <section className={styles.summaryGrid}>
        <section className={styles.resourcesPanel}>
          <div className={styles.sectionIntro}>
            <span className={styles.sectionKicker}>Related resources</span>
            <h3 className={styles.sectionTitle}>Keep the evidence close to practice</h3>
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
