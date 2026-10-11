import React, { useState, useEffect } from 'react';
import { Cpu, Server, WifiOff, Settings, Sparkles } from 'lucide-react';
import { getAiConfig, AI_PROVIDERS } from '../services/aiService';

export default function AiStatusBadge({ onOpenConfig, compact = false }) {
  const [config, setConfig] = useState(getAiConfig());

  useEffect(() => {
    const handleStorage = () => setConfig(getAiConfig());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // When `compact` is true only the short label is rendered. Otherwise the full
  // label is shown on large (xl+) screens and the short label on smaller ones.
  const sizeClasses = compact ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';
  const fullLabelClass = compact ? 'hidden' : 'hidden xl:inline-block max-w-[200px] truncate align-bottom';
  const shortLabelClass = compact ? 'inline' : 'max-[344px]:hidden xl:hidden';

  const renderBadgeContent = () => {
    if (config.provider === AI_PROVIDERS.GOOGLE_GEMINI) {
      return (
        <span
          className={`inline-flex items-center gap-1.5 bg-emerald-100/90 text-emerald-950 font-semibold rounded-full border border-emerald-300/80 whitespace-nowrap shrink-0 transition-colors hover:bg-emerald-200/80 ${sizeClasses}`}
          title={`Google Gemini Inference: ${config.geminiModel || 'gemini-3.8-flash'}`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span className={fullLabelClass}>
            {`Google Gemini (${config.geminiModel || 'gemini-3.8-flash'})`}
          </span>
          <span className={shortLabelClass}>Gemini</span>
        </span>
      );
    }

    if (config.provider === AI_PROVIDERS.LOCAL_OLLAMA) {
      return (
        <span
          className={`inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 font-semibold rounded-full border border-emerald-300 whitespace-nowrap shrink-0 transition-colors hover:bg-emerald-200/80 ${sizeClasses}`}
          title={`Local Ollama: ${config.ollamaModel}`}
        >
          <Cpu className="w-3.5 h-3.5 text-emerald-700 shrink-0 animate-pulse" />
          <span className={fullLabelClass}>{`Local Ollama (${config.ollamaModel})`}</span>
          <span className={shortLabelClass}>Ollama</span>
        </span>
      );
    }

    if (config.provider === AI_PROVIDERS.REMOTE_API) {
      return (
        <span
          className={`inline-flex items-center gap-1.5 bg-sky-100 text-sky-900 font-semibold rounded-full border border-sky-300 whitespace-nowrap shrink-0 transition-colors hover:bg-sky-200/80 ${sizeClasses}`}
          title={`Remote API: ${config.remoteModel}`}
        >
          <Server className="w-3.5 h-3.5 text-sky-700 shrink-0" />
          <span className={fullLabelClass}>{`Open API (${config.remoteModel})`}</span>
          <span className={shortLabelClass}>API</span>
        </span>
      );
    }

    return (
      <span
        className={`inline-flex items-center gap-1.5 bg-amber-100/90 text-amber-950 font-semibold rounded-full border border-amber-300/80 whitespace-nowrap shrink-0 transition-colors hover:bg-amber-200/80 ${sizeClasses}`}
        title="Touch Grass Offline Nature Engine (Deterministic Rule Fallback)"
      >
        <WifiOff className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <span className={fullLabelClass}>Offline Engine</span>
        <span className={shortLabelClass}>Offline</span>
      </span>
    );
  };

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <button
        type="button"
        className="cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A27]/40 rounded-full"
        onClick={onOpenConfig}
        aria-label="View and configure AI model settings"
      >
        {renderBadgeContent()}
      </button>
      <button
        type="button"
        onClick={onOpenConfig}
        className="p-1 text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100/60 rounded-lg transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A27]/40"
        title="Configure AI Engine & Provider Settings"
        aria-label="Configure AI"
      >
        <Settings className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
