// ============================================
// THE HIGHWAY - TYPING TRAINER
// HTML/CSS/JavaScript Version
// ============================================

// ============ DATA STRUCTURES ============
const KEYBOARD_ROWS = {
    home: {
        name: 'Fileira Central (Home Row)',
        description: 'Domine a fileira central - a base de toda digitação rápida',
        keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
        words: ['sad', 'lad', 'dad', 'fads', 'flask', 'flash', 'slash', 'salad']
    },
    top: {
        name: 'Fileira Superior',
        description: 'Pratique a fileira superior com precisão e velocidade',
        keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        words: ['top', 'pot', 'rope', 'quote', 'quiet', 'quite', 'tower', 'power']
    },
    bottom: {
        name: 'Fileira Inferior',
        description: 'Desenvolva memória muscular na fileira inferior',
        keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
        words: ['box', 'zoom', 'buzz', 'maze', 'zone', 'zero', 'bronze', 'frozen']
    }
};

const FINGER_MAPPING = {
    home: {
        'a': { finger: 'Mínimo E', code: 'pinky' },
        's': { finger: 'Anular E', code: 'ring' },
        'd': { finger: 'Médio E', code: 'middle' },
        'f': { finger: 'Indicador E', code: 'index' },
        'j': { finger: 'Indicador D', code: 'index' },
        'k': { finger: 'Médio D', code: 'middle' },
        'l': { finger: 'Anular D', code: 'ring' },
        ';': { finger: 'Mínimo D', code: 'pinky' }
    },
    top: {
        'q': { finger: 'Mínimo E', code: 'pinky' },
        'w': { finger: 'Anular E', code: 'ring' },
        'e': { finger: 'Médio E', code: 'middle' },
        'r': { finger: 'Indicador E', code: 'index' },
        't': { finger: 'Indicador E', code: 'index' },
        'y': { finger: 'Indicador D', code: 'index' },
        'u': { finger: 'Indicador D', code: 'index' },
        'i': { finger: 'Médio D', code: 'middle' },
        'o': { finger: 'Anular D', code: 'ring' },
        'p': { finger: 'Mínimo D', code: 'pinky' }
    },
    bottom: {
        'z': { finger: 'Mínimo E', code: 'pinky' },
        'x': { finger: 'Anular E', code: 'ring' },
        'c': { finger: 'Médio E', code: 'middle' },
        'v': { finger: 'Indicador E', code: 'index' },
        'b': { finger: 'Indicador E', code: 'index' },
        'n': { finger: 'Indicador D', code: 'index' },
        'm': { finger: 'Indicador D', code: 'index' },
        ',': { finger: 'Médio D', code: 'middle' },
        '.': { finger: 'Anular D', code: 'ring' },
        '/': { finger: 'Mínimo D', code: 'pinky' }
    }
};

const ACHIEVEMENTS = [
    { id: 'first-session', name: 'Primeiro Passo', description: 'Complete sua primeira sessão', icon: '🚀', condition: (stats) => stats.totalSessions > 0 },
    { id: 'speed-demon', name: 'Velocista', description: 'Atinja 60 WPM', icon: '⚡', condition: (stats) => stats.bestWPM >= 60 },
    { id: 'accuracy-master', name: 'Mestre da Precisão', description: 'Mantenha 95% de precisão', icon: '🎯', condition: (stats) => stats.avgAccuracy >= 95 },
    { id: 'consistent', name: 'Consistente', description: 'Mantenha uma sequência de 7 dias', icon: '🔥', condition: (stats) => stats.streak >= 7 },
    { id: 'marathon', name: 'Maratonista', description: 'Complete 50 sessões', icon: '🏃', condition: (stats) => stats.totalSessions >= 50 },
    { id: 'legend', name: 'Lenda', description: 'Atinja 100 WPM', icon: '👑', condition: (stats) => stats.bestWPM >= 100 }
];

// ============ APPLICATION STATE ============
const state = {
    currentTab: 'home',
    currentMode: 'chars',
    currentDifficulty: 'easy',
    isTraining: false,
    isPaused: false,
    soundEnabled: true,
    isDarkTheme: true,
    
    trainingText: '',
    userInput: '',
    startTime: null,
    timerInterval: null,
    
    stats: {
        wpm: 0,
        accuracy: 0,
        errors: 0,
        timeElapsed: 0,
        correctChars: 0,
        totalChars: 0
    },
    
    progress: {
        totalSessions: 0,
        bestWPM: 0,
        avgAccuracy: 0,
        totalTimeSpent: 0,
        streak: 0,
        achievements: []
    }
};

// ============ DOM ELEMENTS ============
const elements = {
    // Tabs
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabDescription: document.getElementById('tabDescription'),
    
    // Mode
    modeBtns: document.querySelectorAll('.mode-btn'),
    
    // Difficulty
    difficultyBtns: document.querySelectorAll('.difficulty-btn'),
    
    // Training
    trainingText: document.getElementById('trainingText'),
    trainingInput: document.getElementById('trainingInput'),
    progressFill: document.getElementById('progressFill'),
    
    // Stats
    wpmValue: document.getElementById('wpmValue'),
    accuracyValue: document.getElementById('accuracyValue'),
    errorsValue: document.getElementById('errorsValue'),
    timeValue: document.getElementById('timeValue'),
    
    // Buttons
    startBtn: document.getElementById('startBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    resetBtn: document.getElementById('resetBtn'),
    soundBtn: document.getElementById('soundBtn'),
    themeToggle: document.getElementById('themeToggle'),
    
    // Keyboard
    virtualKeyboard: document.getElementById('virtualKeyboard'),
    keyboardTitle: document.getElementById('keyboardTitle'),
    currentCharIndicator: document.getElementById('currentCharIndicator'),
    charDisplay: document.getElementById('charDisplay'),
    
    // Progress
    progressTabBtns: document.querySelectorAll('.progress-tab-btn'),
    progressContents: document.querySelectorAll('.progress-content'),
    
    // Progress Stats
    totalSessions: document.getElementById('totalSessions'),
    bestWPM: document.getElementById('bestWPM'),
    avgAccuracy: document.getElementById('avgAccuracy'),
    streak: document.getElementById('streak'),
    
    // Progress Bars
    wpmBar: document.getElementById('wpmBar'),
    accuracyBar: document.getElementById('accuracyBar'),
    sessionsBar: document.getElementById('sessionsBar'),
    wpmPercent: document.getElementById('wpmPercent'),
    accuracyPercent: document.getElementById('accuracyPercent'),
    sessionsPercent: document.getElementById('sessionsPercent'),
    
    // Achievements
    achievementsGrid: document.getElementById('achievementsGrid'),
    
    // Tabs
    statsTab: document.getElementById('statsTab'),
    tipsTab: document.getElementById('tipsTab')
};

// ============ INITIALIZATION ============
function init() {
    loadProgress();
    setupEventListeners();
    renderVirtualKeyboard();
    updateProgressDisplay();
    updateAchievements();
}

// ============ EVENT LISTENERS ============
function setupEventListeners() {
    // Tab navigation
    elements.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => selectTab(btn.dataset.tab));
    });
    
    // Mode selection
    elements.modeBtns.forEach(btn => {
        btn.addEventListener('click', () => selectMode(btn.dataset.mode));
    });
    
    // Difficulty selection
    elements.difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => selectDifficulty(btn.dataset.difficulty));
    });
    
    // Training input
    elements.trainingInput.addEventListener('input', handleTrainingInput);
    elements.trainingInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') e.preventDefault();
    });
    
    // Control buttons
    elements.startBtn.addEventListener('click', startTraining);
    elements.pauseBtn.addEventListener('click', togglePause);
    elements.resetBtn.addEventListener('click', resetTraining);
    elements.soundBtn.addEventListener('click', toggleSound);
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Progress tabs
    elements.progressTabBtns.forEach(btn => {
        btn.addEventListener('click', () => selectProgressTab(btn.dataset.progressTab));
    });
}

// ============ TAB MANAGEMENT ============
function selectTab(tab) {
    state.currentTab = tab;
    
    // Update UI
    elements.tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Update description
    elements.tabDescription.textContent = KEYBOARD_ROWS[tab].description;
    
    // Update keyboard
    elements.keyboardTitle.textContent = KEYBOARD_ROWS[tab].name;
    renderVirtualKeyboard();
    
    // Reset training
    resetTraining();
}

function selectMode(mode) {
    state.currentMode = mode;
    
    elements.modeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    resetTraining();
}

function selectDifficulty(difficulty) {
    state.currentDifficulty = difficulty;
    
    elements.difficultyBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
    });
    
    resetTraining();
}

function selectProgressTab(tab) {
    elements.progressTabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.progressTab === tab);
    });
    
    elements.progressContents.forEach(content => {
        content.classList.toggle('active', content.id === (tab === 'stats' ? 'statsTab' : 'tipsTab'));
    });
}

// ============ TRAINING LOGIC ============
function generateTrainingText() {
    const row = KEYBOARD_ROWS[state.currentTab];
    const difficulty = state.currentDifficulty;
    const lengths = { easy: 20, medium: 50, hard: 100 };
    const length = lengths[difficulty];
    
    let text = '';
    
    if (state.currentMode === 'chars') {
        for (let i = 0; i < length; i++) {
            text += row.keys[Math.floor(Math.random() * row.keys.length)];
            if (i % 5 === 4) text += ' ';
        }
    } else if (state.currentMode === 'words') {
        const wordCount = { easy: 10, medium: 20, hard: 40 }[difficulty];
        for (let i = 0; i < wordCount; i++) {
            text += row.words[Math.floor(Math.random() * row.words.length)] + ' ';
        }
    } else {
        for (let i = 0; i < length; i++) {
            text += row.keys[Math.floor(Math.random() * row.keys.length)];
            if (i % 8 === 7) text += ' ';
        }
    }
    
    return text.trim();
}

function startTraining() {
    if (state.isTraining) return;
    
    state.trainingText = generateTrainingText();
    state.userInput = '';
    state.isTraining = true;
    state.isPaused = false;
    state.startTime = Date.now();
    
    state.stats = {
        wpm: 0,
        accuracy: 0,
        errors: 0,
        timeElapsed: 0,
        correctChars: 0,
        totalChars: 0
    };
    
    renderTrainingText();
    elements.trainingInput.value = '';
    elements.trainingInput.focus();
    elements.trainingInput.disabled = false;
    
    elements.startBtn.disabled = true;
    elements.pauseBtn.disabled = false;
    
    startTimer();
}

function handleTrainingInput(e) {
    if (!state.isTraining || state.isPaused) return;
    
    const input = e.target.value;
    state.userInput = input;
    
    // Calculate statistics
    const totalChars = input.length;
    let correctChars = 0;
    let errors = 0;
    
    for (let i = 0; i < totalChars; i++) {
        if (input[i] === state.trainingText[i]) {
            correctChars++;
        } else {
            errors++;
        }
    }
    
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    const wpm = Math.round((totalChars / 5) * (60 / Math.max(state.stats.timeElapsed, 1)));
    
    state.stats = {
        wpm,
        accuracy,
        errors,
        timeElapsed: state.stats.timeElapsed,
        correctChars,
        totalChars
    };
    
    // Update display
    renderTrainingText();
    updateStatsDisplay();
    updateProgressBar();
    
    // Play sound
    if (state.soundEnabled && totalChars > 0) {
        const isCorrect = input[totalChars - 1] === state.trainingText[totalChars - 1];
        playSound(isCorrect ? 'correct' : 'error');
    }
    
    // Update keyboard
    if (totalChars < state.trainingText.length) {
        updateVirtualKeyboard(state.trainingText[totalChars]);
    }
    
    // Check if complete
    if (totalChars === state.trainingText.length && state.trainingText.length > 0) {
        completeTraining();
    }
}

function togglePause() {
    state.isPaused = !state.isPaused;
    
    if (state.isPaused) {
        clearInterval(state.timerInterval);
        elements.pauseBtn.textContent = 'Retomar';
        elements.trainingInput.disabled = true;
    } else {
        startTimer();
        elements.pauseBtn.textContent = 'Pausar';
        elements.trainingInput.disabled = false;
        elements.trainingInput.focus();
    }
}

function resetTraining() {
    state.isTraining = false;
    state.isPaused = false;
    state.trainingText = '';
    state.userInput = '';
    
    clearInterval(state.timerInterval);
    
    elements.trainingInput.value = '';
    elements.trainingInput.disabled = false;
    elements.startBtn.disabled = false;
    elements.pauseBtn.disabled = true;
    elements.pauseBtn.textContent = 'Pausar';
    
    state.stats = {
        wpm: 0,
        accuracy: 0,
        errors: 0,
        timeElapsed: 0,
        correctChars: 0,
        totalChars: 0
    };
    
    elements.trainingText.textContent = 'Clique para começar...';
    elements.trainingText.innerHTML = 'Clique para começar...';
    updateStatsDisplay();
    updateProgressBar();
    renderVirtualKeyboard();
    
    elements.currentCharIndicator.style.display = 'none';
}

function completeTraining() {
    state.isTraining = false;
    playSound('complete');
    
    // Update progress
    state.progress.totalSessions++;
    state.progress.bestWPM = Math.max(state.progress.bestWPM, state.stats.wpm);
    state.progress.avgAccuracy = Math.round(
        (state.progress.avgAccuracy * (state.progress.totalSessions - 1) + state.stats.accuracy) / state.progress.totalSessions
    );
    
    saveProgress();
    updateProgressDisplay();
    updateAchievements();
    
    elements.startBtn.disabled = false;
    elements.pauseBtn.disabled = true;
}

function startTimer() {
    state.timerInterval = setInterval(() => {
        state.stats.timeElapsed++;
        elements.timeValue.textContent = state.stats.timeElapsed + 's';
        
        // Recalculate WPM
        if (state.stats.totalChars > 0) {
            state.stats.wpm = Math.round((state.stats.totalChars / 5) * (60 / state.stats.timeElapsed));
            elements.wpmValue.textContent = state.stats.wpm;
        }
    }, 1000);
}

// ============ RENDERING ============
function renderTrainingText() {
    let html = '';
    
    for (let i = 0; i < state.trainingText.length; i++) {
        const char = state.trainingText[i];
        let className = '';
        
        if (i < state.userInput.length) {
            className = state.userInput[i] === char ? 'correct' : 'incorrect';
        }
        
        const displayChar = char === ' ' ? '·' : char;
        html += `<span class="${className}">${displayChar}</span>`;
    }
    
    elements.trainingText.innerHTML = html;
}

function renderVirtualKeyboard() {
    const row = KEYBOARD_ROWS[state.currentTab];
    const fingerMap = FINGER_MAPPING[state.currentTab];
    
    elements.virtualKeyboard.innerHTML = '';
    
    row.keys.forEach(key => {
        const finger = fingerMap[key];
        const keyItem = document.createElement('div');
        keyItem.className = 'key-item';
        
        const keyBtn = document.createElement('button');
        keyBtn.className = 'key-btn';
        keyBtn.textContent = key.toUpperCase();
        
        const fingerLabel = document.createElement('div');
        fingerLabel.className = `finger-label ${finger.code}`;
        fingerLabel.textContent = finger.finger;
        
        keyItem.appendChild(keyBtn);
        keyItem.appendChild(fingerLabel);
        elements.virtualKeyboard.appendChild(keyItem);
    });
}

function updateVirtualKeyboard(currentChar) {
    const keyBtns = elements.virtualKeyboard.querySelectorAll('.key-btn');
    
    keyBtns.forEach(btn => {
        btn.classList.remove('active', 'current');
        
        if (btn.textContent.toLowerCase() === currentChar.toLowerCase()) {
            btn.classList.add('current');
        }
    });
    
    // Update current char indicator
    elements.charDisplay.textContent = currentChar.toUpperCase();
    elements.currentCharIndicator.style.display = 'block';
}

function updateStatsDisplay() {
    elements.wpmValue.textContent = state.stats.wpm;
    elements.accuracyValue.textContent = state.stats.accuracy + '%';
    elements.errorsValue.textContent = state.stats.errors;
    elements.timeValue.textContent = state.stats.timeElapsed + 's';
}

function updateProgressBar() {
    const percentage = state.trainingText.length > 0 
        ? (state.userInput.length / state.trainingText.length) * 100 
        : 0;
    
    elements.progressFill.style.width = percentage + '%';
}

function updateProgressDisplay() {
    elements.totalSessions.textContent = state.progress.totalSessions;
    elements.bestWPM.textContent = state.progress.bestWPM;
    elements.avgAccuracy.textContent = state.progress.avgAccuracy + '%';
    elements.streak.textContent = state.progress.streak + 'd';
    
    // Progress bars
    const wpmPercent = Math.min(Math.round((state.progress.bestWPM / 100) * 100), 100);
    const accuracyPercent = Math.min(Math.round((state.progress.avgAccuracy / 99) * 100), 100);
    const sessionsPercent = Math.min(Math.round((state.progress.totalSessions / 100) * 100), 100);
    
    elements.wpmBar.style.width = wpmPercent + '%';
    elements.accuracyBar.style.width = accuracyPercent + '%';
    elements.sessionsBar.style.width = sessionsPercent + '%';
    
    elements.wpmPercent.textContent = wpmPercent + '%';
    elements.accuracyPercent.textContent = accuracyPercent + '%';
    elements.sessionsPercent.textContent = sessionsPercent + '%';
}

function updateAchievements() {
    elements.achievementsGrid.innerHTML = '';
    
    ACHIEVEMENTS.forEach(achievement => {
        const unlocked = achievement.condition(state.progress);
        
        const item = document.createElement('div');
        item.className = `achievement-item ${unlocked ? 'unlocked' : ''}`;
        
        item.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
            ${unlocked ? '<div class="achievement-badge">✓ Desbloqueado</div>' : ''}
        `;
        
        elements.achievementsGrid.appendChild(item);
    });
}

// ============ SOUND EFFECTS ============
function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        
        if (type === 'correct') {
            oscillator.frequency.value = 800;
            gain.gain.setValueAtTime(0.1, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } else if (type === 'error') {
            oscillator.frequency.value = 300;
            gain.gain.setValueAtTime(0.05, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
        } else if (type === 'complete') {
            oscillator.frequency.value = 1000;
            gain.gain.setValueAtTime(0.1, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        }
    } catch (e) {
        // Audio not available
    }
}

function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    elements.soundBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
}

// ============ THEME MANAGEMENT ============
function toggleTheme() {
    state.isDarkTheme = !state.isDarkTheme;
    
    const body = document.body;
    if (state.isDarkTheme) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        elements.themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        elements.themeToggle.textContent = '🌙';
    }
    
    localStorage.setItem('theme', state.isDarkTheme ? 'dark' : 'light');
}

// ============ STORAGE ============
function saveProgress() {
    localStorage.setItem('highway_progress', JSON.stringify(state.progress));
}

function loadProgress() {
    const saved = localStorage.getItem('highway_progress');
    if (saved) {
        state.progress = JSON.parse(saved);
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        state.isDarkTheme = false;
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        elements.themeToggle.textContent = '🌙';
    }
}

// ============ STARTUP ============
document.addEventListener('DOMContentLoaded', init);
