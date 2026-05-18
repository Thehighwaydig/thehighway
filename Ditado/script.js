const phaseData = [
    { name: "Partida", ppm: 20, text: "O motor ronca suavemente enquanto você se prepara para a longa jornada que tem pela frente na rodovia." },
    { name: "Aceleração", ppm: 21, text: "Aumente o ritmo gradualmente, sentindo a vibração do asfalto sob os pneus e o vento batendo no rosto." },
    { name: "Visão Clara", ppm: 22, text: "Mantenha os olhos focados no horizonte, antecipando cada curva e obstáculo com total clareza mental." },
    { name: "Ritmo Constante", ppm: 24, text: "A constância é mais importante que a velocidade bruta; encontre o seu fluxo e mantenha-o sem hesitar." },
    { name: "Curva Perigosa", ppm: 25, text: "Reduza a margem de erro quando o caminho ficar difícil, a precisão agora é sua maior aliada na estrada." },
    { name: "Túnel de Luz", ppm: 27, text: "Atravesse a escuridão com confiança, sabendo que cada palavra digitada corretamente te aproxima da saída." },
    { name: "Subida Íngreme", ppm: 28, text: "Exija mais de si mesmo nesta subida, a força dos seus dedos determinará o quão rápido chegaremos ao topo." },
    { name: "Descida Veloz", ppm: 30, text: "Aproveite o embalo para ganhar velocidade, mas não deixe que a empolgação comprometa sua técnica de digitação." },
    { name: "Neblina Densa", ppm: 31, text: "Mesmo quando não puder ver o fim, continue avançando com cuidado e atenção redobrada a cada detalhe." },
    { name: "Ponte Suspensa", ppm: 33, text: "Equilíbrio é fundamental para cruzar este trecho, mantenha a calma e a mente focada no objetivo final." },
    { name: "Horizonte Roxo", ppm: 34, text: "O céu ganha tons de violeta enquanto o sol se põe, iluminando o caminho com uma luz mágica e inspiradora." },
    { name: "Chuva de Verão", ppm: 36, text: "A água limpa a estrada e renova suas energias, sinta o frescor e continue sua jornada com vigor renovado." },
    { name: "Vento Lateral", ppm: 37, text: "Sinta a pressão mas não se deixe desviar do caminho, mantenha o volante firme e os dedos ágeis no teclado." },
    { name: "Cidade Distante", ppm: 39, text: "As luzes no horizonte mostram que estamos chegando perto, mas ainda há muito asfalto para percorrer hoje." },
    { name: "Reta Infinita", ppm: 40, text: "Nesta reta, a velocidade é permitida, mostre do que você é capaz e acelere sem medo de errar." },
    { name: "Desvio Inesperado", ppm: 42, text: "Adapte-se rapidamente às mudanças, a flexibilidade é a marca de um verdadeiro mestre da rodovia digital." },
    { name: "Oásis Noturno", ppm: 43, text: "Um momento de calma sob as estrelas para recuperar o fôlego antes do sprint final desta grande aventura." },
    { name: "Madrugada Fria", ppm: 44, text: "O silêncio da noite ajuda na concentração, cada toque nas teclas ecoa como um trovão na quietude." },
    { name: "Primeiro Raio", ppm: 45, text: "O amanhecer traz uma nova esperança e a certeza de que a linha de chegada está logo ali na próxima curva." },
    { name: "Destino Final", ppm: 45, text: "Você provou ser um mestre da Highway, completando o desafio com maestria, velocidade e precisão absoluta." }
];

let currentPhase = 0;
let textToType = "";
const textDisplay = document.getElementById('text-display');
const typingInput = document.getElementById('typing-input');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');
const car = document.getElementById('car');
const resetBtn = document.getElementById('reset-btn');
const listenBtn = document.getElementById('listen-btn');
const voiceSelect = document.getElementById('voice-select');
const currentPhaseNum = document.getElementById('current-phase-num');
const phaseNameDisplay = document.getElementById('phase-name');
const targetPpmDisplay = document.getElementById('target-ppm');
const messageDisplay = document.getElementById('message-display');

let startTime;
let timerInterval;
let isStarted = false;
let mistakes = 0;
let charactersTyped = 0;
let lastWordIndex = -1;

const synth = window.speechSynthesis;
let voices = [];

function loadVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = voices
        .map((voice, i) => `<option value="${i}">${voice.name} (${voice.lang})</option>`)
        .join('');
    
    // Tenta selecionar uma voz em português por padrão
    const ptVoiceIndex = voices.findIndex(v => v.lang.includes('pt-BR'));
    if (ptVoiceIndex !== -1) voiceSelect.value = ptVoiceIndex;
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

function speak(text, rate = 1) {
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices[voiceSelect.value];
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = rate;
    synth.speak(utterance);
}

function init() {
    const phase = phaseData[currentPhase];
    textToType = phase.text;
    currentPhaseNum.innerText = currentPhase + 1;
    phaseNameDisplay.innerText = phase.name;
    targetPpmDisplay.innerText = phase.ppm;
    
    textDisplay.innerHTML = '';
    textToType.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        textDisplay.appendChild(span);
    });
    
    typingInput.value = '';
    typingInput.disabled = false;
    typingInput.focus();
    wpmDisplay.innerText = '0';
    accuracyDisplay.innerText = '100%';
    timerDisplay.innerText = '0s';
    car.style.left = '0%';
    messageDisplay.innerText = '';
    
    isStarted = false;
    mistakes = 0;
    charactersTyped = 0;
    lastWordIndex = -1;
    clearInterval(timerInterval);
}

listenBtn.addEventListener('click', () => speak(textToType, 0.9));

typingInput.addEventListener('input', () => {
    if (!isStarted) {
        startTime = new Date();
        timerInterval = setInterval(updateStats, 1000);
        isStarted = true;
    }

    const inputVal = typingInput.value;
    const arrayQuote = textDisplay.querySelectorAll('span');
    const arrayInput = inputVal.split('');
    
    charactersTyped = arrayInput.length;
    mistakes = 0;

    arrayQuote.forEach((charSpan, index) => {
        const typed = arrayInput[index];
        charSpan.classList.remove('current');
        
        if (typed == null) {
            charSpan.classList.remove('correct', 'incorrect');
        } else if (typed === charSpan.innerText) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        } else {
            charSpan.classList.add('incorrect');
            charSpan.classList.remove('correct');
            mistakes++;
        }
    });

    if (arrayInput.length < arrayQuote.length) {
        arrayQuote[arrayInput.length].classList.add('current');
    }

    // Fala enquanto digita (quando termina uma palavra)
    const words = inputVal.trim().split(/\s+/);
    if (words.length > lastWordIndex + 1) {
        const lastTypedWord = words[words.length - 2]; // Palavra anterior à que está sendo digitada
        if (lastTypedWord && inputVal.endsWith(' ')) {
            speak(lastTypedWord, 1.2);
            lastWordIndex = words.length - 2;
        }
    }

    const progress = (arrayInput.length / arrayQuote.length) * 95;
    car.style.left = `${progress}%`;

    updateStats();

    if (arrayInput.length >= arrayQuote.length) {
        finishGame();
    }
});

function updateStats() {
    const elapsed = Math.floor((new Date() - startTime) / 1000) || 1;
    const ppm = Math.round((charactersTyped / 5) / (elapsed / 60));
    const accuracy = charactersTyped > 0 ? Math.round(((charactersTyped - mistakes) / charactersTyped) * 100) : 100;
    
    wpmDisplay.innerText = ppm;
    accuracyDisplay.innerText = `${accuracy}%`;
    timerDisplay.innerText = `${elapsed}s`;
}

function finishGame() {
    clearInterval(timerInterval);
    typingInput.disabled = true;
    
    const ppm = parseInt(wpmDisplay.innerText);
    const accuracy = parseInt(accuracyDisplay.innerText);
    const targetPpm = phaseData[currentPhase].ppm;
    
    if (ppm >= targetPpm && accuracy >= 90) {
        messageDisplay.innerHTML = `<span class="success-msg">Meta atingida! PPM: ${ppm} | Precisão: ${accuracy}%</span>`;
        speak("Excelente! Meta atingida. Próxima fase desbloqueada!", 1);
        
        setTimeout(() => {
            if (currentPhase < phaseData.length - 1) {
                currentPhase++;
                init();
            } else {
                alert("Parabéns! Você completou todas as 20 fases!");
            }
        }, 3000);
    } else {
        messageDisplay.innerHTML = `<span class="error-msg">Texto concluído, mas metas não atingidas. Tente novamente! (Meta: ${targetPpm} PPM e 90% Precisão)</span>`;
        speak("Texto concluído, mas você não atingiu as metas. Tente novamente.", 1);
        
        setTimeout(() => {
            init();
        }, 4000);
    }
}

resetBtn.addEventListener('click', init);

// Inicialização
loadVoices();
init();
