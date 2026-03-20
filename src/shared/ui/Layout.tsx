import type { ReactNode } from 'react';
import { useTheme } from '@/app/providers';
import { Sidebar } from './Sidebar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <div className={styles.shell}>
      <div className={styles.frame}>
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>
            <div className={styles.brandCluster}>
              <div className={styles.brandMark} aria-hidden="true">
                <span className={styles.brandHalo} />
                <span className={styles.brandGlow} />
                <span className={styles.brandCore} />
                <span className={styles.brandGrid} />
                <span className={styles.brandOrbit} />
                <span className={styles.brandInitials}>
                  <span>T</span>
                  <span>G</span>
                </span>
              </div>
              <div className={styles.brandBlock}>
                <span className={styles.brandKicker}>Teacher Growth Journey</span>
                <span className={styles.brand}>
                  Evidence-informed professional development for everyday teaching practice
                </span>
                <span className={styles.cycleLine}>
                  <span aria-hidden="true" className={styles.cycleDot} />
                  Development cycle: use feedback, resources, deliberate practice, and reflection to refine teaching
                </span>
              </div>
            </div>
            <div className={styles.meta}>
              <div className={styles.metaBlock}>
                <span className={styles.smallLabel}>Teacher view</span>
                <strong className={styles.metaValue}>Aligned to the Model for Great Teaching</strong>
              </div>
              <button
                aria-label={`Switch to ${nextTheme} mode`}
                className={styles.themeButton}
                onClick={toggleTheme}
                title={`Switch to ${nextTheme} mode`}
                type="button"
              >
                <span className={styles.themeIcon} aria-hidden="true">
                  {theme === 'light' ? '☾' : '☀'}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.navigationWrap}>
          <div className={styles.navigationInner}>
            <Sidebar />
          </div>
        </div>
        <main className={styles.main}>
          <div className={styles.backgroundOrb} aria-hidden="true" />
          <div className={styles.backgroundOrbSecondary} aria-hidden="true" />
          <div className={styles.contentInner}>
            <div className={styles.content}>{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};
