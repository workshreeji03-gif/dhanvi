import React from 'react';
import { clsx } from 'clsx';
import { Button } from './button';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={clsx(
        'p-12 text-center flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/30',
        className
      )}
    >
      <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-2xl text-neutral-600 dark:text-neutral-300 mb-4">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-white">{title}</h3>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mt-1.5 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-5" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
