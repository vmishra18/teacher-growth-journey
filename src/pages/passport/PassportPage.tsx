import { Link } from 'react-router-dom';
import { useJourney } from '@/app/providers';
import { appRoutes } from '@/shared/config/routes';
import { getActiveGoal } from '@/shared/lib/development';
import { getPassportEntries } from '@/shared/lib/passport';
import {
  buttonClassName,
  EmptyState,
  ErrorState,
  Layout,
  LoadingState,
  PassportRecordScene,
  SectionHeader,
  Tag,
} from '@/shared/ui';
import styles from './PassportPage.module.css';

const categoryLabel: Record<(ReturnType<typeof getPassportEntries>[number])['category'], string> = {
  evidence: 'Evidence reviewed',
  technique: 'Technique tried',
  reflection: 'Reflection logged',
  goal: 'Goal set',
};

export const PassportPage = () => {
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
  const activeGoal = getActiveGoal(journey, currentFocus.id);
  const passportEntries = getPassportEntries(journey);
  const latestEntry = passportEntries[0];
  const latestEntryDate = latestEntry
    ? new Date(latestEntry.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Not yet recorded';

  return (
    <Layout>
      <SectionHeader
        title="Professional development record"
        copy="A running record of the evidence, practice, reflection, and goal-setting that make up your development cycle."
      />

      <section className={styles.recordRibbon} aria-label="Professional record overview">
        <div className={`${styles.ribbonCard} ${styles.ribbonLead}`}>
          <span className={styles.statLabel}>Professional record</span>
          <strong className={styles.statValueSmall}>
            A concise archive of the evidence, reflection, and goals shaping your teaching development.
          </strong>
          <div className={styles.ribbonHighlights}>
            <span className={styles.ribbonHighlight}>
              Evidence-informed
            </span>
            <span className={styles.ribbonHighlight}>
              Reflection-led
            </span>
            <span className={styles.ribbonHighlight}>
              Goal-tracked
            </span>
          </div>
        </div>
        <div className={styles.ribbonStats}>
          <div className={`${styles.ribbonCard} ${styles.ribbonMini}`}>
            <span className={styles.statLabel}>Entries logged</span>
            <strong className={styles.statValue}>{passportEntries.length}</strong>
            <span className={styles.ribbonHint}>Captured across your current development cycle</span>
          </div>
          <div className={`${styles.ribbonCard} ${styles.ribbonMini}`}>
            <span className={styles.statLabel}>Latest activity</span>
            <strong className={styles.statValueSmall}>{latestEntryDate}</strong>
            <span className={styles.ribbonHint}>Most recent update recorded in your passport</span>
          </div>
          <div className={`${styles.ribbonCard} ${styles.ribbonMini}`}>
            <span className={styles.statLabel}>Current focus</span>
            <strong className={styles.statValueSmall}>{currentFocus.name}</strong>
            <span className={styles.ribbonHint}>The teaching area you are strengthening right now</span>
          </div>
        </div>
      </section>

      <section className={styles.topGrid}>
        <div className={`${styles.panel} ${styles.heroPanel}`}>
          <span className={styles.eyebrow}>Current record</span>
          <h2 className={styles.panelTitle}>This term&apos;s professional development activity</h2>
          <p className={styles.bodyText}>
            Keep a concise record of how evidence has informed your focus, how that focus has been tried in the classroom, and what you are refining next.
          </p>
          <div className={styles.archiveVisual} aria-hidden="true">
            <PassportRecordScene />
          </div>
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Record entries</span>
              <strong className={styles.statValue}>{passportEntries.length}</strong>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Last update</span>
              <strong className={styles.statValueSmall}>{latestEntryDate}</strong>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Current focus</span>
              <strong className={styles.statValueSmall}>{currentFocus.name}</strong>
            </div>
          </div>
        </div>

        <div className={`${styles.panel} ${styles.sidePanel}`}>
          <span className={styles.eyebrow}>Current focus</span>
          <h3 className={styles.sideTitle}>{currentFocus.name}</h3>
          <p className={styles.bodyText}>{currentFocus.progressNotes}</p>
          {activeGoal ? (
            <div className={styles.goalNote}>
              <span className={styles.goalLabel}>Active goal</span>
              <p className={styles.goalText}>{activeGoal.title}</p>
            </div>
          ) : null}
          <div className={styles.actions}>
            <Link className={buttonClassName('secondary')} to={appRoutes.reflection}>
              Add reflection
            </Link>
            <Link className={buttonClassName('ghost')} to={appRoutes.focusAreaById(currentFocus.id)}>
              Review focus
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.recordHeader}>
          <div>
            <span className={styles.eyebrow}>Record timeline</span>
            <h3 className={styles.panelTitle}>Development activity log</h3>
          </div>
          <p className={styles.bodyText}>
            Use this record to review how evidence and classroom practice are shaping your current development priority.
          </p>
        </div>

        {passportEntries.length === 0 ? (
          <EmptyState
            title="No professional development activity yet"
            copy="As you review evidence, try techniques, and write reflections, this record will build automatically."
          />
        ) : (
          <div className={styles.timeline}>
            {passportEntries.map((entry) => (
              <article className={styles.timelineItem} key={entry.id}>
                <div className={styles.timelineDate}>
                  {new Date(entry.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineTop}>
                    <div className={styles.timelineMetaGroup}>
                      <Tag label={categoryLabel[entry.category]} color="var(--accent-warm-strong)" />
                    </div>
                    <span className={styles.focusName}>{entry.focusAreaName}</span>
                  </div>
                  <h4 className={styles.entryTitle}>{entry.title}</h4>
                  <p className={styles.entryText}>{entry.detail}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};
