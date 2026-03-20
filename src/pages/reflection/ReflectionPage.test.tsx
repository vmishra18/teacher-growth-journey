import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { appRoutes } from '@/shared/config/routes';
import { renderWithApp } from '@/test/renderApp';
import { ReflectionPage } from './ReflectionPage';

describe('ReflectionPage', () => {
  it(
    'saves a reflection and generates a new insight from it',
    async () => {
    renderWithApp(
      <ReflectionPage />,
      `${appRoutes.reflection}?focus=questioning`,
      appRoutes.reflection,
    );

    expect(await screen.findByLabelText(/What went well\?/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('radio', { name: '5' }));
    await userEvent.type(
      screen.getByLabelText(/What went well\?/i),
      'More pupils explained their reasoning before I moved on.',
    );
    await userEvent.type(
      screen.getByLabelText(/What could be improved\?/i),
      'I will script a sharper follow-up prompt for hesitant answers.',
    );
    await userEvent.click(screen.getByRole('button', { name: /Save reflection/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Your reflection has been saved\. Keep building your practice\./i),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(/More pupils explained their reasoning before I moved on\./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Hold the pause across the whole lesson/i)).toBeInTheDocument();
    },
    10000,
  );

  it('turns a student survey note into an insight', async () => {
    renderWithApp(
      <ReflectionPage />,
      `${appRoutes.reflection}?focus=questioning`,
      appRoutes.reflection,
    );

    expect(await screen.findByText(/Pupils say they need longer thinking time before answering/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Turn into insight/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Increase wait time more consistently/i).length).toBeGreaterThan(0);
    });
  });
});
