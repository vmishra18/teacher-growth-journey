import { Link } from 'react-router-dom';
import type { Technique } from '@/shared/types';
import { buttonClassName, Tag } from '@/shared/ui';
import styles from './TechniqueCard.module.css';

interface TechniqueCardProps {
  focusAreaId: string;
  technique: Technique;
  accentColor: string;
  index: number;
  isRecommended?: boolean;
  evidenceCue?: string;
  reflectionCue?: string;
  onTry: () => void;
  onToggleBookmark: () => void;
  isBusy: boolean;
}

export const TechniqueCard = ({
  focusAreaId,
  technique,
  accentColor,
  index,
  isRecommended = false,
  evidenceCue,
  reflectionCue,
  onTry,
  onToggleBookmark,
  isBusy,
}: TechniqueCardProps) => {
  const statusLabel = technique.tried
    ? 'Tried in class'
    : technique.bookmarked
      ? 'Bookmarked'
      : 'Ready to try';

  return (
    <article
      className={[
        styles.card,
        technique.tried ? styles.tried : '',
        !technique.tried && technique.bookmarked ? styles.saved : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.top}>
        <div className={styles.headingBlock}>
          <span className={styles.sequence}>
            {isRecommended ? 'Best next move' : `Technique ${index + 1}`}
          </span>
          <h3 className={styles.title}>{technique.title}</h3>
          <p className={styles.summary}>{technique.summary}</p>
        </div>
        <Tag color={accentColor} label={statusLabel} />
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.stepsPanel}>
          <h4 className={styles.subheading}>Try it in class</h4>
          <ol className={styles.list}>
            {technique.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className={styles.example}>
          <span className={styles.exampleLabel}>Classroom example</span>
          <p className={styles.exampleText}>{technique.classroomExample}</p>
          {evidenceCue || reflectionCue ? (
            <div className={styles.workflowNotes}>
              {evidenceCue ? (
                <div className={styles.workflowNote}>
                  <span className={styles.workflowLabel}>Evidence to watch</span>
                  <p className={styles.workflowText}>{evidenceCue}</p>
                </div>
              ) : null}
              {reflectionCue ? (
                <div className={styles.workflowNote}>
                  <span className={styles.workflowLabel}>Use in reflection</span>
                  <p className={styles.workflowText}>{reflectionCue}</p>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={buttonClassName('primary')}
          disabled={isBusy}
          onClick={onTry}
          type="button"
        >
          {technique.tried ? 'Technique logged' : 'Try this technique'}
        </button>
        <button
          className={buttonClassName('secondary')}
          disabled={isBusy}
          onClick={onToggleBookmark}
          type="button"
        >
          {technique.bookmarked ? 'Saved' : 'Save technique'}
        </button>
        <Link
          className={buttonClassName('ghost')}
          to={`/reflection?focus=${focusAreaId}&technique=${technique.id}`}
        >
          Reflect
        </Link>
      </div>
    </article>
  );
};
