import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { appRoutes } from '@/shared/config/routes';
import { renderWithApp } from '@/test/renderApp';
import { FocusAreaDetailPage } from './FocusAreaDetailPage';

describe('FocusAreaDetailPage', () => {
  it('marks a technique as tried after the teacher logs classroom use', async () => {
    renderWithApp(
      <FocusAreaDetailPage />,
      appRoutes.focusAreaById('questioning'),
      appRoutes.focusAreaDetail(),
    );

    const headings = await screen.findAllByRole(
      'heading',
      { name: /Questioning/i },
      { timeout: 3000 },
    );
    expect(headings.length).toBeGreaterThan(0);

    const tryButtons = await screen.findAllByRole('button', { name: /Try this technique/i });
    await userEvent.click(tryButtons[0]);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Technique logged/i })).toBeInTheDocument();
    });
  });
});
