import { screen } from '@testing-library/react';
import { appRoutes } from '@/shared/config/routes';
import { renderWithApp } from '@/test/renderApp';
import { FocusAreasPage } from './FocusAreasPage';

describe('FocusAreasPage', () => {
  it('renders the seeded teaching focus areas with progress context', async () => {
    renderWithApp(<FocusAreasPage />, appRoutes.focusAreas, appRoutes.focusAreas);

    expect(await screen.findByRole('heading', { name: /Questioning/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Feedback/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Classroom routines/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Supportive environment/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Current focus/i).length).toBeGreaterThan(0);
  });
});
