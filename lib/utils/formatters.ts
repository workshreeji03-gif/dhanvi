import { formatINR, formatCompactINR } from '../accounting/money';

export { formatINR, formatCompactINR };

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Deterministic date formatting on both Server (SSR) and Client.
 * Avoids any timezone-induced hydration mismatch between UTC and local times.
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  if (/^\d{4}-\d{2}-\d{2}/.test(dateString)) {
    const parts = dateString.split('T')[0].split('-');
    const year = parts[0];
    const month = parseInt(parts[1], 10) - 1;
    const day = parts[2];
    return `${day} ${MONTH_NAMES[month]} ${year}`;
  }

  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return '';
  return formatDate(dateString);
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}
