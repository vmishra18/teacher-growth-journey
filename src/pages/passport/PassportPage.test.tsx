import { screen } from '@testing-library/react';
import { appRoutes } from '@/shared/config/routes';
import { renderWithApp } from '@/test/renderApp';
import { PassportPage } from './PassportPage';

describe('PassportPage', () => {
  it('renders a professional development record from existing journey activity', async () => {
    renderWithApp(<PassportPage />, appRoutes.passport, appRoutes.passport);

    expect(await screen.findByRole('heading', { name: /Professional development record/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Development activity$/i })).toBeInTheDocument();
    expect(screen.getByText(/Tried open-ended questions in classroom practice/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Logged a reflection on classroom practice/i).length).toBeGreaterThan(0);
  });
});
