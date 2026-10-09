import React, { useState, useEffect } from 'react';
import { Cpu, Server, WifiOff, Settings, CheckCircle2 } from 'lucide-react';
import { getAiConfig, AI_PROVIDERS } from '../services/aiService';

export default function AiStatusBadge({ onOpenConfig }) {
  const [config, setConfig] = useState(getAiConfig());

  useEffect(() => {
    const handleStorage = () => setConfig(getAiConfig());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const renderBadgeContent = () => {
    if (config.provider === AI_PROVIDERS.LOCAL_OLLAMA) {
      return (
        <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-300">
          <Cpu className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
          <span>Local Ollama ({config.ollamaModel})</span>
        </span>
      );
    }
    if (config.provider === AI_PROVIDERS.REMOTE_API) {
      return (
        <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-900 text-xs font-semibold px-2.5 py-1 rounded-full border border-sky-300">
          <Server className="w-3.5 h-3.5 text-sky-700" />
          <span>Open API ({config.remoteModel})</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-300" title="Touch Grass Offline Nature Engine (Deterministic Fallback)">
        <WifiOff className="w-3.5 h-3.5 text-amber-700" />
        <span>Offline Engine (Fallback)</span>
      </span>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <div className="cursor-pointer hover:opacity-90 transition-opacity" onClick={onOpenConfig}>
        {renderBadgeContent()}
      </div>
      <button
        onClick={onOpenConfig}
        className="p-1 text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100/60 rounded-lg transition-colors"
        title="Configure Open-Source AI Settings"
        aria-label="Configure AI"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
}
