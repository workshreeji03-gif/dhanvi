/**
 * DHANVI MONEY & CURRENCY ENGINE
 * Ensures exact decimal rounding, safe arithmetic, and Indian Currency (INR) formatting.
 */

export function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function addMoney(...amounts: number[]): number {
  const sum = amounts.reduce((acc, curr) => acc + (curr || 0), 0);
  return roundMoney(sum);
}

export function subtractMoney(a: number, b: number): number {
  return roundMoney(roundMoney(a) - roundMoney(b));
}

export function multiplyMoney(amount: number, factor: number): number {
  return roundMoney(roundMoney(amount) * factor);
}

export function isZeroMoney(amount: number): boolean {
  return Math.abs(roundMoney(amount)) < 0.005;
}

/**
 * Format numbers using Indian Numbering System: ₹1,25,000.00 or ₹1,25,000
 */
export function formatINR(
  amount: number,
  options: {
    showDecimals?: boolean;
    showSign?: boolean;
    compact?: boolean;
  } = {}
): string {
  const { showDecimals = true, showSign = false, compact = false } = options;
  const isNegative = amount < 0;
  const absAmount = Math.abs(roundMoney(amount));

  if (compact) {
    return formatCompactINR(amount);
  }

  // Split integer and decimal parts
  const fixed = absAmount.toFixed(2);
  const [intPart, decPart] = fixed.split(".");

  // Indian format: last 3 digits, then groups of 2 digits
  let result = "";
  if (intPart.length > 3) {
    const last3 = intPart.substring(intPart.length - 3);
    const otherDigits = intPart.substring(0, intPart.length - 3);
    const withCommas = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    result = withCommas + "," + last3;
  } else {
    result = intPart;
  }

  const sign = isNegative ? "- " : showSign && amount > 0 ? "+ " : "";
  const decimals = showDecimals ? `.${decPart}` : "";

  return `${sign}₹${result}${decimals}`;
}

/**
 * Formats large amounts into Lakhs (L) and Crores (Cr)
 * e.g., 150000 -> ₹1.50L, 25000000 -> ₹2.50Cr
 */
export function formatCompactINR(amount: number): string {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  let formatted = "";

  if (abs >= 10000000) {
    // 1 Crore = 10,000,000
    const cr = abs / 10000000;
    formatted = `₹${cr.toFixed(cr >= 100 ? 1 : 2)}Cr`;
  } else if (abs >= 100000) {
    // 1 Lakh = 100,000
    const l = abs / 100000;
    formatted = `₹${l.toFixed(l >= 100 ? 1 : 2)}L`;
  } else if (abs >= 1000) {
    // 1 Thousand = 1,000
    const k = abs / 1000;
    formatted = `₹${k.toFixed(1)}k`;
  } else {
    formatted = `₹${abs.toFixed(0)}`;
  }

  return isNegative ? `-${formatted}` : formatted;
}
