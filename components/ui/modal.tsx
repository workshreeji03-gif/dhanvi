import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { Button } from './button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/30 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={clsx(
          'relative w-full bg-white rounded-2xl border border-neutral-200/80 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150',
          maxWidths[maxWidth]
        )}
      >
        <div className="flex items-start justify-between p-6 border-b border-neutral-100">
          <div>
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">{title}</h2>
            {description && (
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{description}</p>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal" className="text-neutral-400 hover:text-neutral-700">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto">{children}</div>

        {footer && (
          <div className="p-4 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
