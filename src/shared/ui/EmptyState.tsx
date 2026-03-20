import type { ReactNode } from 'react';
import { Card } from './Card';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  copy: string;
  action?: ReactNode;
}

export const EmptyState = ({ title, copy, action }: EmptyStateProps) => (
  <Card>
    <div className={styles.empty}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.copy}>{copy}</p>
      {action}
    </div>
  </Card>
);
