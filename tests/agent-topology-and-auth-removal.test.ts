import { describe, it, expect } from 'vitest';
import { RESEARCH_AGENTS } from '@/components/landing/network-visualization';
import fs from 'fs';
import path from 'path';

describe('Agent Topology & Public Auth Removal Verification', () => {
  it('should verify all 6 specialized agents have complete architectural specs', () => {
    expect(RESEARCH_AGENTS).toHaveLength(6);

    const agentIds = RESEARCH_AGENTS.map((a) => a.id);
    expect(agentIds).toEqual(['news', 'market', 'company', 'macro', 'sentiment', 'events']);

    // Check News Agent
    const news = RESEARCH_AGENTS.find((a) => a.id === 'news')!;
    expect(news.name).toBe('News Agent');
    expect(news.description).toContain('Monitors relevant financial news');
    expect(news.inputs).toContain('Financial news');
    expect(news.inputs).toContain('Company announcements');
    expect(news.analysis).toContain('Event classification');
    expect(news.outputs).toContain('Structured events');

    // Check Market Agent
    const market = RESEARCH_AGENTS.find((a) => a.id === 'market')!;
    expect(market.name).toBe('Market Agent');
    expect(market.inputs).toContain('Price data');
    expect(market.inputs).toContain('Liquidity');
    expect(market.analysis).toContain('Trend analysis');
    expect(market.outputs).toContain('Market-state representation');

    // Check Company Agent
    const company = RESEARCH_AGENTS.find((a) => a.id === 'company')!;
    expect(company.name).toBe('Company Agent');
    expect(company.inputs).toContain('Financial statements');
    expect(company.analysis).toContain('Fundamental analysis');
    expect(company.outputs).toContain('Company intelligence');

    // Check Macro Agent
    const macro = RESEARCH_AGENTS.find((a) => a.id === 'macro')!;
    expect(macro.name).toBe('Macro Agent');
    expect(macro.inputs).toContain('Interest rates');
    expect(macro.analysis).toContain('Macro regime analysis');
    expect(macro.outputs).toContain('Macro context');

    // Check Sentiment Agent
    const sentiment = RESEARCH_AGENTS.find((a) => a.id === 'sentiment')!;
    expect(sentiment.name).toBe('Sentiment Agent');
    expect(sentiment.inputs).toContain('News narratives');
    expect(sentiment.analysis).toContain('Narrative clustering');
    expect(sentiment.outputs).toContain('Sentiment indicators');

    // Check Events Agent
    const events = RESEARCH_AGENTS.find((a) => a.id === 'events')!;
    expect(events.name).toBe('Events Agent');
    expect(events.inputs).toContain('Earnings');
    expect(events.analysis).toContain('Event classification');
    expect(events.outputs).toContain('Event map');
  });

  it('should verify navbar has removed all public sign in / login links', () => {
    const navbarFile = fs.readFileSync(
      path.resolve(__dirname, '../components/landing/navbar.tsx'),
      'utf-8'
    );
    expect(navbarFile).not.toContain('href="/login"');
    expect(navbarFile).not.toContain('Sign In');
    expect(navbarFile).toContain('Join Early Access');
  });

  it('should verify footer has removed researcher login and reset password links', () => {
    const footerFile = fs.readFileSync(
      path.resolve(__dirname, '../components/landing/footer.tsx'),
      'utf-8'
    );
    expect(footerFile).not.toContain('Researcher Login');
    expect(footerFile).not.toContain('Reset Password');
    expect(footerFile).not.toContain('href="/login"');
    expect(footerFile).not.toContain('href="/reset-password"');
  });

  it('should verify public auth pages have been removed', () => {
    expect(fs.existsSync(path.resolve(__dirname, '../app/(auth)/login/page.tsx'))).toBe(false);
    expect(fs.existsSync(path.resolve(__dirname, '../app/(auth)/signup/page.tsx'))).toBe(false);
    expect(fs.existsSync(path.resolve(__dirname, '../app/(auth)/register/page.tsx'))).toBe(false);
    expect(fs.existsSync(path.resolve(__dirname, '../app/(auth)/forgot-password/page.tsx'))).toBe(false);
    expect(fs.existsSync(path.resolve(__dirname, '../app/(auth)/reset-password/page.tsx'))).toBe(false);
    expect(fs.existsSync(path.resolve(__dirname, '../app/auth/callback/page.tsx'))).toBe(false);
  });
});
