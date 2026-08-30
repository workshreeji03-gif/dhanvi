'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Send, Bot, User, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { useDhanviState } from '../../../lib/supabase/demo-store';
import { processFinancialQuestion, AssistantAnswer, ConversationTurn } from '../../../lib/ai/assistant';

interface ChatMessage {
  id: string;
  sender: 'USER' | 'DHANVI';
  text: string;
  answer?: AssistantAnswer;
  timestamp: string;
}

function AssistantContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');

  const { state } = useDhanviState();
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      const greeting: ChatMessage = {
        id: 'msg_0',
        sender: 'DHANVI',
        text: 'Hello! I am Dhanvi, your AI Finance Co-Pilot. I monitor your business ledger, track cash flow, evaluate profitability, and answer questions directly from your verified double-entry accounts.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([greeting]);
    }

    if (initialQuery && state) {
      handleSendQuestion(initialQuery);
    }
  }, [initialQuery, state]);

  const handleSendQuestion = (questionText: string) => {
    if (!questionText.trim() || !state) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'USER',
      text: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory: ConversationTurn[] = [
      ...messages.map((m) => ({ sender: m.sender, text: m.text, toolsUsed: m.answer?.toolsUsed })),
      { sender: 'USER', text: questionText },
    ];

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      try {
        const answer = processFinancialQuestion(questionText, state, updatedHistory);
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          sender: 'DHANVI',
          text: answer.message,
          answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch (err: any) {
        const errAnswer: AssistantAnswer = {
          message: 'An error occurred while analyzing the ledger data. Please ensure your accounts are balanced.',
          toolsUsed: [],
          intent: 'ERROR',
        };
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          sender: 'DHANVI',
          text: errAnswer.message,
          answer: errAnswer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } finally {
        setIsTyping(false);
      }
    }, 400);
  };

  const samplePrompts = [
    'How is my business performing this month?',
    'Who owes me money and what is overdue?',
    'What are my highest business expenses?',
    'Is my General Ledger balanced?',
    'What is my current cash position?',
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Ask Dhanvi AI
            </h1>
            <Badge variant="success" size="sm">
              Grounded in Real Ledger
            </Badge>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Deterministic financial answers generated directly from your double-entry accounts
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-500 bg-white border border-neutral-200/80 px-3 py-1.5 rounded-full shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Deterministic Tool Calling</span>
        </div>
      </div>

      {/* Chat Messages Container */}
      <Card className="min-h-[500px] flex flex-col justify-between">
        {/* Messages Scroll Area */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[60vh]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3.5 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'DHANVI' && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs space-y-2 leading-relaxed ${
                  m.sender === 'USER'
                    ? 'bg-neutral-900 text-white rounded-br-xs shadow-xs'
                    : 'bg-emerald-50/40 border border-emerald-200/80 text-neutral-900 rounded-bl-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] opacity-70 mb-1">
                  <span className="font-semibold">{m.sender === 'USER' ? 'You' : 'Dhanvi AI'}</span>
                  <span>{m.timestamp}</span>
                </div>

                <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                {/* Grounded Tool Execution Badges */}
                {m.answer && m.answer.toolsUsed && m.answer.toolsUsed.length > 0 && (
                  <div className="pt-2 border-t border-emerald-200/60 mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-neutral-500 font-semibold uppercase">
                      Ledger Tools:
                    </span>
                    {m.answer.toolsUsed.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-white border border-emerald-200 text-emerald-800 text-[10px] font-mono font-medium shadow-2xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {m.sender === 'USER' && (
                <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-neutral-400">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="px-4 py-3 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce delay-100" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce delay-200" />
                <span className="text-[11px] text-neutral-500 ml-1">Analyzing ledger accounts...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input & Suggested Prompts Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-100 bg-neutral-50/50 space-y-3">
          {/* Sample Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold shrink-0">
              Try asking:
            </span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuestion(p)}
                className="whitespace-nowrap px-3 py-1 bg-white border border-neutral-200/80 rounded-full text-neutral-700 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all shrink-0 text-xs flex items-center gap-1 shadow-2xs"
              >
                <span>{p}</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-400" />
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion(inputQuery);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything about your cash flow, profit margins, receivables..."
              className="flex-1 px-4 py-3 text-sm bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900 shadow-2xs"
            />
            <Button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              leftIcon={<Send className="w-3.5 h-3.5" />}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
            >
              Ask
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-neutral-400">Loading AI Assistant...</div>}>
      <AssistantContent />
    </Suspense>
  );
}
