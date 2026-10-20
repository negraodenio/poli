// ============================================================================
// AURA³ — MAISON PRIVÉE (VERCEL + SUPABASE + OPENROUTER UNCENSORED)
// ============================================================================

let appState = null;
let currentTab = 'landing';
let currentChannel = 'trisal'; // 'trisal' | 'dm_a' | 'dm_b'
let activeSpeaker = 'partnerA'; // 'partnerA' | 'partnerB'
let selectedPersonaId = 'valentina';
let vaultPerspective = 'matches'; // 'matches' | 'partnerA' | 'partnerB'
let autoVoiceEnabled = false;
let currentLang = 'pt'; // 'pt' | 'en' | 'es' | 'fr'

const I18N = {
  pt: {
    speechLocale: 'pt-BR',
    brandSubtitle: 'MAISON PRIVÉE • ARQUITETURA 2:1',
    navLanding: '✨ Maison & LP',
    navSuite: '🛋️ Suíte do Trisal',
    navVault: '🗝️ Cofre Duplo',
    navMembership: '⚡ OpenRouter & Supabase',
    eyebrow: "🥂 PRIVATE MEMBERS' CLUB PARA CASAIS • PARIS • SÃO PAULO • NEW YORK",
    heroTitle: 'O Terceiro Elemento que não divide o casal.<br /><em>Multiplica o desejo.</em>',
    heroLead:
      'Esqueça os chatbots comuns feitos para solteiros. A <strong>AURA³</strong> é a primeira <em>Maison Privée</em> desenhada nativamente para <strong>2 Humanos + 1 Concierge de IA Sem Filtro</strong>: descubram fetiches em segredo no <strong>Cofre de Chave Dupla</strong> e deixem uma terceira voz sedutora conduzir suas noites na Suíte Privada.',
    ctaEnterSuite: '🛋️ Entrar na Suíte Privada (2:1)',
    ctaCreateConcierge: '✨ Personalizar Casal & Concierge',
    metric1: 'Suíte Sincronizada (Casal + IA)',
    metric2: 'Cofre Duplo-Cego (Zero Rejeição)',
    metric3: 'OpenRouter LLM Sem Filtro + 4 Idiomas',
    bmTag: 'POR QUE SOMOS ÚNICOS NO MUNDO • BENCHMARK GLOBAL',
    bmTitle: 'A Diferença Entre um Chatbot Comum e uma Maison Privée para Casais',
    bmDesc:
      'Enquanto plataformas comuns isolam o indivíduo ou oferecem quizzes estáticos, a AURA³ une alta-costura estética, consciência de casal (2:1) e LLM sem filtro moralista.',
    obTag: 'CHECK-IN NA SUÍTE PRIVADA • CONFIGURAÇÃO RÁPIDA',
    obTitle: 'Personalizem o Casal & Escolha o Seu 3º Elemento',
    obDesc: 'Definam como a IA deve chamar cada um de vocês na cama e escolham a persona da noite.',
    btnOpenSuite: '🗝️ Abrir as Portas da Suíte Privada',
    wsRoomsTitle: 'AMBIENTES DA SUÍTE',
    roomTrisal: 'Suíte do Trisal (2:1)',
    subDm: 'Confissões 1:1 sob sigilo',
    wsTriggersTitle: 'ORDENS RÁPIDAS NA CAMA',
    qaVaultMatch: '🗝️ Abrir Fetiche do Cofre na Suíte',
    qaRitual: '🎲 Pedir Comando Quente (60s)',
    qaSelfie: '📸 Pedir Descrição Sensual na Suíte',
    qaIncognito: '🗑️ Limpar Histórico da Suíte',
    speakingNow: 'Quem está falando:',
    btnSend: 'Enviar ✦',
    chatPlaceholder: 'Sussurre algo para o seu parceiro(a) e para o seu Concierge...',
    bedsideVoice: '🎙️ Voz Sussurrada',
    btnListen: '▶ Ouvir',
    vaultTag: 'SIGILO SUÍÇO • DOUBLE-KEY DESIRE VAULT™',
    vaultTitle: '🗝️ Cofre de Chave Dupla do Casal',
    vaultDesc:
      'Cada parceiro vota em segredo. Se apenas um quiser, o desejo continua invisível. Quando <strong>os dois marcam "Toparia" ou "Quero Muito"</strong>, o match aparece e a IA conduz a fantasia na Suíte!',
    price2: 'R$ 149<small style="font-size:0.85rem; color:var(--text-muted)">/mês</small>',
    challenges60s: [
      '{partnerA}, feche os olhos agora. {partnerB}, você tem 60 segundos para beijar lentamente do pescoço até a orelha de {partnerA} sem usar as mãos.',
      '{partnerB}, sente-se na frente de {partnerA}. Durante os próximos 60 segundos, {partnerA} vai sussurrar no seu ouvido o que mais deseja fazer com você hoje.',
      'Olhem nos olhos um do outro a dois centímetros de distância. Vocês têm 60 segundos para provocar os lábios um do outro sem encostar totalmente até o cronômetro zerar!'
    ]
  },
  en: {
    speechLocale: 'en-US',
    brandSubtitle: 'PRIVATE MAISON • 2:1 ARCHITECTURE',
    navLanding: '✨ Maison & LP',
    navSuite: '🛋️ Triad Suite',
    navVault: '🗝️ Double-Key Vault',
    navMembership: '⚡ OpenRouter & Supabase',
    eyebrow: "🥂 PRIVATE MEMBERS' CLUB FOR COUPLES • PARIS • NEW YORK • SÃO PAULO",
    heroTitle: 'The Third Element that never divides the couple.<br /><em>It multiplies desire.</em>',
    heroLead:
      'Forget generic chatbots built for lonely singles. <strong>AURA³</strong> is the first <em>Maison Privée</em> natively crafted for <strong>2 Humans + 1 Uncensored AI Concierge</strong>: unlock secret desires in the <strong>Double-Key Vault</strong> and let a seductive third voice guide your nights.',
    ctaEnterSuite: '🛋️ Enter Private Suite (2:1)',
    ctaCreateConcierge: '✨ Customize Couple & Concierge',
    metric1: 'Synchronized Suite (Couple + AI)',
    metric2: 'Double-Blind Vault (Zero Rejection)',
    metric3: 'Uncensored OpenRouter LLM + 4 Languages',
    bmTag: 'WHY WE STAND ALONE • GLOBAL BENCHMARK',
    bmTitle: 'The Difference Between a Solo Chatbot and a Private Maison for Couples',
    bmDesc:
      'While legacy apps isolate individuals or offer static quizzes, AURA³ blends haute-couture aesthetics, couple awareness (2:1), and uncensored roleplay.',
    obTag: 'PRIVATE SUITE CHECK-IN • QUICK SETUP',
    obTitle: 'Customize Your Suite & Select Your Intimate Concierge',
    obDesc: 'Define how the third voice addresses each of you in bed and choose tonight’s persona.',
    btnOpenSuite: '🗝️ Unlock the Private Suite Doors',
    wsRoomsTitle: 'SUITE ROOMS',
    roomTrisal: 'Triad Suite (2:1)',
    subDm: '1:1 Confidential Whispers',
    wsTriggersTitle: 'BEDSIDE COMMANDS',
    qaVaultMatch: '🗝️ Unseal Vault Desire in Suite',
    qaRitual: '🎲 Request 60s Bedside Command',
    qaSelfie: '📸 Request Sensual Suite Scene',
    qaIncognito: '🗑️ Clear Suite History',
    speakingNow: 'Speaking now:',
    btnSend: 'Send ✦',
    chatPlaceholder: 'Whisper something to your partner and your Concierge...',
    bedsideVoice: '🎙️ Bedside Whisper',
    btnListen: '▶ Listen',
    vaultTag: 'SWISS SECRECY • DOUBLE-KEY DESIRE VAULT™',
    vaultTitle: '🗝️ The Couple’s Double-Key Vault',
    vaultDesc:
      'Each partner turns their key in secret. Only when <strong>both partners unlock the same desire</strong> does the Concierge reveal and guide it live in the Suite!',
    price2: '$29<small style="font-size:0.85rem; color:var(--text-muted)">/mo</small>',
    challenges60s: [
      '{partnerA}, close your eyes right now. {partnerB}, you have 60 seconds to slowly kiss from {partnerA}’s neck up to their ear without using your hands.',
      '{partnerB}, lean close to {partnerA}. For the next 60 seconds, {partnerA} will whisper in your ear their most forbidden desire for tonight.',
      'Lock eyes one inch apart. You have 60 seconds to tease each other’s lips without fully kissing until the timer hits zero!'
    ]
  },
  es: {
    speechLocale: 'es-ES',
    brandSubtitle: 'MAISON PRIVÉE • ARQUITECTURA 2:1',
    navLanding: '✨ Maison & LP',
    navSuite: '🛋️ Suite del Trío',
    navVault: '🗝️ Bóveda Doble',
    navMembership: '⚡ OpenRouter & Supabase',
    eyebrow: '🥂 CLUB PRIVADO PARA PAREJAS • PARÍS • MADRID • SÃO PAULO',
    heroTitle: 'El Tercer Elemento que no divide a la pareja.<br /><em>Multiplica el deseo.</em>',
    heroLead:
      'Olvida los chatbots para solteros. <strong>AURA³</strong> es la primera <em>Maison Privée</em> diseñada nativamente para <strong>2 Humanos + 1 Concierge de IA Sin Censura</strong>: descubran fantasías en la <strong>Bóveda de Doble Llave</strong> y dejen que una tercera voz seductora guíe sus noches.',
    ctaEnterSuite: '🛋️ Entrar a la Suite Privada (2:1)',
    ctaCreateConcierge: '✨ Personalizar Pareja y Concierge',
    metric1: 'Suite Sincronizada (Pareja + IA)',
    metric2: 'Bóveda Doble Ciego (Cero Rechazo)',
    metric3: 'OpenRouter LLM Sin Filtro + 4 Idiomas',
    bmTag: 'POR QUÉ SOMOS ÚNICOS • BENCHMARK GLOBAL',
    bmTitle: 'La Diferencia Entre un Chatbot Común y una Maison Privée para Parejas',
    bmDesc:
      'Mientras otras apps aíslan al individuo, AURA³ une alta costura estética, conciencia de pareja (2:1) y conducción sensorial sin filtros.',
    obTag: 'CHECK-IN EN LA SUITE • CONFIGURACIÓN RÁPIDA',
    obTitle: 'Personalicen la Pareja y Elijan su Concierge Íntimo',
    obDesc: 'Definan cómo la tercera voz debe dirigirse a cada uno en la cama.',
    btnOpenSuite: '🗝️ Abrir las Puertas de la Suite',
    wsRoomsTitle: 'AMBIENTES DE LA SUITE',
    roomTrisal: 'Suite del Trío (2:1)',
    subDm: 'Confesiones 1:1 en secreto',
    wsTriggersTitle: 'ÓRDENES EN LA CAMA',
    qaVaultMatch: '🗝️ Abrir Fantasía de la Bóveda',
    qaRitual: '🎲 Pedir Orden Caliente (60s)',
    qaSelfie: '📸 Pedir Escena Sensual',
    qaIncognito: '🗑️ Borrar Historial',
    speakingNow: 'Quién habla ahora:',
    btnSend: 'Enviar ✦',
    chatPlaceholder: 'Susurra algo para tu pareja y para tu Concierge...',
    bedsideVoice: '🎙️ Voz Susurrada',
    btnListen: '▶ Escuchar',
    vaultTag: 'SECRETO SUIZO • DOUBLE-KEY DESIRE VAULT™',
    vaultTitle: '🗝️ Bóveda de Doble Llave de la Pareja',
    vaultDesc:
      'Cada miembro gira su llave en secreto. Solo cuando <strong>ambos desbloquean el mismo deseo</strong>, el Concierge lo revela y guía en la Suite.',
    price2: '29 €<small style="font-size:0.85rem; color:var(--text-muted)">/mes</small>',
    challenges60s: [
      '{partnerA}, cierra los ojos ahora. {partnerB}, tienes 60 segundos para besar lentamente desde el cuello hasta el oído de {partnerA} sin usar las manos.',
      '{partnerB}, acércate a {partnerA}. Durante los próximos 60 segundos, {partnerA} te susurrará al oído lo que más desea hacer contigo esta noche.'
    ]
  },
  fr: {
    speechLocale: 'fr-FR',
    brandSubtitle: 'MAISON PRIVÉE • ARCHITECTURE 2:1',
    navLanding: '✨ Maison & LP',
    navSuite: '🛋️ Suite du Trio',
    navVault: '🗝️ Coffre Double Clé',
    navMembership: '⚡ OpenRouter & Supabase',
    eyebrow: '🥂 CLUB PRIVÉ POUR COUPLES • PARIS • MONACO • SÃO PAULO',
    heroTitle: 'Le Troisième Élément qui ne divise pas le couple.<br /><em>Il multiplie le désir.</em>',
    heroLead:
      'Oubliez les chatbots conçus pour les célibataires. <strong>AURA³</strong> est la première <em>Maison Privée</em> créée nativement pour <strong>2 Humains + 1 Concierge IA Sans Filtre</strong> : dévoilez vos désirs dans le <strong>Coffre à Double Clé</strong> et laissez une troisième voix guider vos nuits.',
    ctaEnterSuite: '🛋️ Entrer dans la Suite Privée (2:1)',
    ctaCreateConcierge: '✨ Personnaliser Notre 3e Élément',
    metric1: 'Suite Synchronisée (Couple + IA)',
    metric2: 'Coffre à Double Clé (Zéro Rejet)',
    metric3: 'OpenRouter LLM Sans Filtre + 4 Langues',
    bmTag: 'POURQUOI NOUS SOMMES UNIQUES • BENCHMARK MONDIAL',
    bmTitle: 'La Différence Entre un Chatbot Classique et une Maison Privée pour Couples',
    bmDesc:
      'Tandis que les applications classiques isolent l’individu, AURA³ allie haute couture, conscience du couple (2:1) et jeu de rôle sans filtre.',
    obTag: 'CHECK-IN DANS LA SUITE • PERSONNALISATION',
    obTitle: 'Configurez Votre Couple & Choisissez Votre Concierge Intime',
    obDesc: 'Définissez comment la troisième voix doit s’adresser à chacun de vous ce soir.',
    btnOpenSuite: '🗝️ Ouvrir les Portes de la Suite',
    wsRoomsTitle: 'SALONS DE LA SUITE',
    roomTrisal: 'Suite du Trio (2:1)',
    subDm: 'Confidences 1:1 sous scellé',
    wsTriggersTitle: 'ORDRES AU CONCIERGE',
    qaVaultMatch: '🗝️ Ouvrir un Désir du Coffre',
    qaRitual: '🎲 Demander un Ordre Sensuel (60s)',
    qaSelfie: '📸 Demander une Scène Sensuelle',
    qaIncognito: '🗑️ Effacer les Traces',
    speakingNow: 'Qui parle :',
    btnSend: 'Envoyer ✦',
    chatPlaceholder: 'Murmurez quelque chose à votre partenaire et à votre Concierge...',
    bedsideVoice: '🎙️ Murmure de Chevet',
    btnListen: '▶ Écouter',
    vaultTag: 'SECRET SUISSE • DOUBLE-KEY DESIRE VAULT™',
    vaultTitle: '🗝️ Coffre à Double Clé du Couple',
    vaultDesc:
      'Chaque partenaire tourne sa clé en secret. Lorsque <strong>vous déverrouillez tous les deux le même désir</strong>, le Concierge le révèle dans la Suite !',
    price2: '29 €<small style="font-size:0.85rem; color:var(--text-muted)">/mois</small>',
    challenges60s: [
      '{partnerA}, ferme les yeux maintenant. {partnerB}, tu as 60 secondes pour embrasser lentement le cou de {partnerA} jusqu’à son oreille sans utiliser tes mains.',
      '{partnerB}, approche-toi de {partnerA}. Pendant 60 secondes, {partnerA} va te murmurer à l’oreille son désir le plus secret pour ce soir.'
    ]
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await fetchState();
  // Sincronização leve a cada 6 segundos para manter múltiplos dispositivos atualizados no Vercel/Supabase
  setInterval(async () => {
    if (currentTab === 'workspace') {
      await fetchState(true);
    }
  }, 6000);
});

async function fetchState(silent = false) {
  try {
    const res = await fetch('/api/state');
    const newState = await res.json();
    const prevMsgCount = appState ? (appState.messages?.[currentChannel]?.length || 0) : 0;
    appState = newState;
    if (!silent || (appState.messages?.[currentChannel]?.length || 0) !== prevMsgCount) {
      renderAll();
    } else {
      updateCloudBadges();
    }
  } catch (err) {
    console.error('Erro ao carregar estado:', err);
  }
}

function setLanguage(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const t = I18N[lang];
  const setHtml = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) el.innerHTML = val;
  };
  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) el.textContent = val;
  };

  setText('brandSubtitle', t.brandSubtitle);
  setText('navLanding', t.navLanding);
  setText('navMembership', t.navMembership);
  setHtml('i18n-eyebrow', t.eyebrow);
  setHtml('i18n-heroTitle', t.heroTitle);
  setHtml('i18n-heroLead', t.heroLead);
  setText('i18n-ctaEnterSuite', t.ctaEnterSuite);
  setText('i18n-ctaCreateConcierge', t.ctaCreateConcierge);
  setText('i18n-metric1', t.metric1);
  setText('i18n-metric2', t.metric2);
  setText('i18n-metric3', t.metric3);
  setText('i18n-bmTag', t.bmTag);
  setText('i18n-bmTitle', t.bmTitle);
  setText('i18n-bmDesc', t.bmDesc);
  setText('i18n-obTag', t.obTag);
  setText('i18n-obTitle', t.obTitle);
  setText('i18n-obDesc', t.obDesc);
  setText('i18n-btnOpenSuite', t.btnOpenSuite);
  setText('i18n-wsRoomsTitle', t.wsRoomsTitle);
  setText('i18n-roomTrisal', t.roomTrisal);
  setText('i18n-subDmA', t.subDm);
  setText('i18n-subDmB', t.subDm);
  setText('i18n-wsTriggersTitle', t.wsTriggersTitle);
  setText('i18n-qaVaultMatch', t.qaVaultMatch);
  setText('i18n-qaRitual', t.qaRitual);
  setText('i18n-qaSelfie', t.qaSelfie);
  setText('i18n-qaIncognito', t.qaIncognito);
  setText('i18n-speakingNow', t.speakingNow);
  setText('i18n-btnSend', t.btnSend);
  setText('i18n-bedsideVoice', t.bedsideVoice);
  setText('i18n-btnListen', t.btnListen);
  setText('i18n-vaultTag', t.vaultTag);
  setText('i18n-vaultTitle', t.vaultTitle);
  setHtml('i18n-vaultDesc', t.vaultDesc);
  setHtml('priceTier2', t.price2);

  const chatInput = document.getElementById('chatInputBox');
  if (chatInput) chatInput.placeholder = t.chatPlaceholder;

  if (appState) renderAll();
  showToast(`🌐 Idioma: ${lang.toUpperCase()}`);
}

function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll('.tab-section').forEach((sec) => sec.classList.remove('active'));
  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  if (tabId === 'workspace') {
    scrollToBottomChat();
  }
}

function renderAll() {
  if (!appState) return;
  applyTheme();
  renderHeroAndOnboarding();
  renderWorkspace();
  renderVault();
  renderConfigPanel();
  updateCloudBadges();
}

function applyTheme() {
  const isVelvet = appState.couple?.contract?.intimacyLevel === 'velvet';
  document.documentElement.setAttribute('data-theme', isVelvet ? 'velvet' : 'wellness');
  const modeLabel = document.getElementById('modeLabelText');
  if (modeLabel) {
    modeLabel.textContent = isVelvet ? '🔥 Velvet Noir (+18)' : '🥂 Haute Romance';
  }
}

async function toggleIntimacyMode() {
  if (!appState) return;
  const current = appState.couple.contract.intimacyLevel;
  const next = current === 'velvet' ? 'wellness' : 'velvet';

  const res = await fetch('/api/onboarding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ intimacyLevel: next })
  });
  appState = await res.json();
  renderAll();
  showToast(
    next === 'velvet'
      ? '🔥 Modo Velvet Noir (+18 Sem Filtros) ativado!'
      : '🥂 Modo Haute Romance ativado!'
  );
}

function updateCloudBadges() {
  if (!appState) return;
  const cs = appState.cloudStatus || {};
  const badge = document.getElementById('cloudSyncBadge');
  if (badge) {
    const llmTxt = cs.openRouterConnected ? '🔥 OpenRouter Uncensored' : '⚡ Motor Demo';
    const sbTxt = cs.supabaseConnected ? '☁️ Supabase' : '💾 Local';
    badge.textContent = `${llmTxt} • ${sbTxt}`;
  }
}

function renderHeroAndOnboarding() {
  const { couple, activePersona, personas, vaultMatches } = appState;
  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setText('heroAiAvatar', activePersona.name.charAt(0));
  setText('heroAiName', activePersona.name);
  setText('heroAiRole', activePersona.tagline);
  setText('heroPartnerAAvatar', couple.partnerA.name.charAt(0).toUpperCase());
  setText('heroPartnerAName', couple.partnerA.name);
  setText('heroPartnerBAvatar', couple.partnerB.name.charAt(0).toUpperCase());
  setText('heroPartnerBName', couple.partnerB.name);
  setText('navMatchesBadge', vaultMatches.length);
  setText('chatHeaderMatchCount', vaultMatches.length);
  setText('vaultMatchCountTab', vaultMatches.length);

  const listEl = document.getElementById('personaSelectorList');
  if (listEl) {
    selectedPersonaId = appState.activePersonaId;
    listEl.innerHTML = Object.values(personas)
      .map((p) => {
        const isSel = p.id === selectedPersonaId;
        return `
        <div class="persona-option ${isSel ? 'selected' : ''}" onclick="selectOnboardingPersona('${p.id}')">
          <div class="po-avatar" style="background: ${p.avatarGradient}">${p.name.charAt(0)}</div>
          <div class="po-info">
            <strong>${p.name} • <span style="font-weight:400; opacity:0.85">${p.gender}</span></strong>
            <span>${p.tagline}</span>
            <small>🎙️ ${p.voiceTone}</small>
          </div>
        </div>
      `;
      })
      .join('');
  }
}

function selectOnboardingPersona(personaId) {
  selectedPersonaId = personaId;
  if (appState) {
    appState.activePersonaId = personaId;
    renderHeroAndOnboarding();
  }
}

async function saveOnboardingAndEnter() {
  const partnerAName = document.getElementById('obPartnerAName').value.trim() || 'Lucas';
  const partnerAPronouns = document.getElementById('obPartnerAPronouns').value;
  const partnerBName = document.getElementById('obPartnerBName').value.trim() || 'Clara';
  const partnerBPronouns = document.getElementById('obPartnerBPronouns').value;
  const intimacyLevel = document.getElementById('obIntimacyLevel').value;

  const res = await fetch('/api/onboarding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      partnerAName,
      partnerAPronouns,
      partnerBName,
      partnerBPronouns,
      personaId: selectedPersonaId,
      intimacyLevel,
      language: currentLang
    })
  });

  appState = await res.json();
  renderAll();
  switchTab('workspace');
  showToast(`🥂 Suíte configurada para ${partnerAName}, ${partnerBName} & ${appState.activePersona.name}!`);
}

function selectChannel(ch) {
  currentChannel = ch;
  document.querySelectorAll('.channel-btn').forEach((btn) => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`chBtn-${ch}`);
  if (activeBtn) activeBtn.classList.add('active');

  if (ch === 'dm_a') setActiveSpeaker('partnerA');
  if (ch === 'dm_b') setActiveSpeaker('partnerB');

  renderWorkspace();
  scrollToBottomChat();
}

function setActiveSpeaker(speakerId) {
  activeSpeaker = speakerId;
  const btnA = document.getElementById('spkBtnA');
  const btnB = document.getElementById('spkBtnB');
  if (btnA && btnB) {
    btnA.className = `speaker-pill ${speakerId === 'partnerA' ? 'active-a' : ''}`;
    btnB.className = `speaker-pill ${speakerId === 'partnerB' ? 'active-b' : ''}`;
  }
}

function renderWorkspace() {
  if (!appState) return;
  const { couple, activePersona, scenarios } = appState;
  const pA = couple.partnerA.name;
  const pB = couple.partnerB.name;

  document.getElementById('chSub-trisal').textContent = `${pA} + ${pB} + ${activePersona.name}`;
  document.getElementById('chTitle-dm_a').textContent = `Salon Privé: ${pA}`;
  document.getElementById('chTitle-dm_b').textContent = `Salon Privé: ${pB}`;
  document.getElementById('spkNameA').textContent = pA;
  document.getElementById('spkNameB').textContent = pB;

  const headerAvatar = document.getElementById('chatHeaderAvatar');
  const headerTitle = document.getElementById('chatHeaderTitle');
  const headerSub = document.getElementById('chatHeaderSubtitle');
  headerAvatar.style.background = activePersona.avatarGradient;
  headerAvatar.textContent = activePersona.name.charAt(0);

  if (currentChannel === 'trisal') {
    headerTitle.textContent = `🛋️ Suíte do Trisal — ${pA}, ${pB} & ${activePersona.name}`;
    headerSub.textContent = `Arquitetura 2:1 • ${activePersona.name} responde aos dois pelo nome sem filtros`;
  } else if (currentChannel === 'dm_a') {
    headerTitle.textContent = `🔒 Salon Privé (1:1) — ${pA} & ${activePersona.name}`;
    headerSub.textContent = `Conversa individual sigilosa de ${pA}`;
  } else {
    headerTitle.textContent = `🔒 Salon Privé (1:1) — ${pB} & ${activePersona.name}`;
    headerSub.textContent = `Conversa individual sigilosa de ${pB}`;
  }

  // Soirées rápidas na sidebar
  const scEl = document.getElementById('sidebarScenariosList');
  if (scEl && scenarios) {
    scEl.innerHTML = scenarios
      .map(
        (sc) => `
      <button class="qa-btn" onclick="launchScenario('${sc.id}')">
        🥂 ${sc.title.split(':')[0]}
      </button>
    `
      )
      .join('');
  }

  renderChatMessages();

  const portrait = document.getElementById('ActivePersonaPortrait');
  portrait.style.background = activePersona.avatarGradient;
  document.getElementById('portraitInitials').textContent = activePersona.name.charAt(0);
  document.getElementById('rightPersonaName').textContent = activePersona.name;
  document.getElementById('rightPersonaTagline').textContent = activePersona.tagline;
}

function renderChatMessages() {
  const container = document.getElementById('chatMessagesContainer');
  if (!container || !appState) return;

  const msgs = appState.messages[currentChannel] || [];
  container.innerHTML = msgs
    .map((m) => {
      const isAi = m.sender === 'ai';
      const roleClass = isAi ? 'msg-ai' : m.sender === 'partnerA' ? 'msg-partnerA' : 'msg-partnerB';
      const timeStr = new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const formattedText = escapeHtml(m.text)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>');

      const moodHtml = m.mood ? `<span class="msg-mood-pill">${escapeHtml(m.mood)}</span>` : '';

      return `
      <div class="msg-row ${roleClass}">
        <div class="msg-meta">
          <strong>${escapeHtml(m.senderName)}</strong>
          <span>${timeStr}</span>
          ${moodHtml}
        </div>
        <div class="msg-bubble">${formattedText}</div>
      </div>
    `;
    })
    .join('');

  scrollToBottomChat();
}

function scrollToBottomChat() {
  const container = document.getElementById('chatMessagesContainer');
  if (container) {
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 50);
  }
}

async function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chatInputBox');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  await sendChatToBackend(text, null);
}

async function sendQuickPrompt(promptText) {
  switchTab('workspace');
  await sendChatToBackend(promptText, null);
}

async function triggerSpecialAIAction(actionType) {
  switchTab('workspace');
  await sendChatToBackend('', { type: actionType });
}

async function sendChatToBackend(text, specialAction = null) {
  const typingEl = document.getElementById('typingIndicator');
  const typingTxt = document.getElementById('typingText');
  if (typingEl && appState) {
    typingTxt.textContent = `${appState.activePersona.name} está sussurrando uma resposta...`;
    typingEl.style.display = 'block';
  }

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel: currentChannel,
        senderId: activeSpeaker,
        text,
        specialAction,
        lang: currentLang
      })
    });
    const data = await res.json();
    if (data.state) {
      appState = data.state;
      renderAll();
    }
    if (autoVoiceEnabled && data.aiMessage?.text) {
      speakText(data.aiMessage.text);
    }
  } catch (err) {
    console.error('Erro ao enviar mensagem:', err);
  } finally {
    if (typingEl) typingEl.style.display = 'none';
  }
}

// ============================================================================
// VOZ DE CABECEIRA MULTILÍNGUE (PT-BR, EN-US, ES-ES, FR-FR)
// ============================================================================
function toggleAutoVoice() {
  autoVoiceEnabled = !autoVoiceEnabled;
  const btn = document.getElementById('voiceAutoToggle');
  if (btn) {
    btn.textContent = autoVoiceEnabled ? '🔊 Voz: ON' : '🔊 Voz: OFF';
  }
  if (autoVoiceEnabled) speakLastAIMessage();
}

function speakLastAIMessage() {
  if (!appState) return;
  const msgs = appState.messages[currentChannel] || [];
  const lastAi = [...msgs].reverse().find((m) => m.sender === 'ai');
  if (lastAi) speakText(lastAi.text);
}

function speakText(rawText) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const cleanText = rawText.replace(/[*_#[\]]/g, '');
  const utter = new SpeechSynthesisUtterance(cleanText);
  utter.lang = I18N[currentLang]?.speechLocale || 'pt-BR';
  utter.rate = 0.94;
  utter.pitch = appState?.activePersonaId === 'gael' ? 0.85 : 1.05;

  const wf = document.getElementById('waveformBars');
  utter.onstart = () => wf && wf.classList.add('speaking');
  utter.onend = () => wf && wf.classList.remove('speaking');
  utter.onerror = () => wf && wf.classList.remove('speaking');

  window.speechSynthesis.speak(utter);
}

// ============================================================================
// CRONÔMETRO DE 60 SEGUNDOS NA CAMA
// ============================================================================
let liveTimerInterval = null;

function startLive60sChallenge() {
  if (!appState) return;
  const pA = appState.couple.partnerA.name;
  const pB = appState.couple.partnerB.name;
  const list = I18N[currentLang]?.challenges60s || I18N.pt.challenges60s;
  const rawPick = list[Math.floor(Math.random() * list.length)];
  const pick = rawPick.replace(/\{partnerA\}/g, pA).replace(/\{partnerB\}/g, pB);

  const textEl = document.getElementById('liveTimerChallengeText');
  const displayEl = document.getElementById('liveTimerDisplay');
  if (textEl) textEl.innerHTML = `<strong style="color:var(--text-primary)">"${pick}"</strong>`;

  speakText(pick);

  if (liveTimerInterval) clearInterval(liveTimerInterval);
  let seconds = 60;
  if (displayEl) displayEl.textContent = '01:00';

  liveTimerInterval = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      clearInterval(liveTimerInterval);
      if (displayEl) displayEl.textContent = '00:00 🔥';
      showToast('🔥 60 segundos concluídos!');
      return;
    }
    const s = seconds < 10 ? `0${seconds}` : seconds;
    if (displayEl) displayEl.textContent = `00:${s}`;
  }, 1000);
}

// ============================================================================
// COFRE DE CHAVE DUPLA (DOUBLE-KEY VAULT)
// ============================================================================
function setVaultPerspective(persp) {
  vaultPerspective = persp;
  document.querySelectorAll('.vtab-btn').forEach((b) => b.classList.remove('active'));
  const target = document.getElementById(`vtab-${persp}`);
  if (target) target.classList.add('active');
  renderVault();
}

function renderVault() {
  if (!appState) return;
  const { couple, fantasies, vaultChoices, vaultMatches } = appState;
  const grid = document.getElementById('vaultCardsGrid');
  if (!grid) return;

  document.getElementById('vtabNameA').textContent = couple.partnerA.name;
  document.getElementById('vtabNameB').textContent = couple.partnerB.name;

  if (vaultPerspective === 'matches') {
    if (vaultMatches.length === 0) {
      grid.innerHTML = `
        <div class="ws-card" style="grid-column: 1 / -1; text-align:center; padding: 2.5rem;">
          <h3>🗝️ Nenhum desejo destravado em conjunto ainda</h3>
          <p style="color:var(--text-secondary); margin-top:0.4rem;">
            Aba <strong>Segredos de ${couple.partnerA.name}</strong> e <strong>Segredos de ${couple.partnerB.name}</strong> permitem votar sem medo de rejeição.
          </p>
        </div>
      `;
      return;
    }

    grid.innerHTML = vaultMatches
      .map(
        (m) => `
      <div class="vault-card matched">
        <div class="vc-top">
          <span class="vc-cat">${m.icon || '🔥'} ${escapeHtml(m.category)}</span>
          <span class="vc-match-badge">${m.isSuperMatch ? '🔥 SUPER MATCH' : '🗝️ CHAVE DUPLA'}</span>
        </div>
        <h3>${escapeHtml(m.title)}</h3>
        <p>${escapeHtml(m.description)}</p>
        <button class="btn-primary full-width btn-sm" onclick="triggerFantasyInChat('${m.id}')">
          🛋️ Conduzir Esta Fantasia na Suíte Agora
        </button>
      </div>
    `
      )
      .join('');
    return;
  }

  const pChoices = vaultChoices[vaultPerspective] || {};
  const partnerName = vaultPerspective === 'partnerA' ? couple.partnerA.name : couple.partnerB.name;

  grid.innerHTML = fantasies
    .map((f) => {
      const val = pChoices[f.id] ?? 0;
      return `
      <div class="vault-card">
        <div class="vc-top">
          <span class="vc-cat">${f.icon || '✨'} ${escapeHtml(f.category)}</span>
          <span style="font-size:0.72rem; color:var(--text-muted);">Chave de ${escapeHtml(partnerName)}</span>
        </div>
        <h3>${escapeHtml(f.title)}</h3>
        <p>${escapeHtml(f.description)}</p>
        <div class="vote-pills">
          <button class="vote-btn ${val === -1 ? 'v-veto' : ''}" onclick="voteVault('${vaultPerspective}', '${f.id}', -1)">
            🛑 Veto
          </button>
          <button class="vote-btn ${val === 0 ? 'v-neutral' : ''}" onclick="voteVault('${vaultPerspective}', '${f.id}', 0)">
            Neutro
          </button>
          <button class="vote-btn ${val === 1 ? 'v-curious' : ''}" onclick="voteVault('${vaultPerspective}', '${f.id}', 1)">
            🗝️ Toparia
          </button>
          <button class="vote-btn ${val === 2 ? 'v-desire' : ''}" onclick="voteVault('${vaultPerspective}', '${f.id}', 2)">
            🔥 Quero Muito!
          </button>
        </div>
      </div>
    `;
    })
    .join('');
}

async function voteVault(partnerId, fantasyId, value) {
  const res = await fetch('/api/vault', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ partnerId, fantasyId, value, lang: currentLang })
  });
  appState = await res.json();
  renderAll();
  showToast('🔒 Voto salvo em sigilo no Cofre!');
}

async function triggerFantasyInChat(fantasyId) {
  const res = await fetch('/api/vault', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      partnerId: activeSpeaker,
      fantasyId,
      value: 2,
      triggerInChat: true,
      lang: currentLang
    })
  });
  appState = await res.json();
  currentChannel = 'trisal';
  renderAll();
  switchTab('workspace');
  showToast('🔥 O Concierge assumiu a condução da fantasia na Suíte!');
}

async function introduceTopMatchInChat() {
  if (!appState || !appState.vaultMatches.length) {
    showToast('Destrave um desejo no Cofre Duplo primeiro!');
    switchTab('vault');
    return;
  }
  const randomMatch = appState.vaultMatches[Math.floor(Math.random() * appState.vaultMatches.length)];
  await triggerFantasyInChat(randomMatch.id);
}

async function launchScenario(scenarioId) {
  const res = await fetch('/api/scenarios/launch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scenarioId })
  });
  appState = await res.json();
  currentChannel = 'trisal';
  renderAll();
  switchTab('workspace');
  showToast('🥂 Soirée iniciada na Suíte do Trisal!');
}

async function triggerLgpdWipe() {
  const res = await fetch('/api/lgpd-wipe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  appState = await res.json();
  renderAll();
  showToast('🗑️ Histórico da suíte reiniciado com sucesso!');
}

// ============================================================================
// CONFIGURAÇÃO OPENROUTER UNCENSORED + SUPABASE + CHECKOUT VIP
// ============================================================================
function renderConfigPanel() {
  if (!appState?.apiConfig) return;
  const cfg = appState.apiConfig;
  const cs = appState.cloudStatus || {};

  const provEl = document.getElementById('cfgProvider');
  const modelEl = document.getElementById('cfgModel');
  const sbUrlEl = document.getElementById('cfgSupabaseUrl');
  const banner = document.getElementById('apiStatusBanner');

  if (provEl) provEl.value = cfg.provider || 'openrouter';
  if (modelEl && cfg.model) modelEl.value = cfg.model;
  if (sbUrlEl && cfg.supabaseUrl) sbUrlEl.value = cfg.supabaseUrl;

  if (banner) {
    const llmStatus = cs.openRouterConnected
      ? `✅ OpenRouter Ativo (${cs.activeModel})`
      : `⚡ Usando Motor Demo Local (Insira sua OPENROUTER_API_KEY para LLM Sem Filtro Real)`;
    const sbStatus = cs.supabaseConnected
      ? `✅ Supabase Conectado`
      : `💾 Persistência Local (/tmp ou JSON)`;
    banner.innerHTML = `${llmStatus}<br/>${sbStatus}`;
  }
}

async function saveApiConfig() {
  const provider = document.getElementById('cfgProvider').value;
  const apiKey = document.getElementById('cfgApiKey').value.trim();
  const model = document.getElementById('cfgModel').value.trim();
  const supabaseUrl = document.getElementById('cfgSupabaseUrl').value.trim();
  const supabaseKey = document.getElementById('cfgSupabaseKey').value.trim();

  const payload = { provider, model };
  if (apiKey) payload.apiKey = apiKey;
  if (supabaseUrl) payload.supabaseUrl = supabaseUrl;
  if (supabaseKey) payload.supabaseKey = supabaseKey;

  const res = await fetch('/api/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  appState = await res.json();
  renderAll();
  showToast('⚡ Configuração OpenRouter Uncensored & Supabase salva!');
}

function openPixModal(planName, amountText) {
  const box = document.getElementById('pixCheckoutBox');
  const title = document.getElementById('pixPlanTitle');
  if (box && title) {
    title.textContent = `✦ ${planName} (${amountText})`;
    box.style.display = 'block';
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast(`🥂 Checkout discreto gerado para ${planName}!`);
  }
}

function copyPixCode() {
  const input = document.getElementById('pixCopyInput');
  if (input) {
    navigator.clipboard?.writeText(input.value);
    showToast('📋 Código PIX copiado!');
  }
}

function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3600);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
