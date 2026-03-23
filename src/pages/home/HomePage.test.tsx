import { screen } from '@testing-library/react';
import { appRoutes } from '@/shared/config/routes';
import { renderWithApp } from '@/test/renderApp';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('shows a lighter overview with the key current journey signals', async () => {
    renderWithApp(<HomePage />, appRoutes.home, appRoutes.home);

    expect(await screen.findByRole('heading', { name: /Welcome back, Vishal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Keep your current focus moving/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Increase wait time more consistently/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Reflect on your recent lesson using the questioning technique you selected\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Pupils say they need longer thinking time before answering/i),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Write reflection/i }).length).toBeGreaterThan(0);
  });
});
