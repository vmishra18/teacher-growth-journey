import { Link } from 'react-router-dom';
import { useJourney } from '@/app/providers';
import { appRoutes } from '@/shared/config/routes';
import { getActiveGoal, getDevelopmentCycleStats } from '@/shared/lib/development';
import { getFocusAreaProgress } from '@/shared/lib/progress';
import { getRecommendedNextStep } from '@/shared/lib/recommendations';
import {
  buttonClassName,
  ErrorState,
  Layout,
  LoadingState,
  ProgressGuidanceScene,
  ProgressBar,
  SectionHeader,
} from '@/shared/ui';
import styles from './ProgressPage.module.css';

export const ProgressPage = () => {
  const { journey, isLoading, error, refreshJourney } = useJourney();

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
  const cycleStats = getDevelopmentCycleStats(journey, currentFocus.id);
  const activeGoal = getActiveGoal(journey, currentFocus.id);
  const nextStep = getRecommendedNextStep(journey);

  return (
    <Layout>
      <SectionHeader
        title="Your progress"
        copy="Review how your current focus is developing across the cycle, then decide what to practise next."
      />

      <section className={styles.signalBoard}>
        <div className={styles.signalBoardHeader}>
          <div>
            <span className={styles.eyebrow}>Signal board</span>
            <h3 className={styles.cardTitle}>What the latest cycle is showing</h3>
          </div>
          <strong className={styles.signalFocus}>{currentFocus.name}</strong>
        </div>
        <div className={styles.bannerStats}>
          <div className={styles.bannerStat}>
            <span className={styles.statLabel}>Reflections</span>
            <strong className={styles.statValue}>{cycleStats.reflections}</strong>
          </div>
          <div className={styles.bannerStat}>
            <span className={styles.statLabel}>Insights</span>
            <strong className={styles.statValue}>{cycleStats.insights}</strong>
          </div>
          <div className={styles.bannerStat}>
            <span className={styles.statLabel}>Goals</span>
            <strong className={styles.statValue}>{cycleStats.goals}</strong>
          </div>
        </div>
        <div className={styles.signalFeature}>
          <div className={styles.signalFeatureVisual}>
            <ProgressGuidanceScene />
          </div>

          <div className={styles.signalFeatureContent}>
            <span className={styles.signalFeatureEyebrow}>Progress guidance</span>
            <h3 className={styles.signalFeatureTitle}>See where progress turns into the next classroom move</h3>
            <p className={styles.signalFeatureText}>
              Review the signals from your current focus, keep your goal in view, and move into one practical next step without losing the thread of what is improving.
            </p>
            <div className={styles.signalFeatureMeta}>
              <div className={styles.signalFeaturePoint}>
                <span className={styles.signalFeaturePointLabel}>Current focus</span>
                <strong className={styles.signalFeaturePointValue}>{currentFocus.name}</strong>
              </div>
              <div className={styles.signalFeaturePoint}>
                <span className={styles.signalFeaturePointLabel}>Active goal</span>
                <strong className={styles.signalFeaturePointValue}>
                  {activeGoal ? activeGoal.title : 'Set the next practical goal'}
                </strong>
              </div>
            </div>
            <div className={styles.actions}>
              <Link className={buttonClassName('primary')} to={nextStep.path}>
                {nextStep.actionLabel}
              </Link>
              <Link className={buttonClassName('secondary')} to={appRoutes.passport}>
                Open CPD passport
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.summaryGrid}>
        <article className={`${styles.summaryCard} ${styles.heroCard}`}>
          <div className={styles.heroHeader}>
            <span className={styles.eyebrow}>Development cycle summary</span>
            <strong className={styles.heroMetric}>This cycle</strong>
          </div>
          <p className={styles.bodyText}>
            You’ve made steady progress in developing questioning through focused practice, reflection, and goal-setting.
          </p>
          <div className={styles.cycleGrid}>
            <div className={styles.cycleStat}>
              <span className={styles.statLabel}>Reflections</span>
              <strong className={styles.statValue}>{cycleStats.reflections}</strong>
            </div>
            <div className={styles.cycleStat}>
              <span className={styles.statLabel}>Insights</span>
              <strong className={styles.statValue}>{cycleStats.insights}</strong>
            </div>
            <div className={styles.cycleStat}>
              <span className={styles.statLabel}>Goals</span>
              <strong className={styles.statValue}>{cycleStats.goals}</strong>
            </div>
          </div>
        </article>

        <article className={`${styles.summaryCard} ${styles.actionCard}`}>
          <span className={styles.eyebrow}>Suggested next step</span>
          <h3 className={styles.cardTitle}>Keep the cycle moving</h3>
          <p className={styles.bodyText}>
            Continue practising your current focus, then use reflection or the CPD passport to review what is becoming more consistent over time.
          </p>
          <div className={styles.actions}>
            <Link className={buttonClassName('primary')} to={appRoutes.focusAreaById(currentFocus.id)}>
              Continue practice
            </Link>
            <Link className={buttonClassName('ghost')} to={appRoutes.passport}>
              Open CPD passport
            </Link>
          </div>
        </article>
      </section>

      <section className={`${styles.summaryCard} ${styles.cycleSection}`}>
        <div className={styles.cycleLead}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Current cycle</span>
            <h3 className={styles.cardTitle}>What is moving forward this week</h3>
          </div>
          <p className={styles.bodyText}>
            Your current focus is <strong>{currentFocus.name}</strong>. Use the progress view to see where practice is building, and use the passport to review the record behind that progress.
          </p>
        </div>
        <div className={styles.currentFocusStrip}>
          <span className={styles.currentFocusLabel}>Current focus</span>
          <strong className={styles.currentFocusValue}>{currentFocus.name}</strong>
          <span className={styles.currentFocusMeta}>{currentFocus.progressNotes}</span>
        </div>
      </section>

      <section className={styles.summaryCard}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Focus progress</span>
          <h3 className={styles.cardTitle}>Progress across teaching areas</h3>
        </div>
        <div className={styles.progressList}>
          {journey.focusAreas.map((focusArea) => {
            const progress = getFocusAreaProgress(focusArea, journey.reflections);
            return (
              <div className={styles.progressRow} key={focusArea.id}>
                <div className={styles.progressHeader}>
                  <div className={styles.progressCopy}>
                    <strong className={styles.progressTitle}>{focusArea.name}</strong>
                    <p className={styles.progressSummary}>{focusArea.strapline}</p>
                  </div>
                  <div className={styles.progressSide}>
                    <span className={styles.progressValue}>{progress.progress}%</span>
                    <Link className={styles.progressLink} to={appRoutes.focusAreaById(focusArea.id)}>
                      View details
                    </Link>
                  </div>
                </div>
                <ProgressBar
                  color="var(--success)"
                  label={`${focusArea.name} progress`}
                  labelHidden
                  showValue={false}
                  value={progress.progress}
                />
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};
