import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { appRoutes } from '@/shared/config/routes';
import { FocusAreaDetailPage, FocusAreasPage } from '@/pages/focus-areas';
import { HomePage } from '@/pages/home';
import { PassportPage } from '@/pages/passport';
import { ProgressPage } from '@/pages/progress';
import { ReflectionPage } from '@/pages/reflection';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search]);

  return null;
};

export const AppRouter = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route element={<HomePage />} path={appRoutes.home} />
      <Route element={<FocusAreasPage />} path={appRoutes.focusAreas} />
      <Route element={<FocusAreaDetailPage />} path={appRoutes.focusAreaDetail()} />
      <Route element={<ReflectionPage />} path={appRoutes.reflection} />
      <Route element={<ProgressPage />} path={appRoutes.progress} />
      <Route element={<PassportPage />} path={appRoutes.passport} />
      <Route element={<Navigate replace to={appRoutes.home} />} path="*" />
    </Routes>
  </>
);
