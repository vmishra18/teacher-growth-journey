import type { HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: 'md' | 'lg';
}

export const Card = ({
  interactive = false,
  padding = 'lg',
  className = '',
  ...props
}: CardProps) => (
  <div
    className={[
      styles.card,
      interactive ? styles.interactive : '',
      padding === 'lg' ? styles.paddingLg : styles.paddingMd,
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);
