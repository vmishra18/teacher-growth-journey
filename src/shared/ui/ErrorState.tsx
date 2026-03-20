import { Button } from './Button';
import { Card } from './Card';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <Card>
    <div style={{ display: 'grid', gap: '0.8rem' }}>
      <h2 style={{ margin: 0, fontSize: '1.15rem' }}>We could not load this part of your journey.</h2>
      <p style={{ margin: 0, color: 'var(--text-muted)' }}>{message}</p>
      <div>
        <Button onClick={onRetry} variant="secondary">
          Try again
        </Button>
      </div>
    </div>
  </Card>
);
