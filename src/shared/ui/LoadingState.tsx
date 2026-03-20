import { Card } from './Card';
import styles from './LoadingState.module.css';

export const LoadingState = () => (
  <div className={styles.shell} aria-live="polite" aria-busy="true">
    <Card>
      <div className={styles.shell}>
        <div className={`${styles.line} ${styles.lineShort}`} />
        <div className={`${styles.line} ${styles.lineMedium}`} />
        <div className={styles.block} />
      </div>
    </Card>
    <Card>
      <div className={styles.shell}>
        <div className={`${styles.line} ${styles.lineShort}`} />
        <div className={styles.block} />
      </div>
    </Card>
  </div>
);
