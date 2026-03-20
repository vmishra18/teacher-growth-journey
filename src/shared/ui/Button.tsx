import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const buttonClassName = (
  variant: ButtonVariant = 'primary',
  fullWidth = false,
  className = '',
) =>
  [styles.button, styles[variant], fullWidth ? styles.fullWidth : '', className].filter(Boolean).join(' ');

export const Button = ({
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    className={buttonClassName(variant, fullWidth, className)}
    type={type}
    {...props}
  />
);
