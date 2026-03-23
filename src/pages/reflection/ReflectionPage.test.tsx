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
        screen.getByText(/Reflection saved\. A new insight has been added to the development thread\./i),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(/More pupils explained their reasoning before I moved on\./i),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Refine questioning practice/i).length).toBeGreaterThan(0);
    },
    10000,
  );

  it('turns a student survey note into an insight', async () => {
    renderWithApp(
      <ReflectionPage />,
      `${appRoutes.reflection}?focus=questioning`,
      appRoutes.reflection,
    );

    expect(
      (await screen.findAllByText(/Pupils say they need longer thinking time before answering/i)).length,
    ).toBeGreaterThan(0);

    await userEvent.click(screen.getByRole('button', { name: /Turn into insight/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Increase wait time more consistently/i).length).toBeGreaterThan(0);
    });
  });

  it('restores a saved draft for the matching reflection context', async () => {
    window.localStorage.setItem(
      'teacher-growth-reflection-draft',
      JSON.stringify({
        focusAreaId: 'questioning',
        techniqueId: 'increase-wait-time',
        confidence: 4,
        wentWell: 'Pupils stayed with the pause for longer before answering.',
        improveNext: 'Keep the same pause after every whole-class question.',
        updatedAt: '2026-03-23T09:00:00.000Z',
      }),
    );

    renderWithApp(
      <ReflectionPage />,
      `${appRoutes.reflection}?focus=questioning&technique=increase-wait-time`,
      appRoutes.reflection,
    );

    expect(await screen.findByDisplayValue(/Pupils stayed with the pause/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Keep the same pause after every whole-class question/i)).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '4' })).toBeChecked();
    expect(screen.getByText(/Draft restored from 23 Mar\./i)).toBeInTheDocument();
  });
});
