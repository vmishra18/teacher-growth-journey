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
                <span className={styles.brandTitle}>Teacher Growth Journey</span>
              </div>
            </div>
            <div className={styles.navigationSlot}>
              <Sidebar />
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
