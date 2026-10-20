const {
  createDefaultState,
  getState,
  persistState,
  enrichState,
  generateAIResponse,
  getActivePersona
} = require('../lib/core');

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') {
      return resolve(req.body);
    }
    if (typeof req.body === 'string') {
      try {
        return resolve(JSON.parse(req.body));
      } catch {
        return resolve({});
      }
    }
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;

  try {
    // GET /api/state
    if (pathname === '/api/state' && req.method === 'GET') {
      const state = await getState();
      return sendJson(res, 200, enrichState(state));
    }

    // POST /api/onboarding
    if (pathname === '/api/onboarding' && req.method === 'POST') {
      const body = await parseBody(req);
      const state = await getState();

      if (body.partnerAName) state.couple.partnerA.name = body.partnerAName.trim();
      if (body.partnerAPronouns) state.couple.partnerA.pronouns = body.partnerAPronouns;
      if (body.partnerBName) state.couple.partnerB.name = body.partnerBName.trim();
      if (body.partnerBPronouns) state.couple.partnerB.pronouns = body.partnerBPronouns;
      if (body.intimacyLevel) state.couple.contract.intimacyLevel = body.intimacyLevel;
      if (body.personaId && state.personas[body.personaId]) {
        state.activePersonaId = body.personaId;
      }
      if (body.language) {
        state.language = body.language;
      }

      const persona = getActivePersona(state);
      const isVelvet = state.couple.contract.intimacyLevel === 'velvet';
      const welcomeText = isVelvet ? persona.greetingVelvet : persona.greetingWellness;

      state.messages.trisal.push({
        id: 'msg-' + Date.now(),
        sender: 'ai',
        senderName: `${persona.name} • Concierge Intime`,
        timestamp: new Date().toISOString(),
        text: `✨ **[Suíte Privada Configurada: ${state.couple.partnerA.name} & ${state.couple.partnerB.name} + ${persona.name}]**\n\n${welcomeText}`,
        mood: isVelvet ? 'Velvet Noir 🔥' : 'Haute Romance ✨',
        vibrationIntensity: isVelvet ? 65 : 30
      });

      await persistState(state);
      return sendJson(res, 200, enrichState(state));
    }

    // POST /api/chat
    if (pathname === '/api/chat' && req.method === 'POST') {
      const body = await parseBody(req);
      const state = await getState();

      const channel = body.channel || 'trisal';
      const senderId = body.senderId || 'partnerA';
      const text = (body.text || '').trim();
      const specialAction = body.specialAction || null;
      const lang = body.lang || state.language || 'pt';

      if (!state.messages[channel]) state.messages[channel] = [];

      const speaker = senderId === 'partnerB' ? state.couple.partnerB : state.couple.partnerA;

      if (text) {
        state.messages[channel].push({
          id: 'msg-u-' + Date.now(),
          sender: senderId,
          senderName: speaker.name,
          timestamp: new Date().toISOString(),
          text
        });
      }

      const aiReply = await generateAIResponse(state, channel, senderId, text, specialAction, lang);
      const persona = getActivePersona(state);

      const aiMsg = {
        id: 'msg-ai-' + (Date.now() + 1),
        sender: 'ai',
        senderName: `${persona.name} • ${channel === 'trisal' ? 'Suíte do Trisal' : 'Salon Privé'}`,
        timestamp: new Date().toISOString(),
        text: aiReply.text,
        mood: aiReply.mood,
        vibrationIntensity: aiReply.vibrationIntensity,
        mediaCard: aiReply.mediaCard || null
      };

      state.messages[channel].push(aiMsg);
      await persistState(state);

      return sendJson(res, 200, {
        ok: true,
        aiMessage: aiMsg,
        state: enrichState(state)
      });
    }

    // POST /api/vault
    if (pathname === '/api/vault' && req.method === 'POST') {
      const body = await parseBody(req);
      const state = await getState();
      const { partnerId, fantasyId, value, triggerInChat, lang } = body;

      if (partnerId && fantasyId !== undefined && state.vaultChoices[partnerId]) {
        state.vaultChoices[partnerId][fantasyId] = Number(value);
      }

      if (triggerInChat && fantasyId) {
        const fantasy = state.fantasies.find((f) => f.id === fantasyId);
        if (fantasy) {
          const aiReply = await generateAIResponse(
            state,
            'trisal',
            partnerId || 'partnerA',
            '',
            { type: 'introduce_fantasy', fantasy },
            lang || state.language || 'pt'
          );
          const persona = getActivePersona(state);
          state.messages.trisal.push({
            id: 'msg-vault-' + Date.now(),
            sender: 'ai',
            senderName: `${persona.name} • Cofre de Chave Dupla`,
            timestamp: new Date().toISOString(),
            text: aiReply.text,
            mood: aiReply.mood,
            vibrationIntensity: aiReply.vibrationIntensity
          });
        }
      }

      await persistState(state);
      return sendJson(res, 200, enrichState(state));
    }

    // POST /api/scenarios/launch
    if (pathname === '/api/scenarios/launch' && req.method === 'POST') {
      const body = await parseBody(req);
      const state = await getState();
      const scenario = state.scenarios.find((s) => s.id === body.scenarioId);
      if (!scenario) return sendJson(res, 404, { error: 'Cenário não encontrado' });

      scenario.unlocked = true;
      const persona = getActivePersona(state);
      const promptFormatted = scenario.openingPrompt
        .replace(/\{partnerA\}/g, state.couple.partnerA.name)
        .replace(/\{partnerB\}/g, state.couple.partnerB.name);

      state.messages.trisal.push({
        id: 'msg-scen-' + Date.now(),
        sender: 'ai',
        senderName: `${persona.name} • Diretora de Cena`,
        timestamp: new Date().toISOString(),
        text: promptFormatted,
        mood: scenario.title,
        vibrationIntensity: 80
      });

      await persistState(state);
      return sendJson(res, 200, enrichState(state));
    }

    // POST /api/config (Configuração rápida de OpenRouter Uncensored + Supabase)
    if (pathname === '/api/config' && req.method === 'POST') {
      const body = await parseBody(req);
      const state = await getState();

      state.apiConfig = {
        provider: body.provider || 'openrouter',
        apiKey: body.apiKey !== undefined ? body.apiKey.trim() : state.apiConfig.apiKey,
        model: body.model || state.apiConfig.model || 'nousresearch/hermes-3-llama-3.1-70b',
        supabaseUrl: body.supabaseUrl !== undefined ? body.supabaseUrl.trim() : (state.apiConfig.supabaseUrl || ''),
        supabaseKey: body.supabaseKey !== undefined ? body.supabaseKey.trim() : (state.apiConfig.supabaseKey || '')
      };

      await persistState(state);
      return sendJson(res, 200, enrichState(state));
    }

    // POST /api/lgpd-wipe (Incinerador de Dados)
    if (pathname === '/api/lgpd-wipe' && req.method === 'POST') {
      const fresh = createDefaultState();
      await persistState(fresh);
      return sendJson(res, 200, enrichState(fresh));
    }

    return sendJson(res, 404, { error: 'Endpoint não encontrado' });
  } catch (err) {
    console.error('API Error:', err);
    return sendJson(res, 500, { error: err.message || 'Erro interno no servidor' });
  }
};
