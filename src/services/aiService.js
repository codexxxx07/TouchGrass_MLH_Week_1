/**
 * Touch Grass — Open-Source AI Service Module
 * Handles LLM inference integration with Local Ollama, Open-Weight APIs,
 * and a robust Deterministic Rule-Based Fallback Engine.
 * 
 * Strict Requirement: Never fake AI responses. Always disclose source engine.
 */

// Local Storage keys for user AI settings
const CONFIG_KEY = 'touch_grass_ai_config_v1';

export const AI_PROVIDERS = {
  OFFLINE_FALLBACK: 'offline_fallback',
  LOCAL_OLLAMA: 'local_ollama',
  REMOTE_API: 'remote_api'
};

const getEnvApiKey = () => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env.VITE_GEMMA_API_KEY || import.meta.env.GEMMA_API_KEY || '';
    }
  } catch (e) {}
  return '';
};

export const DEFAULT_AI_CONFIG = {
  provider: AI_PROVIDERS.OFFLINE_FALLBACK, // Default to lightweight, instant offline engine
  ollamaEndpoint: 'http://localhost:11434',
  ollamaModel: 'llama3.2',
  remoteEndpoint: 'https://api.groq.com/openai/v1',
  remoteModel: 'llama-3.1-8b-instant',
  remoteApiKey: getEnvApiKey()
};

export const getAiConfig = () => {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    const envKey = getEnvApiKey();
    if (!saved) {
      return { ...DEFAULT_AI_CONFIG, remoteApiKey: envKey };
    }
    const parsed = JSON.parse(saved);
    if (!parsed.remoteApiKey && envKey) {
      parsed.remoteApiKey = envKey;
    }
    return { ...DEFAULT_AI_CONFIG, ...parsed };
  } catch (e) {
    return DEFAULT_AI_CONFIG;
  }
};

export const saveAiConfig = (config) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
};

/**
 * Test connectivity to Ollama or Remote Endpoint
 */
export const checkAiProviderHealth = async (config = getAiConfig()) => {
  if (config.provider === AI_PROVIDERS.OFFLINE_FALLBACK) {
    return { available: true, message: 'Offline Nature Engine is active and ready (0ms latency).' };
  }

  if (config.provider === AI_PROVIDERS.LOCAL_OLLAMA) {
    try {
      const res = await fetch(`${config.ollamaEndpoint}/api/tags`, { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        const models = data.models || [];
        const hasModel = models.some(m => m.name.includes(config.ollamaModel));
        return {
          available: true,
          message: `Connected to Local Ollama! ${models.length} model(s) available.`,
          models: models.map(m => m.name)
        };
      }
      return { available: false, message: `Ollama server reachable, but returned status ${res.status}.` };
    } catch (e) {
      return {
        available: false,
        message: `Cannot connect to Ollama at ${config.ollamaEndpoint}. Ensure Ollama is running and CORS is configured.`
      };
    }
  }

  if (config.provider === AI_PROVIDERS.REMOTE_API) {
    if (!config.remoteApiKey && !config.remoteEndpoint.includes('localhost')) {
      return { available: false, message: 'Remote Open-Weight API key is missing. Please enter an API key.' };
    }
    try {
      const res = await fetch(`${config.remoteEndpoint}/models`, {
        headers: { 'Authorization': `Bearer ${config.remoteApiKey}` }
      });
      if (res.ok) {
        return { available: true, message: 'Connected to Remote Open-Weight Inference API.' };
      }
      return { available: false, message: `Remote API error (${res.status}). Check API key or endpoint.` };
    } catch (e) {
      return { available: false, message: `Remote endpoint connection failed: ${e.message}` };
    }
  }

  return { available: true, message: 'Ready' };
};

/**
 * Main function: Generate Outdoor Adventure Plan
 */
export const generateAdventurePlan = async (userInputs) => {
  const config = getAiConfig();
  const startTime = Date.now();

  const prompt = `Create a structured real-world outdoor adventure plan for a user with:
- Available Time: ${userInputs.availableTime || '30 minutes'}
- Preferred Activity: ${userInputs.activityType || 'Nature Walk'}
- Difficulty: ${userInputs.difficulty || 'Beginner'}
- Starting Location: ${userInputs.locationSetting || 'Outdoor / Local Park'}
- Interests: ${(userInputs.interests || []).join(', ') || 'Birds, Leaves, Mindfulness'}
- Accessibility: ${userInputs.accessibilityNeeds || 'None specified'}

Output ONLY valid JSON matching this schema:
{
  "title": "string",
  "shortDescription": "string",
  "estimatedDuration": "string",
  "durationMinutes": number,
  "difficulty": "string",
  "requiredItems": ["string"],
  "activities": ["string"],
  "natureChallenges": ["string"],
  "safetyTips": ["string"],
  "completionGoal": "string"
}`;

  // Attempt Local Ollama
  if (config.provider === AI_PROVIDERS.LOCAL_OLLAMA) {
    try {
      const response = await fetch(`${config.ollamaEndpoint}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: config.ollamaModel,
          prompt: prompt,
          format: 'json',
          stream: false
        })
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = JSON.parse(data.response);
        return {
          adventure: formatAdventureOutput(parsed, userInputs),
          meta: {
            source: AI_PROVIDERS.LOCAL_OLLAMA,
            modelName: `Ollama (${config.ollamaModel})`,
            latencyMs: Date.now() - startTime,
            disclosureNotice: `Generated live using your local open-weight model: Ollama (${config.ollamaModel}).`
          }
        };
      }
    } catch (e) {
      console.warn('Ollama generation failed, seamlessly falling back to rule engine:', e);
    }
  }

  // Attempt Remote Open-Weight API
  if (config.provider === AI_PROVIDERS.REMOTE_API) {
    try {
      const response = await fetch(`${config.remoteEndpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.remoteApiKey}`
        },
        body: JSON.stringify({
          model: config.remoteModel,
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices[0].message.content;
        const parsed = JSON.parse(content);
        return {
          adventure: formatAdventureOutput(parsed, userInputs),
          meta: {
            source: AI_PROVIDERS.REMOTE_API,
            modelName: `Open-Weight API (${config.remoteModel})`,
            latencyMs: Date.now() - startTime,
            disclosureNotice: `Generated live using open-weight model via remote API: ${config.remoteModel}.`
          }
        };
      }
    } catch (e) {
      console.warn('Remote API generation failed, falling back to rule engine:', e);
    }
  }

  // Fallback: Deterministic Rule-Based Engine
  const fallbackAdventure = generateRuleBasedAdventure(userInputs);
  return {
    adventure: fallbackAdventure,
    meta: {
      source: AI_PROVIDERS.OFFLINE_FALLBACK,
      modelName: 'Offline Nature Rule Engine (Deterministic)',
      latencyMs: Date.now() - startTime,
      disclosureNotice: 'Generated using Touch Grass Offline Nature Engine (Deterministic Rule-Based Fallback).'
    }
  };
};

/**
 * Feature A: AI Nature Guide Assistant Response Generator
 */
export const askNatureGuide = async (userMessage, chatHistory = []) => {
  const config = getAiConfig();
  const startTime = Date.now();

  const systemPrompt = `You are Touch Grass Nature Guide, an expert open-source AI assistant. Your goal is to help users disconnect from screens and explore real nature safely and mindfully. 

Strict Rules:
1. Always provide useful, practical suggestions instead of generic motivational fluff.
2. Encourage respectful wildlife observation from a distance.
3. For foraging/plants: NEVER state a wild plant or mushroom is safe to eat. Always include a safety warning.
4. Keep answers concise, actionable, and formatted in clear steps or bullet points.`;

  if (config.provider === AI_PROVIDERS.LOCAL_OLLAMA) {
    try {
      const response = await fetch(`${config.ollamaEndpoint}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: config.ollamaModel,
          messages: [
            { role: 'system', content: systemPrompt },
            ...chatHistory,
            { role: 'user', content: userMessage }
          ],
          stream: false
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          text: data.message.content,
          meta: {
            source: AI_PROVIDERS.LOCAL_OLLAMA,
            modelName: `Ollama (${config.ollamaModel})`,
            latencyMs: Date.now() - startTime,
            disclosureNotice: `Response generated live via Local Ollama (${config.ollamaModel}).`
          }
        };
      }
    } catch (e) {
      console.warn('Ollama chat failed, using nature rule fallback engine:', e);
    }
  }

  if (config.provider === AI_PROVIDERS.REMOTE_API) {
    try {
      const response = await fetch(`${config.remoteEndpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.remoteApiKey}`
        },
        body: JSON.stringify({
          model: config.remoteModel,
          messages: [
            { role: 'system', content: systemPrompt },
            ...chatHistory,
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          text: data.choices[0].message.content,
          meta: {
            source: AI_PROVIDERS.REMOTE_API,
            modelName: `Open-Weight API (${config.remoteModel})`,
            latencyMs: Date.now() - startTime,
            disclosureNotice: `Response generated via Open-Weight Remote API (${config.remoteModel}).`
          }
        };
      }
    } catch (e) {
      console.warn('Remote API chat failed:', e);
    }
  }

  // Fallback Rule Engine Chat Response
  const fallbackText = generateRuleBasedGuideResponse(userMessage);
  return {
    text: fallbackText,
    meta: {
      source: AI_PROVIDERS.OFFLINE_FALLBACK,
      modelName: 'Offline Nature Rule Engine',
      latencyMs: Date.now() - startTime,
      disclosureNotice: 'Response generated by Touch Grass Offline Nature Engine (Fallback Mode).'
    }
  };
};

/**
 * Deterministic Fallback Adventure Generator
 */
function generateRuleBasedAdventure(inputs) {
  const time = inputs.availableTime || '30 minutes';
  const activity = inputs.activityType || 'Nature Walk';
  const difficulty = inputs.difficulty || 'Beginner';
  const location = inputs.locationSetting || 'Outdoor Park';
  const interests = (inputs.interests || []).join(', ') || 'Nature Observation';

  const durationMin = parseInt(time) || 30;

  let title = `The ${durationMin}-Minute ${activity} Explorer`;
  let description = `A tailored ${difficulty.toLowerCase()} level micro-expedition designed for ${durationMin} minutes in ${location.toLowerCase()}, focusing on ${interests}.`;

  const activities = [
    `Step 1: Step outside into ${location.toLowerCase()} without checking your phone. Spend 2 minutes adjusting your sight and hearing to the natural ambiance.`,
    `Step 2: Walk at a steady, unhurried pace for ${Math.round(durationMin * 0.4)} minutes while keeping your eyes peeled for leaf patterns and bird roosts.`,
    `Step 3: Pause in a quiet spot for ${Math.floor(durationMin * 0.3)} minutes. Close your eyes and count how many unique wind rustles or bird songs you hear.`,
    `Step 4: Find one interesting natural artifact (a fallen acorn, a weathered pebble, or intricate bark texture) and observe its micro-details.`
  ];

  const challenges = [
    `Observe at least 3 distinct plant leaf structures without disturbing them.`,
    `Identify 2 different natural sound directions before starting your return route.`
  ];

  const requiredItems = ['Water bottle', 'Comfortable footwear', 'Pocket journal or paper'];

  if (interests.toLowerCase().includes('photography')) {
    requiredItems.push('Camera or phone in Airplane mode');
    challenges.push('Take 1 high-contrast close-up photo of natural light filtering through foliage.');
  }

  if (interests.toLowerCase().includes('gardening')) {
    activities.push('Bonus Step: Inspect nearby soil dampness and check under broad leaves for beneficial earthworms.');
  }

  const safetyTips = [
    'Always respect wildlife: keep a safe distance of at least 10 feet from birds or animals.',
    'Stay on clear paths and watch for loose gravel or tree roots.',
    '⚠️ Plant Safety Warning: Never pick or eat wild plants or mushrooms based on descriptions alone.'
  ];

  return {
    title,
    shortDescription: description,
    estimatedDuration: `${durationMin} Minutes`,
    durationMinutes: durationMin,
    difficulty,
    requiredItems,
    activities,
    natureChallenges: challenges,
    safetyTips,
    completionGoal: `Spend ${durationMin} full minutes outdoors, log 1 observation in your journal, and return feeling grounded.`
  };
}

/**
 * Deterministic Fallback Guide Response Generator
 */
function generateRuleBasedGuideResponse(message) {
  const msgLower = message.toLowerCase();

  if (msgLower.includes('30 min') || msgLower.includes('something outside') || msgLower.includes('quick')) {
    return `Try a 20-minute nature observation walk! 

1. **Phase 1 (5 Mins)**: Walk out to the nearest green patch. Put your phone in your pocket on silent.
2. **Phase 2 (10 Mins)**: Find three distinct leaf shapes (lobed, serrated, needle) and listen for two distinct bird calls.
3. **Phase 3 (5 Mins)**: Spend 5 quiet minutes observing shadow patterns without checking any screens.

💡 *Tip*: Take three slow, deep breaths of outside air before stepping back indoors!`;
  }

  if (msgLower.includes('bird') || msgLower.includes('feather') || msgLower.includes('song')) {
    return `To observe local birds respectfully:

• **Find Cover**: Stand still near a tree line or bush hedge.
• **Listen First**: Birds notice sudden movement. Close your eyes and pinpoint their position by ear before searching visually.
• **Maintain Distance**: Keep at least 15-20 feet away to avoid scaring them off nests.
• **Key Features**: Look for beak shape, chest color markings, and flight patterns (undulating vs gliding).`;
  }

  if (msgLower.includes('garden') || msgLower.includes('plant') || msgLower.includes('grow')) {
    return `Here are 3 beginner-friendly balcony or window gardening ideas:

1. **Regrow Scallions/Green Onions**: Place root ends in a shallow glass of water on a sunny sill. Sprouts appear in 3-5 days!
2. **Mint Cuttings**: Snipping a small mint stem and submersing the lower nodes in water roots quickly for easy potting.
3. **Soil Moisture Check**: Push your index finger 1 inch into the soil; water only when the top layer feels completely dry.`;
  }

  if (msgLower.includes('eat') || msgLower.includes('mushroom') || msgLower.includes('berry') || msgLower.includes('forag')) {
    return `⚠️ **CRITICAL NATURE SAFETY NOTICE**:
Never consume wild berries, mushrooms, or leaves identified solely by AI or photos! Many edible plants have toxic lookalikes. 

To explore safely:
• Practice **observational foraging**: study plant structures, smells, and leaf vein arrangement with your eyes and hands without eating them.
• Consult certified local botanical guides or extension services for verified foraging walks.`;
  }

  return `Here is a quick outdoor grounding exercise:

1. **5-4-3-2-1 Nature Scan**:
   - See 5 natural colors (emerald, amber, sky blue, earth brown, cloud white).
   - Touch 4 natural textures (rough bark, smooth pebble, soft leaf, cool breeze).
   - Hear 3 distinct outdoor sounds (rustling leaves, distant bird, wind chime).
   - Smell 2 natural scents (damp soil, pine needle, fresh grass).
   - Taste 1 fresh sip of water.

2. Spend 15 minutes outside breathing deeply away from digital notifications!`;
}

function formatAdventureOutput(parsed, userInputs) {
  return {
    title: parsed.title || 'Custom AI Nature Expedition',
    shortDescription: parsed.shortDescription || 'A personalized real-world nature mission.',
    estimatedDuration: parsed.estimatedDuration || userInputs.availableTime || '30 Minutes',
    durationMinutes: parsed.durationMinutes || parseInt(userInputs.availableTime) || 30,
    difficulty: parsed.difficulty || userInputs.difficulty || 'Beginner',
    requiredItems: parsed.requiredItems || ['Water bottle', 'Journal'],
    activities: parsed.activities || ['Explore local outdoors mindfully.'],
    natureChallenges: parsed.natureChallenges || ['Log 1 discovery.'],
    safetyTips: parsed.safetyTips || ['Stay hydrated and stay on trail.'],
    completionGoal: parsed.completionGoal || 'Complete outdoor exploration screen-free.'
  };
}
