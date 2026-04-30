import { useState } from 'react';
import { Bot, Copy, Check, Sparkles } from 'lucide-react';
import { trackEvent } from '../Analytics';
import type { BlogSummaryModes } from '../../types/blog';

interface RariSummaryPanelProps {
  title: string;
  tldrShort: string;
  bullets: string[];
  summaries: BlogSummaryModes;
  darkMode?: boolean;
}

type SummaryMode = keyof BlogSummaryModes;

export default function RariSummaryPanel({
  title,
  tldrShort,
  bullets,
  summaries,
  darkMode = false,
}: RariSummaryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<SummaryMode>('quick');
  const [copied, setCopied] = useState(false);

  const modeCopy: Record<SummaryMode, string> = {
    quick: 'Quick',
    operator: 'Operator',
    investor: 'Investor',
  };

  const onToggle = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    trackEvent('tldr_click', {
      event_category: 'blog_engagement',
      event_label: title,
      state: nextOpen ? 'open' : 'close',
    });
  };

  const onModeChange = (nextMode: SummaryMode) => {
    setMode(nextMode);
    trackEvent('tldr_mode_change', {
      event_category: 'blog_engagement',
      event_label: `${title}:${nextMode}`,
    });
  };

  const onCopy = async () => {
    const text = `${modeCopy[mode]} summary:\n${summaries[mode]}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    trackEvent('tldr_copy', {
      event_category: 'blog_engagement',
      event_label: `${title}:${mode}`,
    });
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section
      className={`rounded-2xl border p-5 md:p-6 mb-10 ${
        darkMode
          ? 'border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800'
          : 'border-primary-100 bg-gradient-to-br from-primary-50 to-white'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`font-dfaalt text-lg flex items-center gap-2 mb-1 ${
              darkMode ? 'text-blue-300' : 'text-primary-800'
            }`}
          >
            <Bot className="w-5 h-5" />
            Rari TL;DR
          </p>
          <p className={`font-inter ${darkMode ? 'text-gray-100' : 'text-primary-900'}`}>
            {tldrShort}
          </p>
        </div>
        <button
          onClick={onToggle}
          className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] ${
            darkMode
              ? 'bg-blue-500 text-white hover:bg-blue-400'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          Too long? Let Rari break it down.
        </button>
      </div>

      <ul
        className={`mt-4 list-disc pl-5 space-y-1 text-sm ${
          darkMode ? 'text-gray-200' : 'text-primary-900'
        }`}
      >
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      {isOpen && (
        <div
          className={`mt-5 rounded-xl border p-4 transition-all duration-200 ${
            darkMode ? 'bg-gray-950 border-gray-700' : 'bg-white border-primary-100'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {(Object.keys(modeCopy) as SummaryMode[]).map((modeKey) => (
              <button
                key={modeKey}
                onClick={() => onModeChange(modeKey)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  mode === modeKey
                    ? darkMode
                      ? 'bg-blue-500 text-white'
                      : 'bg-primary-600 text-white'
                    : darkMode
                      ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {modeCopy[modeKey]}
              </button>
            ))}
            <button
              onClick={onCopy}
              className={`ml-auto inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs ${
                darkMode
                  ? 'border-gray-700 text-gray-200 hover:bg-gray-800'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <p className={`font-inter leading-7 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {summaries[mode]}
          </p>
          <p className={`mt-3 text-xs flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Sparkles className="w-3.5 h-3.5" />
            Generated from this article only.
          </p>
        </div>
      )}
    </section>
  );
}

