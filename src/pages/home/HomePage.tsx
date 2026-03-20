import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJourney } from '@/app/providers';
import { appRoutes } from '@/shared/config/routes';
import { getActiveGoal, getLatestInsight, getRecentEvidenceSignals } from '@/shared/lib/development';
import { getRecentReflection } from '@/shared/lib/progress';
import { getSuggestedTechnique, getRecommendedNextStep } from '@/shared/lib/recommendations';
import {
  buttonClassName,
  Card,
  EmptyState,
  ErrorState,
  GoalRoadmapScene,
  GuidanceFlowScene,
  Layout,
  LoadingState,
  ProgressBar,
  ResearchLearningScene,
  SectionHeader,
} from '@/shared/ui';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const { journey, isLoading, error, refreshJourney } = useJourney();
  const [showcaseIndex, setShowcaseIndex] = useState(0);

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
  const recentReflection = getRecentReflection(journey);
  const nextStep = getRecommendedNextStep(journey);
  const suggestedTechnique = getSuggestedTechnique(currentFocus);
  const activeGoal = getActiveGoal(journey, currentFocus.id);
  const latestInsight = getLatestInsight(journey, currentFocus.id);
  const recentEvidenceSignals = getRecentEvidenceSignals(journey).slice(0, 1);
  const reflectionCount = journey.reflections.length;
  const triedTechniqueCount = journey.focusAreas.flatMap((focusArea) => focusArea.techniques).filter(
    (technique) => technique.tried,
  ).length;
  const insightCount = journey.insights.length;
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
  const showcaseItems = [
    {
      eyebrow: 'Current focus',
      title: currentFocus.name,
      copy: 'Keep the most important classroom improvement thread visible so your next step stays concrete.',
      meta: `${currentFocus.resources.length} supporting resources`,
    },
    {
      eyebrow: 'Active goal',
      title: activeGoal ? activeGoal.title : 'Set a practical next goal',
      copy: activeGoal
        ? 'Turn that priority into a visible classroom habit you can revisit, refine, and strengthen over time.'
        : 'Turn one recent insight into a clear, achievable next move for classroom practice.',
      meta: activeGoalDate ? `Set ${activeGoalDate}` : 'Ready from the latest insight',
    },
    {
      eyebrow: 'Evidence signal',
      title: recentEvidenceSignals[0] ? 'Student voice suggests more wait time' : 'No evidence linked yet',
      copy:
        recentEvidenceSignals[0]?.summary ??
        'When feedback or observation notes are linked, they appear here to guide your reflection.',
      meta:
        recentEvidenceSignals[0]?.sourceType === 'student-survey'
          ? 'Student survey'
          : recentEvidenceSignals[0]
            ? 'Mentor observation'
            : 'Awaiting evidence',
    },
    {
      eyebrow: 'Reflection loop',
      title: recentReflection ? 'Latest reflection captured' : 'Reflection still to write',
      copy: recentReflection
        ? recentReflection.improveNext
        : 'Use a short reflection to review what happened in the lesson and decide what to refine next.',
      meta: latestReflectionDate ? `Saved ${latestReflectionDate}` : 'No reflection yet',
    },
    {
      eyebrow: 'CPD passport',
      title: 'Professional development record',
      copy: 'Keep evidence, reflection, and goal-setting visible in one running record you can return to over time.',
      meta: `${reflectionCount + insightCount + triedTechniqueCount} journey signals recorded`,
    },
  ];
  const rotatedShowcaseItems = showcaseItems.map(
    (_, index) => showcaseItems[(index + showcaseIndex) % showcaseItems.length],
  );
  const visibleShowcaseItems = rotatedShowcaseItems.slice(0, 3);

  const handleShowcasePrevious = () => {
    setShowcaseIndex((currentIndex) =>
      currentIndex === 0 ? showcaseItems.length - 1 : currentIndex - 1,
    );
  };

  const handleShowcaseNext = () => {
    setShowcaseIndex((currentIndex) => (currentIndex + 1) % showcaseItems.length);
  };

  return (
    <Layout>
      <section className={styles.page}>
        <div className={styles.welcome}>
          <SectionHeader
            title="Welcome back, Vishal"
            copy="Continue your development cycle with focused, evidence-informed next steps for classroom practice."
          />
        </div>

        <section className={styles.storyBanner}>
          <div className={styles.storyBannerContent}>
            <div className={styles.storyBannerCopy}>
              <span className={styles.storyBannerEyebrow}>Research-led professional learning</span>
              <h2 className={styles.storyBannerTitle}>
                A clearer home for <span className={styles.storyBannerAccent}>evidence</span>,{' '}
                <span className={styles.storyBannerAccent}>reflection</span>, and{' '}
                <span className={styles.storyBannerAccent}>next teaching steps</span>
              </h2>
              <p className={styles.storyBannerText}>
                Bring together feedback, deliberate practice, and reflection in one structured workspace aligned to the Model for Great Teaching.
              </p>
              <div className={styles.storyHighlights}>
                <div className={styles.storyHighlight}>
                  <div>
                    <strong className={styles.storyHighlightTitle}>Research-led</strong>
                    <span className={styles.storyHighlightText}>Grounded in effective professional learning</span>
                  </div>
                </div>
                <div className={styles.storyHighlight}>
                  <div>
                    <strong className={styles.storyHighlightTitle}>Structured cycle</strong>
                    <span className={styles.storyHighlightText}>From evidence review to next lesson action</span>
                  </div>
                </div>
                <div className={styles.storyHighlight}>
                  <div>
                    <strong className={styles.storyHighlightTitle}>Model aligned</strong>
                    <span className={styles.storyHighlightText}>Built around the Great Teaching framework</span>
                  </div>
                </div>
              </div>
              <div className={styles.storyBannerActions}>
                <Link className={buttonClassName('primary')} to={appRoutes.focusAreaById(currentFocus.id)}>
                  Explore current focus
                </Link>
                <Link className={buttonClassName('secondary')} to={appRoutes.passport}>
                  Open CPD record
                </Link>
              </div>
              <div className={styles.bannerMetricRow}>
                <div className={styles.bannerMetricCard}>
                  <span className={styles.bannerMetricLabel}>Reflections</span>
                  <strong className={styles.bannerMetricValue}>{reflectionCount}</strong>
                </div>
                <div className={styles.bannerMetricCard}>
                  <span className={styles.bannerMetricLabel}>Strategies tried</span>
                  <strong className={styles.bannerMetricValue}>{triedTechniqueCount}</strong>
                </div>
                <div className={styles.bannerMetricCard}>
                  <span className={styles.bannerMetricLabel}>Insights</span>
                  <strong className={styles.bannerMetricValue}>{insightCount}</strong>
                </div>
              </div>
            </div>
            <div className={styles.storyBannerVisual}>
              <ResearchLearningScene />
            </div>
          </div>
        </section>

        <section className={styles.showcaseSection} aria-label="Professional learning highlights">
          <div className={styles.showcaseHeader}>
            <span className={styles.showcaseEyebrow}>Professional learning highlights</span>
            <h2 className={styles.showcaseTitle}>Keep the whole development cycle in view</h2>
            <p className={styles.showcaseCopy}>
              A clearer product view of the pieces that shape better teaching: focus, evidence, reflection, goals, and your professional record.
            </p>
          </div>

          <button
            aria-label="Show previous highlight"
            className={`${styles.showcaseControl} ${styles.showcaseControlLeft}`}
            onClick={handleShowcasePrevious}
            type="button"
          >
            ‹
          </button>

          <div className={styles.showcaseGrid}>
            {visibleShowcaseItems.map((item) => (
              <article className={styles.showcaseCard} key={`${item.eyebrow}-${item.title}`}>
                <span className={styles.showcaseCardEyebrow}>{item.eyebrow}</span>
                <h3 className={styles.showcaseCardTitle}>{item.title}</h3>
                <p className={styles.showcaseCardCopy}>{item.copy}</p>
                <span className={styles.showcaseCardMeta}>{item.meta}</span>
              </article>
            ))}
          </div>

          <button
            aria-label="Show next highlight"
            className={`${styles.showcaseControl} ${styles.showcaseControlRight}`}
            onClick={handleShowcaseNext}
            type="button"
          >
            ›
          </button>
        </section>

        <section className={styles.featureSection}>
          <div className={styles.featureVisual}>
            <GuidanceFlowScene />
          </div>

          <div className={styles.featureContent}>
            <span className={styles.featureEyebrow}>Coaching and guidance</span>
            <h2 className={styles.featureTitle}>Expert support, built into the development cycle</h2>
            <p className={styles.featureCopy}>
              Keep practical guidance close to the classroom. Evidence signals, suggested techniques, and reflection prompts stay connected so the next improvement step feels clear rather than overwhelming.
            </p>
            <div className={styles.featureList}>
              <div className={styles.featureListItem}>
                <div>
                  <strong className={styles.featureListTitle}>Evidence stays visible</strong>
                  <span className={styles.featureListText}>
                    Student voice and observation notes remain connected to the next lesson move.
                  </span>
                </div>
              </div>
              <div className={styles.featureListItem}>
                <div>
                  <strong className={styles.featureListTitle}>Techniques stay practical</strong>
                  <span className={styles.featureListText}>
                    Recommended strategies sit alongside reflection, not in a separate research silo.
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.featureActions}>
              <Link className={buttonClassName('primary')} to={appRoutes.reflection}>
                Write reflection
              </Link>
              <Link className={buttonClassName('secondary')} to={appRoutes.focusAreaById(currentFocus.id)}>
                Explore guidance
              </Link>
            </div>
          </div>
        </section>

        <div className={styles.pageFlow}>
          <section className={`${styles.sectionPanel} ${styles.heroSection}`}>
            <div className={styles.sectionHeaderBlock}>
              <span className={styles.sectionEyebrow}>Current goal</span>
              <h2 className={styles.sectionTitle}>Keep your development focus visible</h2>
              <p className={styles.sectionCopy}>
                Start from one concrete improvement priority, keep the evidence close, and move into the next lesson with a clear classroom action.
              </p>
            </div>

            <div className={`${styles.cardBody} ${styles.primaryPanel}`}>
              <div className={styles.heroLayout}>
                <div className={styles.heroContent}>
                  <div className={styles.inlineMeta}>
                    <span className={styles.metaLabel}>Current development focus</span>
                    {activeGoalDate ? <span className={styles.metaLabel}>Set {activeGoalDate}</span> : null}
                  </div>
                  <h2 className={styles.primaryTitle}>
                    {activeGoal ? activeGoal.title : 'Set a goal from a reflection insight'}
                  </h2>
                  <p className={styles.primaryText}>
                    {activeGoal
                      ? activeGoal.description
                      : 'Turn one practical insight from recent teaching into a clear, achievable next goal.'}
                  </p>
                  <div className={styles.cycleStrip} aria-label="Current development cycle">
                    <span className={`${styles.cycleStep} ${styles.cycleStepActive}`}>Feedback reviewed</span>
                    <span className={styles.cycleStep}>Resources explored</span>
                    <span className={styles.cycleStep}>Deliberate practice</span>
                    <span className={styles.cycleStep}>Reflection logged</span>
                  </div>
                  {latestInsight ? (
                    <div className={styles.noteBlock}>
                      <span className={styles.noteLabel}>Set from latest insight</span>
                      <p className={styles.noteText}>{latestInsight.title}</p>
                    </div>
                  ) : null}
                  <div className={styles.actions}>
                    <Link className={buttonClassName('primary')} to={appRoutes.reflection}>
                      Review insights
                    </Link>
                    <Link className={buttonClassName('ghost')} to={appRoutes.focusAreaById(currentFocus.id)}>
                      Open focus area
                    </Link>
                  </div>
                </div>

                <div className={styles.heroAside}>
                  <div className={styles.visualPanel}>
                    <GoalRoadmapScene />
                  </div>
                  <div className={styles.snapshotCard}>
                    <span className={styles.snapshotLabel}>Current element focus</span>
                    <strong className={styles.snapshotValue}>{currentFocus.name}</strong>
                    <p className={styles.snapshotText}>
                      Aligned to the element you are currently strengthening in classroom practice.
                    </p>
                  </div>
                  <div className={styles.snapshotCard}>
                    <span className={styles.snapshotLabel}>Latest practice note</span>
                    <strong className={styles.snapshotValue}>
                      {latestReflectionDate ? `Saved ${latestReflectionDate}` : 'No reflection yet'}
                    </strong>
                    <p className={styles.snapshotText}>
                      {recentReflection
                        ? 'Use the latest classroom note to sharpen the next classroom move.'
                        : 'Your next saved reflection will appear here as part of the cycle.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.sectionPanel}>
            <div className={styles.sectionHeaderBlock}>
              <span className={styles.sectionEyebrow}>This week&apos;s practice</span>
              <h2 className={styles.sectionTitle}>Move from intention into classroom action</h2>
              <p className={styles.sectionCopy}>
                Keep momentum with one visible next step, a simple progress view, and a clear sense of what to do in the next lesson.
              </p>
            </div>
            <div className={styles.summaryRow}>
              <Card className={`${styles.cardBody} ${styles.supportingCard} ${styles.metricsCard}`}>
                <div className={styles.panelHeader}>
                  <h2 className={styles.cardTitle}>Your progress this week</h2>
                <span className={styles.metric}>60%</span>
              </div>
              <p className={styles.cardText}>
                You’ve completed 2 reflections and tried 1 new technique.
              </p>
              <ProgressBar label="Weekly goal" value={60} color="var(--success)" showValue={false} />
              <div className={styles.progressMetaRow}>
                <span className={styles.progressMetaLabel}>
                  2 reflections and 1 technique trial recorded this week
                </span>
              </div>
              <div className={styles.inlineStats}>
                <span className={styles.inlineStat}><strong>2</strong> reflections</span>
                <span className={styles.inlineStat}><strong>1</strong> technique tried</span>
                <span className={styles.inlineStat}><strong>1</strong> insight used</span>
              </div>
            </Card>

            <Card className={`${styles.cardBody} ${styles.supportingCard} ${styles.practiceCard}`}>
                  <h2 className={styles.cardTitle}>Today&apos;s practice</h2>
                  <div className={styles.practiceStack}>
                    <div className={styles.practiceBlock}>
                      <span className={styles.metaLabel}>Recommended next step</span>
                      <p className={styles.cardText}>{nextStep.description}</p>
                    </div>
                    <div className={styles.practiceBlock}>
                      <span className={styles.metaLabel}>Next lesson priority</span>
                      <p className={styles.focusTitle}>{activeGoal ? activeGoal.title : currentFocus.currentGoal}</p>
                      <p className={styles.cardText}>
                        Use one practical move in the next lesson, then capture what happened while it is still fresh.
                      </p>
                    </div>
                  </div>
              <div className={styles.actions}>
                <Link className={buttonClassName('primary')} to={nextStep.path}>
                  Write reflection
                </Link>
                <Link className={buttonClassName('secondary')} to={appRoutes.focusAreaById(currentFocus.id)}>
                  Continue
                </Link>
              </div>
            </Card>
            </div>
          </section>

          <section className={`${styles.sectionPanel} ${styles.detailSection}`}>
            <div className={styles.sectionHeaderBlock}>
              <span className={styles.sectionEyebrow}>Reflection and support</span>
              <h2 className={styles.sectionTitle}>Review what happened and decide what to do next</h2>
              <p className={styles.sectionCopy}>
                Capture what you noticed in the classroom, then use related techniques and feedback signals to shape the next cycle.
              </p>
            </div>
            <div className={styles.detailRow}>
            <Card className={`${styles.cardBody} ${styles.supportingCard}`}>
              <div className={styles.panelHeader}>
                <h2 className={styles.cardTitle}>Your latest reflection</h2>
                {latestReflectionDate ? <span className={styles.metaLabel}>Saved {latestReflectionDate}</span> : null}
              </div>
              {recentReflection ? (
                <>
                  <p className={styles.quote}>“{recentReflection.wentWell}”</p>
                  <p className={styles.cardText}>
                    <strong>Next refinement:</strong> {recentReflection.improveNext}
                  </p>
                </>
              ) : (
                <EmptyState
                  title="No reflections yet"
                  copy="No reflections yet"
                  action={
                    <Link className={buttonClassName('secondary')} to={appRoutes.reflection}>
                      Add reflection
                    </Link>
                  }
                />
              )}
            </Card>

            <Card className={`${styles.cardBody} ${styles.supportingCard} ${styles.infoCard}`}>
              <div className={styles.supportBlock}>
                <h2 className={styles.cardTitle}>Suggested technique</h2>
                {suggestedTechnique ? (
                  <>
                    <p className={styles.cardText}>
                      {suggestedTechnique.summary}
                    </p>
                    <div className={styles.actions}>
                        <Link
                          className={buttonClassName('secondary')}
                          to={`${appRoutes.focusAreaById(currentFocus.id)}?technique=${suggestedTechnique.id}`}
                        >
                          View technique
                        </Link>
                    </div>
                  </>
                ) : (
                  <EmptyState title="No techniques yet" copy="No techniques yet" />
                )}
              </div>

              <div className={styles.sectionDivider} />

              <div className={`${styles.supportBlock} ${styles.feedbackSnapshot}`}>
                <h2 className={styles.cardTitle}>Evidence preview</h2>
                <p className={styles.cardText}>
                  Keep one evidence signal in view, then review it in reflection when you are ready to turn it into the next insight.
                </p>
                <div className={styles.evidenceList}>
                  {recentEvidenceSignals.map((signal) => {
                    const sourceLabel =
                      signal.sourceType === 'student-survey' ? 'Student survey' : 'Mentor observation';

                    return (
                      <article className={styles.evidenceCard} key={signal.id}>
                        <div className={styles.evidenceTop}>
                          <span className={styles.evidenceSource}>{sourceLabel}</span>
                          <span className={styles.metaLabel}>{signal.focusAreaName}</span>
                        </div>
                        <p className={styles.evidenceTitle}>{signal.title}</p>
                        <p className={styles.evidenceText}>{signal.summary}</p>
                        <div className={styles.actions}>
                          <Link
                            className={buttonClassName('secondary')}
                            to={`${appRoutes.reflection}?focus=${signal.focusAreaId}`}
                          >
                            Review in reflection
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </Card>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};
