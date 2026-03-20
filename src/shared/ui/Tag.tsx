import styles from './Tag.module.css';

interface TagProps {
  label: string;
  color?: string;
}

export const Tag = ({ label, color = 'var(--primary)' }: TagProps) => (
  <span className={styles.tag}>
    <span className={styles.dot} style={{ background: color }} aria-hidden="true" />
    {label}
  </span>
);
