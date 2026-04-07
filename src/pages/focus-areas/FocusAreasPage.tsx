import { Link } from 'react-router-dom';
import { useJourney } from '@/app/providers';
import { appRoutes } from '@/shared/config/routes';
import { getFocusAreaProgress } from '@/shared/lib/progress';
import {
  buttonClassName,
  Card,
  ErrorState,
  Layout,
  LoadingState,
  ProgressBar,
  SectionHeader,
  Tag,
} from '@/shared/ui';
import styles from './FocusAreasPage.module.css';

export const FocusAreasPage = () => {
  const { journey, isLoading, error, refreshJourney, setCurrentFocus, activeAction } = useJourney();

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
  const startedFocusCount = journey.focusAreas.filter((focusArea) =>
    focusArea.techniques.some((technique) => technique.tried),
  ).length;
  const totalResources = journey.focusAreas.reduce(
    (total, focusArea) => total + focusArea.resources.length,
    0,
  );
  const currentFocusProgress = getFocusAreaProgress(currentFocus, journey.reflections);
  const currentFocusReflectionCount = journey.reflections.filter(
    (reflection) => reflection.focusAreaId === currentFocus.id,
  ).length;

  return (
    <Layout>
      <SectionHeader
        title="Choose a focus area"
        copy="Choose one area of practice to strengthen next."
      />

      <section className={styles.overviewStrip} aria-label="Focus area overview">
        <div className={`${styles.overviewCard} ${styles.overviewLead}`}>
          <span className={styles.overviewLabel}>Current focus</span>
          <strong className={styles.overviewValue}>{currentFocus.name}</strong>
          <p className={styles.overviewCopy}>
            {currentFocus.progressNotes}
          </p>
          <div className={styles.overviewMetaRow}>
            <span className={styles.overviewMeta}>{currentFocusProgress.progress}% cycle progress</span>
            <span className={styles.overviewMeta}>
              {currentFocusReflectionCount} reflection{currentFocusReflectionCount === 1 ? '' : 's'}
            </span>
            <span className={styles.overviewMeta}>{currentFocus.resources.length} supporting resources</span>
          </div>
        </div>
        <div className={`${styles.overviewCard} ${styles.overviewMini}`}>
          <span className={styles.overviewLabel}>Focus areas started</span>
          <strong className={styles.overviewValue}>{startedFocusCount}</strong>
          <span className={styles.overviewHint}>Practice underway.</span>
        </div>
        <div className={`${styles.overviewCard} ${styles.overviewMini}`}>
          <span className={styles.overviewLabel}>Available resources</span>
          <strong className={styles.overviewValue}>{totalResources}</strong>
          <span className={styles.overviewHint}>Guides ready to use.</span>
        </div>
      </section>

      <section className={styles.grid} aria-label="Teaching focus areas">
        {journey.focusAreas.map((focusArea) => {
          const progress = getFocusAreaProgress(focusArea, journey.reflections);
          const isCurrentFocus = journey.currentFocusAreaId === focusArea.id;
          const reflectionCount = journey.reflections.filter(
            (reflection) => reflection.focusAreaId === focusArea.id,
          ).length;

          return (
            <Card
              className={`${styles.cardBody} ${isCurrentFocus ? styles.currentCard : ''}`}
              interactive
              key={focusArea.id}
              padding="md"
            >
              <div className={styles.cardHeading}>
                <div className={styles.row}>
                  <Tag label={isCurrentFocus ? 'Current focus' : 'Focus area'} />
                  <span className={styles.progressValue}>{progress.progress}%</span>
                </div>
                <span className={styles.code}>Focus area</span>
                <h2 className={styles.title}>{focusArea.name}</h2>
                <p className={styles.description}>{focusArea.description}</p>
              </div>

              <ProgressBar
                label={`${focusArea.name} progress`}
                value={progress.progress}
                color="var(--success)"
                showValue={false}
              />

              <div className={styles.cardFooter}>
                <div className={styles.metricBlock}>
                  <span className={styles.metricLabel}>Reflections</span>
                  <strong>
                    {reflectionCount === 0
                      ? 'No reflections yet'
                      : `${reflectionCount} reflection${reflectionCount > 1 ? 's' : ''} logged`}
                  </strong>
                </div>
                <div className={styles.metricBlock}>
                  <span className={styles.metricLabel}>Status</span>
                  <strong>{isCurrentFocus ? 'Active this week' : 'Available to start'}</strong>
                </div>
                <div className={styles.metricBlock}>
                  <span className={styles.metricLabel}>Resources</span>
                  <strong>{focusArea.resources.length} support items</strong>
                </div>
              </div>

              <div className={styles.actionRow}>
                <Link className={buttonClassName('primary')} to={appRoutes.focusAreaById(focusArea.id)}>
                  View
                </Link>
                {!isCurrentFocus ? (
                  <button
                    className={buttonClassName('secondary')}
                    disabled={activeAction === 'setCurrentFocus'}
                    onClick={() => void setCurrentFocus(focusArea.id)}
                    type="button"
                  >
                    Set as focus
                  </button>
                ) : null}
              </div>
            </Card>
          );
        })}
      </section>
    </Layout>
  );
};
