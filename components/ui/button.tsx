import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

    const variants = {
      primary:
        'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900 shadow-xs',
      secondary:
        'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-300',
      outline:
        'border border-neutral-200/90 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 shadow-2xs',
      ghost:
        'bg-transparent text-neutral-700 hover:bg-neutral-100/70',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 shadow-xs',
      success:
        'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-xs px-3.5 py-2 gap-2 h-9 font-semibold',
      lg: 'text-sm px-5 py-2.5 gap-2.5 h-10 font-semibold',
      icon: 'h-8.5 w-8.5 p-0',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
