import React, { useState, useEffect } from 'react';
import { X, Cpu, Server, WifiOff, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Sparkles } from 'lucide-react';
import { getAiConfig, saveAiConfig, checkAiProviderHealth, AI_PROVIDERS } from '../services/aiService';

export default function AiConfigModal({ isOpen, onClose }) {
  const [config, setConfig] = useState(getAiConfig());
  const [healthStatus, setHealthStatus] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const current = getAiConfig();
      setConfig(current);
      runHealthCheck(current);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const runHealthCheck = async (cfgToTest = config) => {
    setIsTesting(true);
    setHealthStatus(null);
    const result = await checkAiProviderHealth(cfgToTest);
    setHealthStatus(result);
    setIsTesting(false);
  };

  const handleSave = () => {
    saveAiConfig(config);
    window.dispatchEvent(new Event('storage'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/60 backdrop-blur-sm animate-fadeIn">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-config-title"
className="bg-[#FAF6EE] border border-[#2D5A27]/15 rounded-2xl max-w-lg w-full p-6 shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto"
        >
        <button
          onClick={onClose}
          aria-label="Close AI settings"
          className="absolute top-4 right-4 text-[#7C8377] hover:text-[#1E2A1A] p-1.5 rounded-full hover:bg-[#EDE9DE] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 bg-[#2D5A27]/10 text-[#2D5A27] rounded-xl">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 id="ai-config-title" className="text-xl font-bold text-[#1E2A1A]">Open-Source AI Settings</h2>
            <p className="text-[13px] text-[#7C8377]">Select model provider &amp; transparent inference engine</p>
          </div>
        </div>

        <div className="bg-[#E9F0E4] border border-[#2D5A27]/10 p-3.5 rounded-xl mb-5 flex items-start gap-2 text-xs text-[#23421C]">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#2D5A27] mt-0.5" />
          <span>
            <strong>Privacy & Transparency:</strong> Touch Grass never tracks user activity or exposes private API keys. You choose between running 100% locally via Ollama, open-weight remote APIs, or the built-in offline engine.
          </span>
        </div>

        {/* Health Check Status */}
        {isTesting && (
          <div className="p-3 bg-[#EDE9DE] rounded-xl mb-4 text-xs flex items-center gap-2 text-[#4C5249]">
            <RefreshCw className="w-4 h-4 animate-spin text-[#2D5A27]" />
            <span>Testing provider connection...</span>
          </div>
        )}

        {healthStatus && (
          <div className={`p-3 rounded-xl mb-4 text-xs flex items-start gap-2 ${
            healthStatus.available ? 'bg-emerald-100/80 text-emerald-900 border border-emerald-300' : 'bg-amber-100/80 text-amber-900 border border-amber-300'
          }`}>
            {healthStatus.available ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">{healthStatus.available ? 'Provider Operational' : 'Provider Warning / Offline'}</p>
              <p className="mt-0.5">{healthStatus.message}</p>
            </div>
          </div>
        )}

        {/* Provider Radio Cards */}
        <div className="space-y-3 mb-5">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#7C8377]">Inference engine</span>
          
          {/* Option 1: Offline Engine */}
          <div
            onClick={() => setConfig({ ...config, provider: AI_PROVIDERS.OFFLINE_FALLBACK })}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              config.provider === AI_PROVIDERS.OFFLINE_FALLBACK
                ? 'bg-white border-[#2D5A27] shadow-sm ring-1 ring-[#2D5A27]'
                : 'bg-[#FAF6EE]/70 border-[#1E2A1A]/12 hover:border-[#1E2A1A]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <WifiOff className="w-5 h-5 text-amber-700" />
                <div>
                  <span className="font-semibold text-sm text-stone-900 block">Offline Nature Engine (Built-in Fallback)</span>
                  <span className="text-xs text-stone-500 block">Deterministic, instant, 100% offline rule-based generator</span>
                </div>
              </div>
              <input
                type="radio"
                name="aiProvider"
                checked={config.provider === AI_PROVIDERS.OFFLINE_FALLBACK}
                onChange={() => {}}
                className="accent-[#2D5A27]"
              />
            </div>
          </div>

          {/* Option 2: Local Ollama */}
          <div
            onClick={() => setConfig({ ...config, provider: AI_PROVIDERS.LOCAL_OLLAMA })}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              config.provider === AI_PROVIDERS.LOCAL_OLLAMA
                ? 'bg-white border-[#2D5A27] shadow-sm ring-1 ring-[#2D5A27]'
                : 'bg-[#FAF6EE]/70 border-[#1E2A1A]/12 hover:border-[#1E2A1A]/30'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-5 h-5 text-emerald-700" />
                <div>
                  <span className="font-semibold text-sm text-stone-900 block">Local Ollama Model</span>
                  <span className="text-xs text-stone-500 block">Run open-weight models (Llama 3, Phi-3, Mistral) on localhost</span>
                </div>
              </div>
              <input
                type="radio"
                name="aiProvider"
                checked={config.provider === AI_PROVIDERS.LOCAL_OLLAMA}
                onChange={() => {}}
                className="accent-[#2D5A27]"
              />
            </div>

            {config.provider === AI_PROVIDERS.LOCAL_OLLAMA && (
              <div className="mt-3 pt-3 border-t border-stone-200 space-y-2 text-xs">
                <div>
                  <label className="block text-[13px] font-medium text-[#4C5249] mb-1">Ollama Base URL</label>
                  <input
                    type="text"
                    value={config.ollamaEndpoint}
                    onChange={(e) => setConfig({ ...config, ollamaEndpoint: e.target.value })}
                    placeholder="http://localhost:11434"
                    className="nature-input"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#4C5249] mb-1">Model Name</label>
                  <input
                    type="text"
                    value={config.ollamaModel}
                    onChange={(e) => setConfig({ ...config, ollamaModel: e.target.value })}
                    placeholder="llama3.2 or phi3"
                    className="nature-input"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Option 3: Google Gemini / Gemma */}
          <div
            onClick={() => setConfig({ ...config, provider: AI_PROVIDERS.GOOGLE_GEMINI })}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              config.provider === AI_PROVIDERS.GOOGLE_GEMINI
                ? 'bg-white border-[#2D5A27] shadow-sm ring-1 ring-[#2D5A27]'
                : 'bg-[#FAF6EE]/70 border-[#1E2A1A]/12 hover:border-[#1E2A1A]/30'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <div>
                  <span className="font-semibold text-sm text-stone-900 block">Google Gemini / Gemma API</span>
                  <span className="text-xs text-stone-500 block">Fast outdoor inference via Google AI (gemini-3.8-flash, gemma-2-27b)</span>
                </div>
              </div>
              <input
                type="radio"
                name="aiProvider"
                checked={config.provider === AI_PROVIDERS.GOOGLE_GEMINI}
                onChange={() => {}}
                className="accent-[#2D5A27]"
              />
            </div>

            {config.provider === AI_PROVIDERS.GOOGLE_GEMINI && (
              <div className="mt-3 pt-3 border-t border-stone-200 space-y-2 text-xs">
                <div>
                  <label className="block text-[13px] font-medium text-[#4C5249] mb-1">Model Name</label>
                  <input
                    type="text"
                    value={config.geminiModel || 'gemini-3.8-flash'}
                    onChange={(e) => setConfig({ ...config, geminiModel: e.target.value })}
                    placeholder="gemini-3.8-flash or gemma-4-26b-a4b-it"
                    className="nature-input"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#4C5249] mb-1">API Key (Google AI Studio)</label>
                  <input
                    type="password"
                    value={config.geminiApiKey || ''}
                    onChange={(e) => setConfig({ ...config, geminiApiKey: e.target.value })}
                    placeholder="AQ... or AIza..."
                    className="nature-input"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Option 4: Remote Open-Weight API */}
          <div
            onClick={() => setConfig({ ...config, provider: AI_PROVIDERS.REMOTE_API })}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              config.provider === AI_PROVIDERS.REMOTE_API
                ? 'bg-white border-[#2D5A27] shadow-sm ring-1 ring-[#2D5A27]'
                : 'bg-[#FAF6EE]/70 border-[#1E2A1A]/12 hover:border-[#1E2A1A]/30'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <Server className="w-5 h-5 text-sky-700" />
                <div>
                  <span className="font-semibold text-sm text-stone-900 block">Open-Weight Remote API</span>
                  <span className="text-xs text-stone-500 block">Connect to an open model inference API service</span>
                </div>
              </div>
              <input
                type="radio"
                name="aiProvider"
                checked={config.provider === AI_PROVIDERS.REMOTE_API}
                onChange={() => {}}
                className="accent-[#2D5A27]"
              />
            </div>

            {config.provider === AI_PROVIDERS.REMOTE_API && (
              <div className="mt-3 pt-3 border-t border-stone-200 space-y-2 text-xs">
                <div>
                  <label className="block text-[13px] font-medium text-[#4C5249] mb-1">API Endpoint URL</label>
                  <input
                    type="text"
                    value={config.remoteEndpoint}
                    onChange={(e) => setConfig({ ...config, remoteEndpoint: e.target.value })}
                    placeholder="https://api.groq.com/openai/v1"
                    className="nature-input"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#4C5249] mb-1">Model Name</label>
                  <input
                    type="text"
                    value={config.remoteModel}
                    onChange={(e) => setConfig({ ...config, remoteModel: e.target.value })}
                    placeholder="llama-3.1-8b-instant"
                    className="nature-input"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#4C5249] mb-1">API Key (Optional / Private local storage)</label>
                  <input
                    type="password"
                    value={config.remoteApiKey}
                    onChange={(e) => setConfig({ ...config, remoteApiKey: e.target.value })}
                    placeholder="gsk_..."
                    className="nature-input"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-200">
          <button
            onClick={() => runHealthCheck(config)}
            className="px-3 py-2 text-xs font-semibold text-[#4C5249] bg-[#EDE9DE] hover:bg-[#E4E0D4] rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Test Connection</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#7C8377] hover:text-[#1E2A1A] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-nature-primary text-xs py-2 px-4"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
