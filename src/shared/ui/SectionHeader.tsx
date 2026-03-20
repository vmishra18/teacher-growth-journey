import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  copy?: string;
  eyebrow?: string;
  compact?: boolean;
}

export const SectionHeader = ({ title, copy, eyebrow, compact = false }: SectionHeaderProps) => (
  <header className={[styles.header, compact ? styles.headerCompact : ''].filter(Boolean).join(' ')}>
    <div className={styles.content}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <h1 className={styles.title}>{title}</h1>
      {copy ? <p className={styles.copy}>{copy}</p> : null}
    </div>
    <div className={styles.art} aria-hidden="true">
      <div className={`${styles.tile} ${styles.tileGreen}`} />
      <div className={`${styles.tile} ${styles.tileBlue}`} />
      <div className={`${styles.tile} ${styles.tileOrange}`} />
      <div className={`${styles.tile} ${styles.tilePlum}`} />
    </div>
  </header>
);
