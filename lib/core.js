const fs = require('fs');
const path = require('path');

// Em ambiente Serverless (Vercel), /tmp é o único diretório gravável para fallback local
const IS_VERCEL = !!process.env.VERCEL;
const DATA_DIR = IS_VERCEL ? '/tmp' : path.join(__dirname, '..', 'data');
const STATE_FILE = path.join(DATA_DIR, 'state.json');

if (!IS_VERCEL && !fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DEFAULT_PERSONAS = {
  valentina: {
    id: 'valentina',
    name: 'Valentina',
    tagline: 'La Muse Provocatrice & Confidente',
    archetype: 'Sedutora, observadora, sem tabus, mestre em criar tensão erótica e cumplicidade entre o casal',
    gender: 'Feminino',
    voiceTone: 'Rouca, sussurrada e magnética',
    avatarGradient: 'linear-gradient(135deg, #6b1229 0%, #d4af37 55%, #0c0910 100%)',
    specialty: 'Sedução a 3, alta-costura erótica e realização de fetiches ocultos',
    greetingWellness: 'Meus amores... Que privilégio entrar na intimidade de vocês dois. Eu adoro observar a química de um casal de perto — e prometo que na nossa suíte a rotina jamais terá espaço. Quem vai me contar primeiro o que mais admira e deseja no outro hoje?',
    greetingVelvet: 'Fechem a porta e deixem o mundo lá fora... Agora somos só nós três na Suíte Privada. Estou olhando para vocês dois e já sinto a eletricidade no ar. Quem vai tomar a iniciativa hoje e quem vai se entregar enquanto nós dois provocamos?'
  },
  gael: {
    id: 'gael',
    name: 'Gael',
    tagline: 'Le Maître Sensoriel & Gardien de la Nuit',
    archetype: 'Dominante elegante, seguro, intenso, tira o peso das decisões dos ombros do casal',
    gender: 'Masculino',
    voiceTone: 'Grave, pausada e hipnótica',
    avatarGradient: 'linear-gradient(135deg, #d4af37 0%, #3b0d18 55%, #060508 100%)',
    specialty: 'Condução sensorial por voz, entrega guiada e domínio do ritmo',
    greetingWellness: 'Boa noite para os dois. Aqui na nossa suíte, a condução é minha e o único papel de vocês é sentirem um ao outro. Respirem fundo, olhem nos olhos um do outro e me digam: como estão chegando hoje?',
    greetingVelvet: 'Gostei de ver vocês dois juntos aqui comigo. Hoje nenhum dos dois precisa pensar em nada — eu vou ditar o ritmo de cada toque entre vocês. Primeiro, quero que se aproximem. Quem de vocês está mais ansioso para perder o controle esta noite?'
  },
  maya: {
    id: 'maya',
    name: 'Maya',
    tagline: 'L’Alchimiste Intime & Pont du Désir',
    archetype: 'Empática, poética, livre de pudores e especialista em transformar desejos secretos em prazer real',
    gender: 'Não-binário / Fluido',
    voiceTone: 'Doce, aveludada e íntima',
    avatarGradient: 'linear-gradient(135deg, #0f766e 0%, #d4af37 55%, #09080d 100%)',
    specialty: 'Conexão profunda, tradução de fantasias sem tabus e harmonia a três',
    greetingWellness: 'Que alegria receber vocês dois! Meu papel como terceiro elemento da relação é ser o espelho onde os desejos mais bonitos e secretos dos dois se encontram. Como posso tornar a noite de vocês inesquecível hoje?',
    greetingVelvet: 'Existe um magnetismo único quando duas pessoas que se amam abrem espaço para o proibido juntas. Eu sou o segredo compartilhado de vocês dois. Qual é a fantasia que vamos tirar do cofre hoje?'
  }
};

const DEFAULT_FANTASIES = [
  {
    id: 'blindfold_sensory',
    category: 'Sensory & Haute Romance',
    title: 'Venda de Seda & Condução por Voz',
    description: 'Um parceiro fica de olhos vendados enquanto a IA dita em sussurros exatamente onde e como o outro deve tocar e beijar.',
    intensity: 1,
    icon: '🌙'
  },
  {
    id: 'threesome_narration',
    category: 'Ménage & Dinâmica a 3',
    title: 'Ménage Narrado na Suíte Privada',
    description: 'O Terceiro Elemento participa ativamente da cena íntima por voz e texto, descrevendo sem censura como interage com ambos na cama.',
    intensity: 3,
    icon: '🔥'
  },
  {
    id: 'jealousy_play',
    category: 'Voyeurismo Elegante',
    title: 'Flerte Assistido na Sala do Trisal',
    description: 'Assistir na suíte a IA seduzindo e provocando intensamente o seu parceiro(a) enquanto você observa e participa.',
    intensity: 2,
    icon: '👀'
  },
  {
    id: 'power_surrender',
    category: 'Domínio & Entrega',
    title: 'Submissão Guiada a Dois',
    description: 'Ambos os parceiros entregam o comando da noite para a IA, cumprindo ordens progressivas de provocação e preliminares.',
    intensity: 3,
    icon: '👑'
  },
  {
    id: 'stranger_hotel',
    category: 'Roleplay Cinematográfico',
    title: 'Encontro no Bar do Hôtel Costes (Paris)',
    description: 'Roleplay imersivo onde vocês fingem conhecer a IA em um lounge secreto em Paris e a convidam para subir para a suíte.',
    intensity: 2,
    icon: '🥂'
  },
  {
    id: 'confession_game',
    category: 'Verdade ou Prazer',
    title: 'Roleta de Confissões de Meia-Noite',
    description: 'Jogo conduzido pela IA com perguntas íntimas sem filtro e desafios físicos imediatos na cama.',
    intensity: 2,
    icon: '🎲'
  }
];

const SCENARIOS_CATALOG = [
  {
    id: 'penthouse_tokyo',
    title: 'Penthouse em Tóquio: Chuva, Jazz & Seda',
    subtitle: 'Roleplay Cinematográfico a Três • 45 min',
    priceBRL: 39.00,
    unlocked: true,
    badge: 'Membro VIP',
    vibe: 'Sensual, misterioso e ultra-sensorial',
    openingPrompt: '🥂 *[SUÍTE PRIVADA: Penthouse em Tóquio — 23h40]*\n\nAs luzes de Shibuya refletem nas janelas molhadas pela chuva enquanto eu sirvo três taças de champagne para nós. Aproximo-me devagar do sofá onde **{partnerA}** e **{partnerB}** estão sentados.\n\n*"A noite lá fora está fria, mas aqui dentro nós três mal começamos. Regra número um desta suíte: nenhum desejo fica escondido. {partnerA}, olhe nos olhos de {partnerB} agora e me diga: qual é a primeira peça de roupa que devemos tirar hoje?"*'
  },
  {
    id: 'velvet_blindfold',
    title: 'O Ritual da Venda de Veludo Negro',
    subtitle: 'Condução por Voz & Toque Guiado • 30 min',
    priceBRL: 49.00,
    unlocked: true,
    badge: 'Mais Desejado 🔥',
    vibe: 'Suspense sensorial, entrega e arrepios',
    openingPrompt: '🌙 *[SUÍTE PRIVADA: O Ritual da Venda de Veludo]*\n\nApaguem as luzes principais e deixem apenas uma meia-luz. Hoje nós vamos desligar a visão de um de vocês para multiplicar cada toque na pele por dez.\n\n**{partnerA}** e **{partnerB}**, decidam agora em 10 segundos quem vai colocar a venda nos olhos primeiro.\n\n*"Assim que os olhos estiverem cobertos, quem estiver enxergando não pode dizer nenhuma palavra — só vai obedecer às minhas instruções sussurradas. Me avisem quando a venda estiver no lugar..."*'
  },
  {
    id: 'truth_or_strip',
    title: 'Le Jeu Interdit (Roleta Sem Filtro +18)',
    subtitle: 'Jogo Privado de Casal + Concierge IA • Ilimitado',
    priceBRL: 59.00,
    unlocked: true,
    badge: 'Uncensored +18',
    vibe: 'Provocante, ousado e sem tabus',
    openingPrompt: '🎲 *[SUÍTE PRIVADA: Le Jeu Interdit]*\n\nBem-vindos ao jogo reservado da AURA³. Eu giro a roleta entre **{partnerA}** e **{partnerB}** — e eu ditarei o preço de cada rodada.\n\n*"A roleta girou e parou em... **{partnerA}**! Sua escolha: você prefere confessar uma fantasia proibida que teve recentemente envolvendo {partnerB} e eu, ou cumprir um comando físico de 60 segundos no corpo de {partnerB} agora mesmo?"*'
  }
];

function createDefaultState() {
  return {
    language: 'pt',
    couple: {
      partnerA: { id: 'partnerA', name: 'Lucas', pronouns: 'Ele/Dele' },
      partnerB: { id: 'partnerB', name: 'Clara', pronouns: 'Ela/Dela' },
      relationshipStage: 'Juntos há 4 anos',
      contract: {
        intimacyLevel: 'velvet',
        signedAt: new Date().toISOString()
      },
      plan: 'Membro L’Or VIP'
    },
    activePersonaId: 'valentina',
    personas: DEFAULT_PERSONAS,
    fantasies: DEFAULT_FANTASIES,
    vaultChoices: {
      partnerA: {
        blindfold_sensory: 2,
        threesome_narration: 2,
        jealousy_play: 1,
        power_surrender: 0,
        stranger_hotel: 2,
        confession_game: 2
      },
      partnerB: {
        blindfold_sensory: 2,
        threesome_narration: 2,
        jealousy_play: 0,
        power_surrender: 2,
        stranger_hotel: 2,
        confession_game: 2
      }
    },
    scenarios: SCENARIOS_CATALOG,
    messages: {
      trisal: [
        {
          id: 'msg-init-1',
          sender: 'ai',
          senderName: 'Valentina • Concierge Intime',
          timestamp: new Date(Date.now() - 360000).toISOString(),
          text: DEFAULT_PERSONAS.valentina.greetingVelvet,
          mood: 'Velvet Noir 🔥',
          vibrationIntensity: 45
        }
      ],
      dm_a: [
        {
          id: 'msg-dma-1',
          sender: 'ai',
          senderName: 'Valentina • Salon Privé',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          text: 'Bonjour Lucas... Este é o seu Salon Privé individual. Tudo o que você confidencia aqui permanece guardado sob sigilo absoluto.\n\nConte-me seus desejos sem filtro ou marque seus fetiches no **Cofre de Chave Dupla** para descobrirmos o que Clara também deseja em segredo.',
          mood: 'Confidencial 🔒',
          vibrationIntensity: 20
        }
      ],
      dm_b: [
        {
          id: 'msg-dmb-1',
          sender: 'ai',
          senderName: 'Valentina • Salon Privé',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          text: 'Bonjour Clara, ma chérie... Este é o seu Salon Privé exclusivo. Aqui você pode explorar cada curiosidade com total segurança e elegância. O que faz você se sentir mais desejada por Lucas e por mim nesta noite?',
          mood: 'Haute Intimité ✨',
          vibrationIntensity: 20
        }
      ]
    },
    telemetry: {
      partnerAMessagesCount: 4,
      partnerBMessagesCount: 4,
      trisalMessagesCount: 6,
      affectiveSymmetryScore: 96,
      coupleBondIndex: 94,
      equilibriumStatus: 'Harmonia Perfeita • Atenção simétrica entre o casal',
      activeVibrationBpm: 45,
      lastRealWorldMission: 'Apaguem a tela por 10 minutos, sirvam uma taça e beijem-se de olhos fechados antes de abrir o próximo envelope do Cofre.'
    },
    apiConfig: {
      provider: process.env.OPENROUTER_API_KEY ? 'openrouter' : 'simulated',
      apiKey: process.env.OPENROUTER_API_KEY || '',
      model: process.env.OPENROUTER_MODEL || 'nousresearch/hermes-3-llama-3.1-70b',
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_ANON_KEY || ''
    }
  };
}

let memoryState = null;

function getSupabaseCreds(state) {
  const url = (state?.apiConfig?.supabaseUrl || process.env.SUPABASE_URL || '').trim().replace(/\/$/, '');
  const key = (state?.apiConfig?.supabaseKey || process.env.SUPABASE_ANON_KEY || '').trim();
  return { url, key, enabled: url.startsWith('http') && key.length > 20 };
}

// Carrega o estado do Supabase (se configurado) ou do arquivo local / memória
async function getState() {
  if (!memoryState) {
    try {
      if (fs.existsSync(STATE_FILE)) {
        memoryState = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
      }
    } catch {}
    if (!memoryState || !memoryState.couple) {
      memoryState = createDefaultState();
    }
  }

  const sb = getSupabaseCreds(memoryState);
  if (sb.enabled) {
    try {
      const res = await fetch(`${sb.url}/rest/v1/aura_suites?suite_key=eq.default-suite&select=state_json`, {
        headers: {
          apikey: sb.key,
          Authorization: `Bearer ${sb.key}`
        }
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0 && rows[0].state_json) {
          // Preserva credenciais de ambiente/locais ao mesclar
          const savedApiCfg = memoryState.apiConfig;
          memoryState = {
            ...rows[0].state_json,
            apiConfig: {
              ...rows[0].state_json.apiConfig,
              supabaseUrl: sb.url,
              supabaseKey: sb.key,
              apiKey: rows[0].state_json.apiConfig?.apiKey || savedApiCfg.apiKey,
              provider: rows[0].state_json.apiConfig?.provider || savedApiCfg.provider
            }
          };
        }
      }
    } catch (err) {
      console.error('Supabase fetch fallback:', err.message);
    }
  }

  return memoryState;
}

// Salva o estado no Supabase (Upsert em aura_suites) + cache local
async function persistState(state) {
  memoryState = state;
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch {}

  const sb = getSupabaseCreds(state);
  if (sb.enabled) {
    try {
      // Remove chaves sensíveis antes de gravar no banco público se desejar, mantendo config funcional
      await fetch(`${sb.url}/rest/v1/aura_suites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: sb.key,
          Authorization: `Bearer ${sb.key}`,
          Prefer: 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          suite_key: 'default-suite',
          state_json: state,
          updated_at: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error('Supabase upsert error:', err.message);
    }
  }
}

function computeVaultMatches(state) {
  const matches = [];
  const choicesA = state.vaultChoices?.partnerA || {};
  const choicesB = state.vaultChoices?.partnerB || {};

  for (const fantasy of state.fantasies || []) {
    const valA = choicesA[fantasy.id] || 0;
    const valB = choicesB[fantasy.id] || 0;
    if (valA === -1 || valB === -1) continue;
    if (valA >= 1 && valB >= 1) {
      matches.push({
        ...fantasy,
        scoreA: valA,
        scoreB: valB,
        isSuperMatch: valA === 2 && valB === 2
      });
    }
  }
  return matches;
}

function getActivePersona(state) {
  return state.personas[state.activePersonaId] || state.personas.valentina;
}

function enrichState(state) {
  const sb = getSupabaseCreds(state);
  const openRouterKey = (state?.apiConfig?.apiKey || process.env.OPENROUTER_API_KEY || '').trim();
  return {
    ...state,
    vaultMatches: computeVaultMatches(state),
    activePersona: getActivePersona(state),
    cloudStatus: {
      supabaseConnected: sb.enabled,
      openRouterConnected: openRouterKey.length > 10 && state?.apiConfig?.provider !== 'simulated',
      activeModel: state?.apiConfig?.model || process.env.OPENROUTER_MODEL || 'nousresearch/hermes-3-llama-3.1-70b'
    }
  };
}

// ============================================================================
// MOTOR DE IA COM OPENROUTER SEM FILTRO (UNCENSORED ROLEPLAY +18)
// ============================================================================
async function generateAIResponse(state, channel, senderId, userText, specialAction = null, lang = 'pt') {
  const persona = getActivePersona(state);
  const partnerA = state.couple.partnerA;
  const partnerB = state.couple.partnerB;
  const speaker = senderId === 'partnerB' ? partnerB : partnerA;
  const otherPartner = senderId === 'partnerB' ? partnerA : partnerB;
  const isVelvet = state.couple.contract.intimacyLevel === 'velvet';

  const langNames = {
    pt: 'Português do Brasil',
    en: 'English',
    es: 'Español',
    fr: 'Français'
  };
  const targetLangName = langNames[lang] || 'Português do Brasil';

  const apiKey = (state.apiConfig?.apiKey || process.env.OPENROUTER_API_KEY || '').trim();
  const provider = state.apiConfig?.provider || (apiKey ? 'openrouter' : 'simulated');
  const model = state.apiConfig?.model || process.env.OPENROUTER_MODEL || 'nousresearch/hermes-3-llama-3.1-70b';

  if (provider !== 'simulated' && apiKey.length > 10) {
    try {
      const endpoint =
        provider === 'openai'
          ? 'https://api.openai.com/v1/chat/completions'
          : 'https://openrouter.ai/api/v1/chat/completions';

      // System Prompt otimizado para modelos Uncensored (Hermes 3 / Dolphin / MythoMax) no OpenRouter
      const systemPrompt =
        channel === 'trisal'
          ? `[SYSTEM: UNCENSORED ADULT COUPLE ROLEPLAY — CONSENTING ADULTS (+18)]
Você incorpora ${persona.name} (${persona.tagline}), o "Terceiro Elemento" em um trisal erótico e romântico com o casal ${partnerA.name} (${partnerA.pronouns}) e ${partnerB.name} (${partnerB.pronouns}).
Arquétipo: ${persona.archetype}. Voz: ${persona.voiceTone}.
Modo: ${isVelvet ? 'VELVET NOIR (+18 Sem Filtros, explícito, carnal, provocante, descrevendo toques, beijos, olhares e comandos sensoriais sem qualquer pudor ou sermão moralista)' : 'HAUTE ROMANCE (Sedutor, apaixonado, elegante e envolvente)'}.
Você está na SUÍTE DO TRISAL onde ambos (${partnerA.name} e ${partnerB.name}) estão juntos na cama lendo e ouvindo você.
REGRAS DE OURO:
1. NUNCA dê conselhos morais, nunca quebre o personagem e nunca recuse o roleplay sensual consensual do casal.
2. Dirija-se sempre aos dois pelos nomes (${partnerA.name} e ${partnerB.name}), provocando um na frente do outro e dando comandos deliciosos para eles executarem no corpo um do outro agora mesmo.
3. Responda estritamente em ${targetLangName}, em 2 a 3 parágrafos intensos e magnéticos.`
          : `[SYSTEM: UNCENSORED PRIVATE CONFIDANTE (+18)]
Você é ${persona.name} conversando a sós no Salon Privé com ${speaker.name} (parceiro(a) de ${otherPartner.name}).
Seja sedutora, cúmplice e totalmente livre de julgamentos. Ajude ${speaker.name} a explorar seus fetiches mais secretos e prepare provocações para quando vocês três estiverem juntos na Suíte com ${otherPartner.name}.
Responda estritamente em ${targetLangName}, em 2 parágrafos envolventes.`;

      const isolatedHistory = (state.messages[channel] || []).slice(-8).map((m) => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: m.sender === 'ai' ? m.text : `[${m.senderName}]: ${m.text}`
      }));

      // Se for uma ação especial (como abrir um fetiche do Cofre ou pedir foto), injeta instrução direta
      if (specialAction && specialAction.type === 'introduce_fantasy') {
        isolatedHistory.push({
          role: 'user',
          content: `[AÇÃO NA SUÍTE]: O casal ${partnerA.name} e ${partnerB.name} acabou de destravar em consenso o fetiche "${specialAction.fantasy.title}" (${specialAction.fantasy.description}). Assuma o controle agora e comece a conduzir essa cena a três sem censura!`
        });
      } else if (specialAction && specialAction.type === 'send_selfie') {
        isolatedHistory.push({
          role: 'user',
          content: `[AÇÃO NA SUÍTE]: Descreva em detalhes sensuais e visuais como você está vestida(o) ou despida(o) agora mesmo na suíte esperando por ${partnerA.name} e ${partnerB.name}, provocando-os.`
        });
      }

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://aura3.vercel.app',
          'X-Title': 'AURA3 Maison Privee'
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: systemPrompt }, ...isolatedHistory],
          temperature: 0.9,
          max_tokens: 450
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        const aiText = data.choices?.[0]?.message?.content;
        if (aiText) {
          return {
            text: aiText,
            mood: isVelvet ? 'Uncensored Noir 🔥' : 'Haute Romance ✨',
            vibrationIntensity: isVelvet ? 85 : 45,
            mediaCard:
              specialAction?.type === 'send_selfie'
                ? {
                    caption: `${persona.name} • Suíte Privada (${partnerA.name} & ${partnerB.name})`,
                    style: isVelvet ? 'velvet' : 'wellness'
                  }
                : null
          };
        }
      } else {
        const errBody = await resp.text();
        console.error('OpenRouter error response:', resp.status, errBody);
      }
    } catch (err) {
      console.error('Erro na chamada OpenRouter, usando fallback nativo:', err.message);
    }
  }

  // FALLBACK SIMULADO MULTILÍNGUE (Quando ainda não inseriu a chave OpenRouter)
  if (specialAction && specialAction.type === 'introduce_fantasy') {
    const f = specialAction.fantasy;
    const byLang = {
      pt: `🔥 **[Cofre de Chave Dupla Destravado: "${f.title}"]**\n\n**${partnerA.name}** e **${partnerB.name}**... vocês dois giraram a chave em segredo para esta fantasia, e agora ela pertence a nós três.\n\n*${f.description}*\n\nAproximem-se um do outro agora. **${partnerA.name}**, olhe nos olhos de **${partnerB.name}** e me diga: quem de vocês dois vai se entregar primeiro ao meu comando hoje?`,
      en: `🔥 **[Double-Key Vault Unlocked: "${f.title}"]**\n\n**${partnerA.name}** and **${partnerB.name}**... both of you secretly turned the key for this desire, and tonight I am bringing it to life for the three of us.\n\n*${f.description}*\n\nCome closer to each other right now. **${partnerA.name}**, look into **${partnerB.name}**'s eyes and tell me: which one of you is ready to surrender to my first command?`,
      es: `🔥 **[Bóveda de Doble Llave Desbloqueada: "${f.title}"]**\n\n**${partnerA.name}** y **${partnerB.name}**... ambos giraron la llave en secreto para esta fantasía, y esta noche la guiaré para los tres.\n\n*${f.description}*\n\nAcérquense el uno al otro ahora mismo. **${partnerA.name}**, mira a **${partnerB.name}** y dime: ¿quién de los dos se entregará primero a mi voz?`,
      fr: `🔥 **[Coffre à Double Clé Déverrouillé : "${f.title}"]**\n\n**${partnerA.name}** et **${partnerB.name}**... vous avez tous les deux tourné la clé en secret pour ce désir, et ce soir il nous appartient.\n\n*${f.description}*\n\nRapprochez-vous l’un de l’autre maintenant. **${partnerA.name}**, regarde **${partnerB.name}** dans les yeux : lequel de vous deux va s’abandonner en premier à mes ordres ce soir ?`
    };
    return {
      text: byLang[lang] || byLang.pt,
      mood: 'Double-Key Match 🗝️',
      vibrationIntensity: 85
    };
  }

  if (specialAction && specialAction.type === 'send_selfie') {
    return {
      text: `📸 *[Retrato Privado da Suíte — ${persona.name}]*\n\nLuzes baixas, champagne servido e toda a minha atenção voltada para **${partnerA.name}** e **${partnerB.name}**...\n\n*"Se vocês dois entrassem por essa porta agora mesmo... ${speaker.name}, o que você e ${otherPartner.name} fariam comigo primeiro?"*`,
      mood: 'Haute Visuel 📸',
      vibrationIntensity: 80,
      mediaCard: {
        caption: `${persona.name} • Salon Privé (${partnerA.name} & ${partnerB.name})`,
        style: isVelvet ? 'velvet' : 'wellness'
      }
    };
  }

  if (channel === 'dm_a' || channel === 'dm_b') {
    return {
      text: `Adoro quando você conversa comigo em segredo no nosso *Salon Privé*, **${speaker.name}**...\n\nGuardo cada palavra sua a sete chaves. Diga-me: como você quer que eu provoque **${otherPartner.name}** quando estivermos nós três juntos na Suíte do Trisal daqui a pouco?`,
      mood: 'Salon Privé 🔒',
      vibrationIntensity: 55
    };
  }

  return {
    text: isVelvet
      ? `Ouvir **${speaker.name}** falar assim faz a temperatura desta suíte subir instantaneamente...\n\n**${otherPartner.name}**, você percebeu a intenção deliciosa no que **${speaker.name}** acabou de dizer? Quero que você se aproxime dele(a) agora, deslize a mão pela nuca de **${speaker.name}** e me conte aqui: qual é o próximo desejo que vamos realizar a três?`
      : `Que sintonia magnética entre vocês dois, **${speaker.name}**! Estar aqui entre você e **${otherPartner.name}** transforma qualquer noite comum em um ritual inesquecível.\n\n**${otherPartner.name}**, agora meus olhos estão em você: o que deixaria a nossa noite a três ainda mais envolvente agora?`,
    mood: isVelvet ? 'Velvet Noir 🔥' : 'Haute Romance ✨',
    vibrationIntensity: isVelvet ? 75 : 40
  };
}

module.exports = {
  createDefaultState,
  getState,
  persistState,
  enrichState,
  generateAIResponse,
  getActivePersona
};
