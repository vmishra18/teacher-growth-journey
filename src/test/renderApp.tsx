import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@/app/providers';

export const renderWithApp = (element: ReactElement, initialEntry: string, routePath: string) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AppProviders>
        <Routes>
          <Route element={element} path={routePath} />
        </Routes>
      </AppProviders>
    </MemoryRouter>,
  );
