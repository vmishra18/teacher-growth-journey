import styles from './StatusPill.module.css';

interface StatusPillProps {
  label: string;
  color?: string;
}

export const StatusPill = ({ label, color = 'var(--accent)' }: StatusPillProps) => (
  <span className={styles.pill}>
    <span className={styles.dot} style={{ background: color }} aria-hidden="true" />
    {label}
  </span>
);
