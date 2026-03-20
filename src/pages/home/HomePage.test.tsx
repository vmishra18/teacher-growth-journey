import { screen } from '@testing-library/react';
import { appRoutes } from '@/shared/config/routes';
import { renderWithApp } from '@/test/renderApp';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('shows the active goal created from the insight workflow', async () => {
    renderWithApp(<HomePage />, appRoutes.home, appRoutes.home);

    expect(await screen.findByRole('heading', { name: /Welcome back, Vishal/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Increase wait time more consistently/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Pause for 3–5 seconds after asking questions so more pupils can think before responding\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Pupils say they need longer thinking time before answering/i),
    ).toBeInTheDocument();
  });
});
