import styles from './PageIntro.module.css';

interface PageIntroProps {
  eyebrow: string;
  title: string;
  copy: string;
}

export const PageIntro = ({ eyebrow, title, copy }: PageIntroProps) => (
  <header className={styles.intro}>
    <span className={styles.eyebrow}>{eyebrow}</span>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.copy}>{copy}</p>
  </header>
);
