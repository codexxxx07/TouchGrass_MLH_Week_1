/**
 * Touch Grass — Secure AI Proxy (optional serverless function)
 *
 * Purpose: keep private AI credentials on the server. The browser never sees a
 * key. This endpoint is intentionally opt-in: only used when the client is
 * built with `VITE_AI_PROXY_URL` pointing at it.
 *
 * Supported runtimes: Vercel / Netlify style Node serverless function
 * (Node 18+, where global `fetch` is available).
 *
 * Required server-side environment variables (NEVER prefix these with VITE_):
 *   GEMINI_API_KEY   (or GOOGLE_API_KEY)  — Google AI Studio / Gemini key
 *   REMOTE_API_KEY   (or GROQ_API_KEY)    — OpenAI-compatible provider key
 *   AI_PROXY_ALLOWED_ENDPOINTS            — optional comma-separated allowlist
 *
 * Contract used by src/services/aiService.js:
 *   GET  ?provider=gemini                       -> forwards to Gemini models list
 *   GET  ?provider=openai&endpoint=<baseUrl>    -> forwards to <baseUrl>/models
 *   POST { provider, model, body }              -> Gemini generateContent
 *   POST { provider:'openai', endpoint, body }  -> OpenAI-compatible chat/completions
 */

const DEFAULT_OPENAI_ENDPOINT = 'https://api.groq.com/openai/v1';

const json = (res, status, payload) => {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.send(JSON.stringify(payload));
};

const getAllowedEndpoints = () => {
  const raw = process.env.AI_PROXY_ALLOWED_ENDPOINTS;
  if (!raw) return [DEFAULT_OPENAI_ENDPOINT];
  return raw
    .split(',')
    .map((s) => s.trim().replace(/\/+$/, ''))
    .filter(Boolean);
};

const isAllowedEndpoint = (endpoint) => {
  const normalized = (endpoint || '').replace(/\/+$/, '');
  if (!/^https:\/\//i.test(normalized)) return false;
  return getAllowedEndpoints().some((allowed) => normalized === allowed || normalized.startsWith(`${allowed}/`));
};

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const provider = (req.query?.provider || '').toString();

      if (provider === 'gemini') {
        const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        if (!key) return json(res, 500, { error: { message: 'Server is missing GEMINI_API_KEY.' } });
        const upstream = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`
        );
        const data = await upstream.json().catch(() => ({}));
        return json(res, upstream.status, data);
      }

      if (provider === 'openai') {
        const key = process.env.REMOTE_API_KEY || process.env.GROQ_API_KEY;
        if (!key) return json(res, 500, { error: { message: 'Server is missing REMOTE_API_KEY.' } });
        const endpoint = (req.query?.endpoint || DEFAULT_OPENAI_ENDPOINT).toString();
        if (!isAllowedEndpoint(endpoint)) {
          return json(res, 400, { error: { message: 'Endpoint not allowed by proxy allowlist.' } });
        }
        const upstream = await fetch(`${endpoint.replace(/\/+$/, '')}/models`, {
          headers: { Authorization: `Bearer ${key}` }
        });
        const data = await upstream.json().catch(() => ({}));
        return json(res, upstream.status, data);
      }

      return json(res, 400, { error: { message: 'Unsupported provider. Use provider=gemini or provider=openai.' } });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return json(res, 405, { error: { message: 'Method not allowed.' } });
    }

    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { provider, model, body, endpoint } = payload;

    if (!body || typeof body !== 'object') {
      return json(res, 400, { error: { message: 'Missing request body.' } });
    }

    if (provider === 'gemini') {
      const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
      if (!key) return json(res, 500, { error: { message: 'Server is missing GEMINI_API_KEY.' } });
      const useModel = model || 'gemini-2.0-flash';
      const upstream = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(useModel)}:generateContent?key=${encodeURIComponent(key)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      );
      const data = await upstream.json().catch(() => ({}));
      return json(res, upstream.status, data);
    }

    if (provider === 'openai') {
      const key = process.env.REMOTE_API_KEY || process.env.GROQ_API_KEY;
      if (!key) return json(res, 500, { error: { message: 'Server is missing REMOTE_API_KEY.' } });
      if (!isAllowedEndpoint(endpoint)) {
        return json(res, 400, { error: { message: 'Endpoint not allowed by proxy allowlist.' } });
      }
      const upstream = await fetch(`${endpoint.replace(/\/+$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`
        },
        body: JSON.stringify(body)
      });
      const data = await upstream.json().catch(() => ({}));
      return json(res, upstream.status, data);
    }

    return json(res, 400, { error: { message: 'Unsupported provider.' } });
  } catch (err) {
    return json(res, 502, { error: { message: `Proxy error: ${err.message}` } });
  }
}
