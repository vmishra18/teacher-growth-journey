import { NavLink } from 'react-router-dom';
import { appRoutes } from '@/shared/config/routes';
import styles from './Layout.module.css';

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

const navItems: NavItem[] = [
  { to: appRoutes.home, label: 'Overview', end: true },
  { to: appRoutes.focusAreas, label: 'Focus Areas' },
  { to: appRoutes.reflection, label: 'Reflection' },
  { to: appRoutes.progress, label: 'Progress' },
  { to: appRoutes.passport, label: 'CPD Passport' },
];

export const Sidebar = () => (
  <aside className={styles.sidebar}>
    <nav className={styles.nav} aria-label="Primary">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          className={({ isActive }) =>
            [styles.navLink, isActive ? styles.navLinkActive : ''].filter(Boolean).join(' ')
          }
          end={item.end}
          to={item.to}
        >
          <span className={styles.navLabel}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);
