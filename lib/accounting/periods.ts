/**
 * DHANVI ACCOUNTING PERIODS & FISCAL YEAR LOGIC
 * Indian Financial Year: April 1 to March 31
 */

export interface FiscalPeriod {
  periodNumber: number;
  name: string;
  startDate: string;
  endDate: string;
  isLocked: boolean;
}

export function getIndianFiscalYear(dateString: string = new Date().toISOString()): {
  fiscalYear: number;
  fiscalYearLabel: string;
  startDate: string;
  endDate: string;
} {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0 = Jan, 3 = April

  // If before April, it belongs to FY (Year-1)-(Year)
  const fyStartYear = month >= 3 ? year : year - 1;
  const fyEndYear = fyStartYear + 1;

  return {
    fiscalYear: fyStartYear,
    fiscalYearLabel: `FY ${fyStartYear}-${fyEndYear.toString().slice(-2)}`,
    startDate: `${fyStartYear}-04-01`,
    endDate: `${fyEndYear}-03-31`,
  };
}

export function getCurrentMonthPeriod(): { startDate: string; endDate: string; label: string } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startDate = new Date(year, month, 1).toISOString().split('T')[0];
  const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];
  const label = now.toLocaleString('default', { month: 'long', year: 'numeric' });

  return { startDate, endDate, label };
}
