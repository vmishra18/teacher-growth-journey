import type { CSSProperties } from 'react';
import styles from './ProgressRing.module.css';

interface ProgressRingProps {
  value: number;
  label: string;
  color?: string;
}

export const ProgressRing = ({
  value,
  label,
  color = 'var(--accent)',
}: ProgressRingProps) => (
  <div
    className={styles.ring}
    style={
      {
        '--value': value,
        '--ring-color': color,
      } as CSSProperties
    }
    aria-label={`${label}: ${value}%`}
    role="img"
  >
    <div className={styles.content}>
      <span className={styles.value}>{value}%</span>
      <span className={styles.label}>{label}</span>
    </div>
  </div>
);
