'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { clsx } from 'clsx';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

let toastListeners: Array<(msg: ToastMessage) => void> = [];

export function showToast(title: string, message?: string, type: 'success' | 'error' | 'info' = 'success') {
  const toastMsg: ToastMessage = {
    id: `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type,
    title,
    message,
  };
  toastListeners.forEach((l) => l(toastMsg));
}

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const listener = (msg: ToastMessage) => {
      setToasts((prev) => [...prev, msg]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== msg.id));
      }, 4000);
    };

    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={clsx(
            'pointer-events-auto p-4 rounded-xl shadow-lg border text-xs flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-200',
            t.type === 'success' && 'bg-white dark:bg-neutral-900 border-emerald-200 dark:border-emerald-800 text-neutral-900 dark:text-white',
            t.type === 'error' && 'bg-white dark:bg-neutral-900 border-rose-200 dark:border-rose-800 text-neutral-900 dark:text-white',
            t.type === 'info' && 'bg-white dark:bg-neutral-900 border-blue-200 dark:border-blue-800 text-neutral-900 dark:text-white'
          )}
        >
          {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
          {t.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
          {t.type === 'info' && <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}

          <div className="flex-1">
            <p className="font-bold">{t.title}</p>
            {t.message && <p className="text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">{t.message}</p>}
          </div>

          <button
            onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
