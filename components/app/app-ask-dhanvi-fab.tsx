'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, ArrowUp, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import { useDhanviState } from '../../lib/supabase/demo-store';
import { processFinancialQuestion, AssistantAnswer } from '../../lib/ai/assistant';
import { FinancialToolContext } from '../../lib/ai/tools';

const SUGGESTED_QUESTIONS = [
  'How much cash do I have?',
  'What are my largest expenses?',
  'Who owes me money?',
  'How is my profit margin?',
  'What happened recently in the business?',
];

export function AppAskDhanviFab() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<
    Array<{ sender: 'USER' | 'DHANVI'; text: string; answer?: AssistantAnswer }>
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const { state } = useDhanviState();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  if (!state) return null;

  const handleAsk = (q: string) => {
    const query = q.trim();
    if (!query) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'USER', text: query }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const toolContext: FinancialToolContext = {
        accounts: state.accounts,
        journalEntries: state.journalEntries,
        transactions: state.transactions,
        customers: state.customers,
        vendors: state.vendors,
        products: state.products,
        invoices: state.invoices,
      };

      const result = processFinancialQuestion(query, toolContext);
      setMessages((prev) => [
        ...prev,
        { sender: 'DHANVI', text: result.message, answer: result },
      ]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <>
      {/* Floating Dialog Drawer */}
      {open && (
        <div className="animate-fade-up fixed bottom-20 right-4 sm:right-6 z-[60] flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/70 px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-bold text-neutral-900">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100/80 text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              Ask Dhanvi AI
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="max-h-80 min-h-56 space-y-3 overflow-y-auto p-4 text-xs">
            {messages.length === 0 ? (
              <div className="space-y-3 py-2">
                <p className="text-neutral-500 leading-relaxed">
                  Ask any financial or operational question about <span className="font-semibold text-neutral-800">{state.business.name}</span>. Answers are dynamically calculated from your General Ledger.
                </p>
                <div className="flex flex-col gap-1.5 pt-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Suggested Questions</p>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleAsk(q)}
                      className="text-left px-3 py-2 rounded-xl border border-neutral-200/80 bg-neutral-50/60 hover:bg-emerald-50/70 hover:border-emerald-200/80 hover:text-emerald-950 font-medium text-neutral-700 transition-all flex items-center justify-between group"
                    >
                      <span>{q}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className="space-y-2">
                  {m.sender === 'USER' ? (
                    <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-xs bg-neutral-900 px-3.5 py-2 text-white font-medium">
                      {m.text}
                    </div>
                  ) : (
                    <div className="mr-auto max-w-[95%] rounded-2xl rounded-bl-xs bg-neutral-100/90 p-3 space-y-2 text-neutral-900 border border-neutral-200/60">
                      <p className="leading-relaxed font-medium">{m.text}</p>
                      {m.answer?.keyMetric && (
                        <div className="p-2 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-between font-mono">
                          <span className="text-[11px] text-neutral-500 font-sans">{m.answer.keyMetric.label}</span>
                          <span className="font-bold text-emerald-700 text-sm">{m.answer.keyMetric.value}</span>
                        </div>
                      )}
                      {m.answer?.recommendation && (
                        <p className="text-[11px] text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200/60 leading-relaxed">
                          💡 {m.answer.recommendation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}

            {isTyping && (
              <div className="mr-auto flex items-center gap-1.5 bg-neutral-100 px-3.5 py-2 rounded-2xl rounded-bl-xs text-neutral-500 font-medium text-xs">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Calculating ledger signals...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(input);
            }}
            className="flex items-center gap-2 border-t border-neutral-100 p-2.5 bg-white"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your finances..."
              className="flex-1 px-3 py-2 text-xs bg-neutral-50 border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send query"
              className="p-2 rounded-xl bg-neutral-900 text-white disabled:opacity-40 hover:bg-neutral-800 transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Trigger Matching Screenshot 1 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ask Dhanvi AI"
        className="group fixed bottom-5 right-4 sm:right-6 z-[60] inline-flex items-center gap-2 rounded-full bg-neutral-900 py-2.5 pl-4 pr-5 text-xs sm:text-sm font-semibold text-white shadow-xl shadow-neutral-900/15 transition-all hover:bg-neutral-800 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {open ? (
          <ArrowUp className="h-4 w-4 rotate-180 transition-transform" />
        ) : (
          <Sparkles className="h-4 w-4 text-emerald-400" />
        )}
        Ask Dhanvi
      </button>
    </>
  );
}
