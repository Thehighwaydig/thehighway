// ========== GAME CONTROLLER ==========

let gameState = {
  playerName: '',
  startLevel: 0,
  score: 0,
  lives: 3,
  currentPhase: 0,
  currentLesson: 0,
  phasesData: [],
  practiceCorrect: 0,
  practiceErrors: 0,
  practiceCombo: 0,
  practiceMaxCombo: 0,
  practiceTimer: null,
  practiceTimeLeft: 0,
  practiceGoalMet: false,
  challengeScore: 0,
  challengeCombo: 0,
  challengeTimer: null,
  challengeTimeLeft: 0,
  phaseScore: 0,
  phaseStars: 0
};

// Initialize phases data
function initPhasesData() {
  gameState.phasesData = PHASES.map((p, i) => ({
    id: p.id,
    completed: false,
    stars: 0,
    bestScore: 0,
    unlocked: i === 0
  }));
}

// ===== SCREEN MANAGEMENT =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  if (id === 'screen-ranking') renderRanking();
  if (id === 'screen-map') renderMap();
}

function showMap() {
  renderMap();
  showScreen('screen-map');
}

// ===== NAME / START =====
let selectedStartLevel = 0;
function selectStartLevel(level) {
  selectedStartLevel = level;
  document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.level-btn[data-level="${level}"]`).classList.add('active');
}

function startGame() {
  const name = document.getElementById('player-name-input').value.trim().toUpperCase();
  if (!name) {
    showNotification('⚠ Digite seu nome primeiro!', 'warn');
    return;
  }
  gameState.playerName = name;
  gameState.startLevel = selectedStartLevel;
  gameState.score = 0;
  gameState.lives = 3;

  initPhasesData();

  // Unlock phases based on start level
  if (selectedStartLevel >= 1) {
    for (let i = 0; i < 5; i++) {
      gameState.phasesData[i].unlocked = true;
    }
  }
  if (selectedStartLevel >= 2) {
    for (let i = 0; i < 9; i++) {
      gameState.phasesData[i].unlocked = true;
    }
  }

  updateStatusBar();
  showMap();
  showNotification(`Bem-vindo, ${name}! 🎮`);
}

// ===== MAP =====
function renderMap() {
  document.getElementById('map-player-name').textContent = `MAPA - ${gameState.playerName}`;
  updateStatusBar();

  const map = document.getElementById('phase-map');
  map.innerHTML = '';

  PHASES.forEach((phase, i) => {
    const pd = gameState.phasesData[i];
    const node = document.createElement('div');
    node.className = 'phase-node';

    if (!pd.unlocked) {
      node.classList.add('locked');
      node.innerHTML = `<div class="phase-icon">🔒</div><div class="phase-num">F${phase.id}</div><div class="phase-name">${phase.name}</div>`;
    } else if (pd.completed) {
      node.classList.add('complete');
      if (phase.isBoss) node.classList.add('boss');
      node.innerHTML = `<div class="phase-icon">${phase.icon}</div><div class="phase-num">F${phase.id}</div><div class="phase-name">${phase.name}</div><div class="phase-stars">${'⭐'.repeat(pd.stars)}</div>`;
      node.onclick = () => openPhase(i);
    } else {
      node.classList.add('available');
      if (phase.isBoss) node.classList.add('boss');
      node.innerHTML = `<div class="phase-icon">${phase.icon}</div><div class="phase-num">F${phase.id}</div><div class="phase-name">${phase.name}</div><div class="phase-stars">— JOGAR —</div>`;
      node.onclick = () => openPhase(i);
    }

    map.appendChild(node);
  });
}

function updateStatusBar() {
  const rank = getRank(gameState.score);
  document.getElementById('map-score').textContent = gameState.score;
  document.getElementById('map-rank').textContent = rank.name;
  document.getElementById('map-lives').textContent = '❤'.repeat(gameState.lives) || '💔';
}

// ===== PHASE OPENING =====
function openPhase(phaseIndex) {
  gameState.currentPhase = phaseIndex;
  gameState.currentLesson = 0;
  const phase = PHASES[phaseIndex];

  // If has lessons, show lesson screen first
  if (phase.lessons && phase.lessons.length > 0) {
    startLesson(phaseIndex);
  } else {
    startPractice(phaseIndex);
  }
}

// ===== LESSON =====
function startLesson(phaseIndex) {
  const phase = PHASES[phaseIndex];
  gameState.currentLesson = 0;
  document.getElementById('lesson-title').textContent = `FASE ${phase.id} — ${phase.name.toUpperCase()}`;
  renderLesson();
  showScreen('screen-lesson');
  setProfExpression('teach');
}

function renderLesson() {
  const phase = PHASES[gameState.currentPhase];
  const lesson = phase.lessons[gameState.currentLesson];
  const total = phase.lessons.length;

  // Progress
  const pct = ((gameState.currentLesson + 1) / total) * 100;
  document.getElementById('lesson-progress-fill').style.width = pct + '%';
  document.getElementById('lesson-progress-text').textContent = `${gameState.currentLesson + 1}/${total}`;

  // Speech
  document.getElementById('lesson-speech').innerHTML = lesson.speech;

  // Content
  document.getElementById('lesson-content').innerHTML = lesson.content;

  // Buttons
  document.getElementById('btn-prev-lesson').disabled = gameState.currentLesson === 0;
  const isLast = gameState.currentLesson === total - 1;
  const nextBtn = document.getElementById('btn-next-lesson');
  nextBtn.textContent = isLast ? '▶ PRATICAR!' : 'PRÓXIMO ▶';

  // Update cert name if on last phase
  const certName = document.getElementById('cert-name');
  if (certName) certName.textContent = gameState.playerName || 'ALUNO';

  // Animate
  const content = document.getElementById('lesson-content');
  content.style.animation = 'none';
  requestAnimationFrame(() => { content.style.animation = 'bubblePop 0.3s ease-out'; });
}

function prevLesson() {
  if (gameState.currentLesson > 0) {
    gameState.currentLesson--;
    renderLesson();
  }
}

function nextLesson() {
  const phase = PHASES[gameState.currentPhase];
  if (gameState.currentLesson < phase.lessons.length - 1) {
    gameState.currentLesson++;
    renderLesson();
  } else {
    // Go to practice
    startPractice(gameState.currentPhase);
  }
}

// ===== PRACTICE =====
let practiceKeyHandler = null;

function startPractice(phaseIndex) {
  const phase = PHASES[phaseIndex];
  gameState.currentPhase = phaseIndex;
  gameState.practiceCorrect = 0;
  gameState.practiceErrors = 0;
  gameState.practiceCombo = 0;
  gameState.practiceMaxCombo = 0;
  gameState.practiceGoalMet = false;
  gameState.practiceTimeLeft = phase.practiceTime;
  gameState.phaseScore = 0;

  document.getElementById('practice-title').textContent = `PRATICAR — FASE ${phase.id}: ${phase.name.toUpperCase()}`;
  document.getElementById('practice-timer').textContent = phase.practiceTime;
  document.getElementById('practice-correct').textContent = 0;
  document.getElementById('practice-errors').textContent = 0;
  document.getElementById('practice-combo').textContent = 0;

  setProfExpression('teach');
  showScreen('screen-practice');

  setNextPracticeTarget();
  renderKeyboard();
  startPracticeTimer();

  // Remove old handler
  if (practiceKeyHandler) document.removeEventListener('keydown', practiceKeyHandler);
  practiceKeyHandler = handlePracticeKey;
  document.addEventListener('keydown', practiceKeyHandler);
}

let currentTarget = '';
let shiftRequired = false;

function setNextPracticeTarget() {
  const phase = PHASES[gameState.currentPhase];
  const keys = phase.practiceKeys;
  currentTarget = keys[Math.floor(Math.random() * keys.length)];

  // Determine if shift is needed
  const shiftSymbols = ['!','@','#','$','%','&','*','(',')','_','+','{','}','<','>','?','"','|'];
  shiftRequired = shiftSymbols.includes(currentTarget);

  document.getElementById('target-key').textContent = currentTarget;

  // Hint
  let hint = '';
  if (shiftRequired) {
    hint = '💡 Use SHIFT + tecla correspondente';
  } else if (currentTarget === ' ') {
    hint = '💡 Barra de Espaço';
  } else {
    hint = `💡 Pressione a tecla diretamente`;
  }
  document.getElementById('target-hint').textContent = hint;

  highlightKeyboard(currentTarget, shiftRequired);
}

function handlePracticeKey(e) {
  if (!document.getElementById('screen-practice').classList.contains('active')) return;
  e.preventDefault();

  const key = e.key;
  const correct = key === currentTarget;

  if (correct) {
    gameState.practiceCorrect++;
    gameState.practiceCombo++;
    if (gameState.practiceCombo > gameState.practiceMaxCombo) {
      gameState.practiceMaxCombo = gameState.practiceCombo;
    }

    const pts = 10 + (gameState.practiceCombo > 5 ? 5 : 0);
    gameState.phaseScore += pts;
    gameState.score += pts;

    // Feedback
    let msg = '✓ CORRETO!';
    if (gameState.practiceCombo >= 3) msg += ` 🔥 COMBO x${gameState.practiceCombo}!`;
    showFeedback(msg, 'correct');
    spawnParticles(e);
    setProfExpression(gameState.practiceCombo >= 5 ? 'excited' : 'happy');

    document.getElementById('practice-correct').textContent = gameState.practiceCorrect;
    document.getElementById('practice-combo').textContent = gameState.practiceCombo;

    // Check goal
    if (gameState.practiceCorrect >= PHASES[gameState.currentPhase].practiceGoal && !gameState.practiceGoalMet) {
      gameState.practiceGoalMet = true;
      showNotification('🎯 META ATINGIDA! Continue!', 'success');
    }

    setNextPracticeTarget();
  } else if (key !== 'Shift' && key !== 'Control' && key !== 'Alt') {
    gameState.practiceErrors++;
    gameState.practiceCombo = 0;

    showFeedback(`✗ ERRADO! Era: "${currentTarget}"`, 'wrong');
    setProfExpression('thinking');

    document.getElementById('practice-errors').textContent = gameState.practiceErrors;
    document.getElementById('practice-combo').textContent = 0;
  }
}

function showFeedback(msg, type) {
  const area = document.getElementById('feedback-area');
  area.textContent = msg;
  area.className = `feedback-area feedback-${type}`;
  setTimeout(() => { area.className = 'feedback-area'; }, 600);
}

function startPracticeTimer() {
  if (gameState.practiceTimer) clearInterval(gameState.practiceTimer);
  gameState.practiceTimer = setInterval(() => {
    gameState.practiceTimeLeft--;
    document.getElementById('practice-timer').textContent = gameState.practiceTimeLeft;

    if (gameState.practiceTimeLeft <= 10) {
      document.getElementById('practice-timer').style.color = 'var(--red)';
    }
    if (gameState.practiceTimeLeft <= 0) {
      clearInterval(gameState.practiceTimer);
      if (practiceKeyHandler) document.removeEventListener('keydown', practiceKeyHandler);
      endPractice();
    }
  }, 1000);
}

function endPractice() {
  document.getElementById('practice-timer').style.color = '';
  // Start challenge
  startChallenge(gameState.currentPhase);
}

// ===== KEYBOARD VISUAL =====
const NUMBER_ROW = [
  { key: '1', shift: '!' }, { key: '2', shift: '@' }, { key: '3', shift: '#' },
  { key: '4', shift: '$' }, { key: '5', shift: '%' },
  { key: '7', shift: '&' }, { key: '8', shift: '*' }, { key: '9', shift: '(' },
  { key: '0', shift: ')' }, { key: '-', shift: '_' }, { key: '=', shift: '+' }
];

function renderKeyboard() {
  const kv = document.getElementById('keyboard-visual');
  kv.innerHTML = '';
  NUMBER_ROW.forEach(k => {
    const el = document.createElement('div');
    el.className = 'kv-key';
    el.id = `kv-${k.key}`;
    el.innerHTML = `<span class="top-char">${k.shift}</span>${k.key}`;
    kv.appendChild(el);
  });

  // Add special keys
  ['Backspace'].forEach(k => {
    const el = document.createElement('div');
    el.className = 'kv-key wide';
    el.textContent = '← Back';
    kv.appendChild(el);
  });
}

function highlightKeyboard(target, needsShift) {
  document.querySelectorAll('.kv-key').forEach(k => {
    k.classList.remove('highlight', 'active');
  });
  const found = NUMBER_ROW.find(k => k.key === target || k.shift === target);
  if (found) {
    const el = document.getElementById(`kv-${found.key}`);
    if (el) el.classList.add('highlight');
  }
}

// ===== CHALLENGE =====
let challengeKeyHandler = null;

function startChallenge(phaseIndex) {
  const phase = PHASES[phaseIndex];
  gameState.challengeScore = 0;
  gameState.challengeCombo = 0;
  gameState.challengeTimeLeft = phase.type === 'boss' ? 90 : 30;

  document.getElementById('challenge-title').textContent = phase.isBoss ? '👾 BOSS BATTLE!' : `🎯 DESAFIO — FASE ${phase.id}`;
  document.getElementById('challenge-timer').textContent = gameState.challengeTimeLeft;
  document.getElementById('challenge-score').textContent = 0;
  document.getElementById('challenge-combo').textContent = 0;

  showScreen('screen-challenge');
  setProfExpression(phase.isBoss ? 'stern' : 'excited');

  const area = document.getElementById('challenge-area');
  area.innerHTML = '';

  if (phase.challengeType === 'falling' || phase.challengeType === 'boss') {
    startFallingChallenge(phase);
  } else if (phase.challengeType === 'typing') {
    startTypingChallenge(phase);
  }

  startChallengeTimer();
}

// FALLING KEYS CHALLENGE
let fallingInterval = null;
let fallingKeys = [];
let fallingCatchHandler = null;

function startFallingChallenge(phase) {
  const area = document.getElementById('challenge-area');
  area.innerHTML = `
    <div class="falling-area" id="falling-area"></div>
    <div style="text-align:center;margin:8px 0;font-family:var(--vt);font-size:18px;color:var(--cyan)">
      PRESSIONE a tecla que está caindo antes que ela saia!
    </div>
    <input type="text" class="catch-input" id="catch-input" maxlength="1" autocomplete="off" placeholder="DIGITE AQUI!" autofocus>
  `;

  setTimeout(() => {
    const input = document.getElementById('catch-input');
    if (input) input.focus();
  }, 100);

  const keys = phase.challengeKeys || phase.practiceKeys;
  fallingKeys = [];

  fallingInterval = setInterval(() => {
    spawnFallingKey(keys, phase.type === 'boss');
  }, phase.type === 'boss' ? 600 : 900);

  if (fallingCatchHandler) document.removeEventListener('keydown', fallingCatchHandler);
  fallingCatchHandler = (e) => {
    if (!document.getElementById('screen-challenge').classList.contains('active')) return;
    catchFallingKey(e.key);
  };
  document.addEventListener('keydown', fallingCatchHandler);
}

function spawnFallingKey(keys, fast) {
  const area = document.getElementById('falling-area');
  if (!area) return;

  const key = keys[Math.floor(Math.random() * keys.length)];
  const el = document.createElement('div');
  el.className = 'falling-key';
  el.textContent = key;
  el.dataset.key = key;

  const duration = fast ? (1.5 + Math.random() * 1) : (2.5 + Math.random() * 1.5);
  el.style.left = (5 + Math.random() * 85) + '%';
  el.style.animationDuration = duration + 's';

  area.appendChild(el);
  fallingKeys.push({ el, key, caught: false });

  setTimeout(() => {
    if (!el.classList.contains('caught') && area.contains(el)) {
      el.style.color = 'var(--red)';
      gameState.challengeCombo = 0;
      document.getElementById('challenge-combo').textContent = 0;
      setTimeout(() => { if (area.contains(el)) area.removeChild(el); }, 300);
    }
  }, duration * 1000);
}

function catchFallingKey(pressed) {
  const area = document.getElementById('falling-area');
  if (!area) return;

  // Find topmost matching key
  let bestEl = null;
  let bestTop = -1;

  fallingKeys.forEach(fk => {
    if (!fk.caught && fk.key === pressed) {
      const rect = fk.el.getBoundingClientRect();
      if (rect.top > bestTop) {
        bestTop = rect.top;
        bestEl = fk;
      }
    }
  });

  if (bestEl) {
    bestEl.caught = true;
    bestEl.el.classList.add('caught');
    gameState.challengeCombo++;
    gameState.challengeScore += 20 + (gameState.challengeCombo * 5);
    gameState.score += 20 + (gameState.challengeCombo * 5);
    gameState.phaseScore += 20;

    document.getElementById('challenge-score').textContent = gameState.challengeScore;
    document.getElementById('challenge-combo').textContent = gameState.challengeCombo;

    if (gameState.challengeCombo >= 5) setProfExpression('excited');

    setTimeout(() => {
      if (area.contains(bestEl.el)) area.removeChild(bestEl.el);
    }, 200);
  }
}

// TYPING CHALLENGE
let typingText = '';
let typingPos = 0;
let typingKeyHandler = null;

function startTypingChallenge(phase) {
  typingText = phase.challengeText || '1234567890';
  typingPos = 0;

  const area = document.getElementById('challenge-area');
  area.innerHTML = `
    <div style="font-family:var(--vt);font-size:18px;color:var(--amber);margin-bottom:8px;text-align:center">
      DIGITE O TEXTO ABAIXO:
    </div>
    <div class="typing-text" id="typing-display"></div>
    <div class="typing-input-box">
      ▶ DIGITANDO... use o teclado para completar o texto!
    </div>
    <div id="typing-feedback" style="text-align:center;font-family:var(--pixel);font-size:9px;margin-top:8px;color:var(--cyan)">
      Acertos: 0 | Erros: 0
    </div>
  `;

  renderTypingDisplay();

  if (typingKeyHandler) document.removeEventListener('keydown', typingKeyHandler);
  typingKeyHandler = handleTypingKey;
  document.addEventListener('keydown', typingKeyHandler);
}

let typingCorrect = 0;
let typingErrors = 0;

function renderTypingDisplay() {
  const display = document.getElementById('typing-display');
  if (!display) return;

  display.innerHTML = typingText.split('').map((char, i) => {
    let cls = 'typing-char pending';
    if (i < typingPos) cls = 'typing-char correct';
    if (i === typingPos) cls = 'typing-char current';
    return `<span class="${cls}">${char === ' ' ? '&nbsp;' : char}</span>`;
  }).join('');
}

function handleTypingKey(e) {
  if (!document.getElementById('screen-challenge').classList.contains('active')) return;
  if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Tab') return;
  e.preventDefault();

  if (typingPos >= typingText.length) return;

  const expected = typingText[typingPos];
  if (e.key === expected) {
    typingPos++;
    typingCorrect++;
    gameState.challengeScore += 15;
    gameState.score += 15;
    gameState.phaseScore += 15;
    gameState.challengeCombo++;

    document.getElementById('challenge-score').textContent = gameState.challengeScore;
    document.getElementById('challenge-combo').textContent = gameState.challengeCombo;

    if (typingPos >= typingText.length) {
      // Completed!
      gameState.challengeScore += 100;
      showNotification('🎉 TEXTO COMPLETO! +100 BÔNUS!', 'success');
      // Reset for another round
      typingPos = 0;
    }
  } else {
    typingErrors++;
    gameState.challengeCombo = 0;
    document.getElementById('challenge-combo').textContent = 0;
  }

  const fb = document.getElementById('typing-feedback');
  if (fb) fb.textContent = `Acertos: ${typingCorrect} | Erros: ${typingErrors}`;

  renderTypingDisplay();
}

function startChallengeTimer() {
  if (gameState.challengeTimer) clearInterval(gameState.challengeTimer);
  gameState.challengeTimer = setInterval(() => {
    gameState.challengeTimeLeft--;
    document.getElementById('challenge-timer').textContent = gameState.challengeTimeLeft;

    if (gameState.challengeTimeLeft <= 10) {
      document.getElementById('challenge-timer').style.color = 'var(--red)';
    }
    if (gameState.challengeTimeLeft <= 0) {
      clearInterval(gameState.challengeTimer);
      cleanupChallenge();
      showResult();
    }
  }, 1000);
}

function cleanupChallenge() {
  if (fallingInterval) clearInterval(fallingInterval);
  if (fallingCatchHandler) document.removeEventListener('keydown', fallingCatchHandler);
  if (typingKeyHandler) document.removeEventListener('keydown', typingKeyHandler);
  if (practiceKeyHandler) document.removeEventListener('keydown', practiceKeyHandler);
  document.getElementById('challenge-timer').style.color = '';
  fallingKeys = [];
}

// ===== RESULT =====
function showResult() {
  const phase = PHASES[gameState.currentPhase];
  const pd = gameState.phasesData[gameState.currentPhase];

  // Calculate stars
  const goalMet = gameState.practiceCorrect >= phase.practiceGoal;
  const accuracy = gameState.practiceCorrect / Math.max(1, gameState.practiceCorrect + gameState.practiceErrors);
  let stars = 0;
  if (goalMet) stars++;
  if (accuracy >= 0.7) stars++;
  if (accuracy >= 0.9 || gameState.practiceMaxCombo >= 5) stars++;

  gameState.phaseStars = stars;

  // Update phase data
  if (stars > pd.stars) pd.stars = stars;
  if (gameState.phaseScore > pd.bestScore) pd.bestScore = gameState.phaseScore;
  if (!pd.completed && stars >= 1) {
    pd.completed = true;
    // Unlock next
    if (gameState.currentPhase + 1 < PHASES.length) {
      gameState.phasesData[gameState.currentPhase + 1].unlocked = true;
    }
  }

  // Determine expression and message
  let exp = stars === 3 ? 'excited' : stars === 2 ? 'proud' : stars === 1 ? 'happy' : 'sad';
  setProfExpression(exp);

  // Title
  let title = stars >= 1 ? `FASE ${phase.id} COMPLETA! 🎉` : 'TENTE NOVAMENTE! 💪';
  document.getElementById('result-title').textContent = title;

  // Speech
  document.getElementById('result-speech').textContent = getPraise(stars);

  // Stars
  document.getElementById('result-stars').textContent = stars > 0
    ? ('⭐'.repeat(stars) + '☆'.repeat(3 - stars))
    : '💔💔💔';

  // Stats
  document.getElementById('result-correct').textContent = gameState.practiceCorrect;
  document.getElementById('result-errors').textContent = gameState.practiceErrors;
  document.getElementById('result-points').textContent = gameState.phaseScore + gameState.challengeScore;
  document.getElementById('result-combo').textContent = gameState.practiceMaxCombo;
  document.getElementById('result-rank').textContent = getRank(gameState.score).name;

  // Badge
  let badge = '';
  if (stars === 3) badge = BADGES.perfect;
  if (gameState.practiceErrors === 0) badge = BADGES.noerror;
  if (gameState.practiceMaxCombo >= 10) badge = BADGES.combo;
  if (phase.isBoss && stars >= 1) badge = BADGES.boss;
  if (gameState.currentPhase === 11 && stars >= 1) badge = BADGES.master;
  document.getElementById('result-badge').textContent = badge;

  // Buttons
  const nextBtn = document.getElementById('btn-next-phase');
  const nextPhaseIdx = gameState.currentPhase + 1;
  if (nextPhaseIdx < PHASES.length && gameState.phasesData[nextPhaseIdx].unlocked) {
    nextBtn.style.display = 'block';
  } else {
    nextBtn.style.display = 'none';
  }

  // Save to ranking
  saveToRanking();

  showScreen('screen-result');
  spawnCelebration(stars);
}

function spawnCelebration(stars) {
  if (stars < 1) return;
  const emojis = ['⭐','🎉','✨','🎊','💫','🌟'];
  for (let i = 0; i < stars * 8; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'particle';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = (50 + Math.random() * 40) + 'vh';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1000);
    }, i * 100);
  }
}

function retryPhase() {
  openPhase(gameState.currentPhase);
}

function nextPhase() {
  const next = gameState.currentPhase + 1;
  if (next < PHASES.length) {
    openPhase(next);
  } else {
    showMap();
  }
}

// ===== PARTICLES =====
function spawnParticles(e) {
  const emojis = ['✓','⭐','💫','✨'];
  const el = document.createElement('div');
  el.className = 'particle';
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = '50%';
  el.style.top = '50%';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

// ===== RANKING =====
function saveToRanking() {
  const ranking = JSON.parse(localStorage.getItem('profbit_ranking') || '[]');
  const entry = {
    name: gameState.playerName,
    score: gameState.score,
    rank: getRank(gameState.score).name,
    date: new Date().toLocaleDateString('pt-BR')
  };

  // Find if player exists and update
  const idx = ranking.findIndex(r => r.name === entry.name);
  if (idx >= 0) {
    if (entry.score > ranking[idx].score) ranking[idx] = entry;
  } else {
    ranking.push(entry);
  }

  ranking.sort((a, b) => b.score - a.score);
  localStorage.setItem('profbit_ranking', JSON.stringify(ranking.slice(0, 20)));
}

function renderRanking() {
  const ranking = JSON.parse(localStorage.getItem('profbit_ranking') || '[]');
  const list = document.getElementById('ranking-list');

  if (ranking.length === 0) {
    list.innerHTML = '<div class="ranking-empty">Nenhum registro ainda!<br>Jogue para entrar no ranking!</div>';
    return;
  }

  const medals = ['🥇','🥈','🥉'];
  list.innerHTML = ranking.map((entry, i) => `
    <div class="ranking-item ${i === 0 ? 'top1' : i === 1 ? 'top2' : i === 2 ? 'top3' : ''}">
      <span class="ranking-pos">#${i+1}</span>
      <span class="ranking-medal">${medals[i] || '  '}</span>
      <span class="ranking-name">${entry.name}</span>
      <span class="ranking-score">${entry.score} pts</span>
      <span class="ranking-rank-badge">${entry.rank}</span>
    </div>
  `).join('');
}

// ===== NOTIFICATIONS =====
function showNotification(msg, type = 'info') {
  const el = document.createElement('div');
  el.className = 'notification';
  if (type === 'warn') el.style.borderColor = 'var(--red)';
  if (type === 'success') el.style.borderColor = 'var(--green)';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

// ===== INIT =====
document.addEventListener('keydown', (e) => {
  // Any key on intro starts game
  if (document.getElementById('screen-intro').classList.contains('active')) {
    if (e.key === 'Enter' || e.key === ' ') {
      showScreen('screen-name');
    }
  }
});

// Initial prof draw
window.addEventListener('load', () => {
  drawProfessor('prof-canvas-intro', 1, 'happy');
  drawProfessor('prof-canvas-name', 0.7, 'happy');
});
