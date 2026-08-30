import { describe, it, expect } from 'vitest';
import { formatINR, formatCompactINR, roundMoney, addMoney, subtractMoney } from '../lib/accounting/money';

describe('Financial Number Arithmetic & INR Formatting', () => {
  it('should format standard and large INR numbers correctly', () => {
    expect(formatINR(12500)).toBe('₹12,500.00');
    expect(formatINR(125000)).toBe('₹1,25,000.00');
    expect(formatINR(1250000)).toBe('₹12,50,000.00');
    expect(formatINR(12500000)).toBe('₹1,25,00,000.00');
    expect(formatINR(124567890)).toBe('₹12,45,67,890.00');
    expect(formatINR(1254567890)).toBe('₹1,25,45,67,890.00');
  });

  it('should support compact Indian number notation (Lakhs / Crores)', () => {
    expect(formatCompactINR(125000)).toBe('₹1.25L');
    expect(formatCompactINR(12500000)).toBe('₹1.25Cr');
    expect(formatCompactINR(124567890)).toBe('₹12.46Cr');
  });

  it('should perform exact rounding and arithmetic without IEEE-754 drift', () => {
    const sum = addMoney(0.1, 0.2);
    expect(sum).toBe(0.3);
    const diff = subtractMoney(100.05, 50.02);
    expect(diff).toBe(50.03);
    expect(roundMoney(1234.567)).toBe(1234.57);
  });
});
