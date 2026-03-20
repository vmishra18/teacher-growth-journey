import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  label: string;
  value: number;
  color?: string;
  showValue?: boolean;
  labelHidden?: boolean;
}

export const ProgressBar = ({
  label,
  value,
  color = 'var(--accent)',
  showValue = true,
  labelHidden = false,
}: ProgressBarProps) => (
  <div className={styles.wrap}>
    {!labelHidden || showValue ? (
      <div className={styles.row}>
        {!labelHidden ? <span className={styles.label}>{label}</span> : <span />}
        {showValue ? <span className={styles.value}>{value}%</span> : null}
      </div>
    ) : null}
    <div
      className={styles.track}
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={value}
      role="progressbar"
    >
      <div className={styles.fill} style={{ width: `${value}%`, background: color }} />
    </div>
  </div>
);
