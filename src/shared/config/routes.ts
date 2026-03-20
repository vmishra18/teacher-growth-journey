const focusAreaDetailPath = '/focus-areas/:focusAreaId';

export const appRoutes = {
  home: '/',
  focusAreas: '/focus-areas',
  focusAreaDetail: () => focusAreaDetailPath,
  focusAreaById: (focusAreaId: string) => `/focus-areas/${focusAreaId}`,
  reflection: '/reflection',
  progress: '/progress',
  passport: '/passport',
} as const;
