import React, { useState, useEffect } from 'react';
import { X, Cpu, Server, WifiOff, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF6EE] border border-[#2D5A27]/20 rounded-2xl max-w-lg w-full p-6 shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 p-1.5 rounded-full hover:bg-stone-200/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 bg-[#2D5A27]/10 text-[#2D5A27] rounded-xl">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1C2818]">Open-Source AI Settings</h2>
            <p className="text-xs text-stone-600">Select model provider & transparent inference engine</p>
          </div>
        </div>

        <div className="bg-[#E4ECE2]/60 p-3 rounded-xl mb-5 flex items-start gap-2 text-xs text-[#1D3B19]">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#2D5A27] mt-0.5" />
          <span>
            <strong>Privacy & Transparency:</strong> Touch Grass never tracks user activity or exposes private API keys. You choose between running 100% locally via Ollama, open-weight remote APIs, or the built-in offline engine.
          </span>
        </div>

        {/* Health Check Status */}
        {isTesting && (
          <div className="p-3 bg-stone-100 rounded-xl mb-4 text-xs flex items-center gap-2 text-stone-600">
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
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">Inference Engine</label>
          
          {/* Option 1: Offline Engine */}
          <div
            onClick={() => setConfig({ ...config, provider: AI_PROVIDERS.OFFLINE_FALLBACK })}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              config.provider === AI_PROVIDERS.OFFLINE_FALLBACK
                ? 'bg-white border-[#2D5A27] shadow-sm ring-1 ring-[#2D5A27]'
                : 'bg-white/50 border-stone-200 hover:border-stone-300'
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
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              config.provider === AI_PROVIDERS.LOCAL_OLLAMA
                ? 'bg-white border-[#2D5A27] shadow-sm ring-1 ring-[#2D5A27]'
                : 'bg-white/50 border-stone-200 hover:border-stone-300'
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
                  <label className="block text-stone-600 font-medium mb-1">Ollama Base URL</label>
                  <input
                    type="text"
                    value={config.ollamaEndpoint}
                    onChange={(e) => setConfig({ ...config, ollamaEndpoint: e.target.value })}
                    placeholder="http://localhost:11434"
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#2D5A27]"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Model Name</label>
                  <input
                    type="text"
                    value={config.ollamaModel}
                    onChange={(e) => setConfig({ ...config, ollamaModel: e.target.value })}
                    placeholder="llama3.2 or phi3"
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#2D5A27]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Option 3: Remote API */}
          <div
            onClick={() => setConfig({ ...config, provider: AI_PROVIDERS.REMOTE_API })}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              config.provider === AI_PROVIDERS.REMOTE_API
                ? 'bg-white border-[#2D5A27] shadow-sm ring-1 ring-[#2D5A27]'
                : 'bg-white/50 border-stone-200 hover:border-stone-300'
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
                  <label className="block text-stone-600 font-medium mb-1">API Endpoint URL</label>
                  <input
                    type="text"
                    value={config.remoteEndpoint}
                    onChange={(e) => setConfig({ ...config, remoteEndpoint: e.target.value })}
                    placeholder="https://api.groq.com/openai/v1"
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#2D5A27]"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Model Name</label>
                  <input
                    type="text"
                    value={config.remoteModel}
                    onChange={(e) => setConfig({ ...config, remoteModel: e.target.value })}
                    placeholder="llama-3.1-8b-instant"
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#2D5A27]"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">API Key (Optional / Private local storage)</label>
                  <input
                    type="password"
                    value={config.remoteApiKey}
                    onChange={(e) => setConfig({ ...config, remoteApiKey: e.target.value })}
                    placeholder="gsk_..."
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#2D5A27]"
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
            className="px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-200/80 hover:bg-stone-300 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Test Connection</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800 transition-colors"
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
