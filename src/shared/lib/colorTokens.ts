import type { FocusArea } from '@/shared/types';

export const focusAreaAccent = (colorToken: FocusArea['colorToken']) => {
  switch (colorToken) {
    case 'green':
      return 'var(--success)';
    case 'blue':
      return 'var(--primary)';
    case 'amber':
      return 'var(--primary)';
    case 'teal':
    default:
      return 'var(--primary)';
  }
};
