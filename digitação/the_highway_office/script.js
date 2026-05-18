const tasks = {
    email: [
        { text: "Prezado cliente, informamos que seu pedido foi processado com sucesso e será enviado em breve.", points: 50 },
        { text: "Solicito a gentileza de encaminhar os documentos pendentes para a finalização do contrato de prestação de serviços.", points: 70 },
        { text: "Confirmamos o recebimento do seu e-mail e nossa equipe técnica entrará em contato nas próximas vinte e quatro horas.", points: 80 }
    ],
    inventory: [
        { text: "ID: 4509 - Notebook Gamer Nitro 5 - Qtd: 15 - Setor: Eletrônicos - Status: Disponível", points: 60 },
        { text: "ID: 1288 - Cadeira Ergonômica Pro - Qtd: 08 - Setor: Mobiliário - Status: Em Trânsito", points: 60 },
        { text: "ID: 9931 - Monitor UltraWide 34 - Qtd: 04 - Setor: Periféricos - Status: Esgotado", points: 60 }
    ],
    support: [
        { text: "Olá! Como posso ajudar você hoje? Por favor, descreva o problema detalhadamente para que eu possa auxiliar.", points: 50 },
        { text: "Lamentamos pelo transtorno. Já abrimos um chamado de urgência para verificar a instabilidade em sua conexão.", points: 70 },
        { text: "Obrigado por aguardar. Verifiquei em nosso sistema que sua fatura já foi compensada. Algo mais em que eu possa ajudar?", points: 90 }
    ]
};

let currentModule = 'email';
let currentTaskIndex = 0;
let score = 0;
let errors = 0;
let totalCharsTyped = 0;
let timeLeft = 120; // 2 minutos
let timerInterval;
let isPlaying = false;

const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const errorsEl = document.getElementById('errors');
const displayTextEl = document.getElementById('display-text');
const typingInput = document.getElementById('typing-input');
const startBtn = document.getElementById('start-btn');
const navBtns = document.querySelectorAll('.nav-btn');
const reportModal = document.getElementById('report-modal');

function initTask() {
    const task = tasks[currentModule][currentTaskIndex];
    displayTextEl.innerHTML = '';
    task.text.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        displayTextEl.appendChild(span);
    });
    typingInput.value = '';
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        timerEl.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            endGame();
        }
        updateWPM();
    }, 1000);
}

function updateWPM() {
    const timeElapsed = (120 - timeLeft) / 60;
    if (timeElapsed > 0) {
        const wpm = Math.round((totalCharsTyped / 5) / timeElapsed);
        wpmEl.innerText = wpm;
    }
}

function updateAccuracy() {
    if (totalCharsTyped > 0) {
        const acc = Math.round(((totalCharsTyped - errors) / totalCharsTyped) * 100);
        accuracyEl.innerText = Math.max(0, acc);
    }
}

function endGame() {
    clearInterval(timerInterval);
    isPlaying = false;
    typingInput.disabled = true;
    
    document.getElementById('final-score').innerText = score;
    document.getElementById('final-wpm').innerText = wpmEl.innerText;
    document.getElementById('final-accuracy').innerText = accuracyEl.innerText + '%';
    document.getElementById('final-errors').innerText = errors;
    
    reportModal.style.display = 'flex';
}

typingInput.addEventListener('input', () => {
    if (!isPlaying) return;

    const taskText = tasks[currentModule][currentTaskIndex].text;
    const userText = typingInput.value;
    const spans = displayTextEl.querySelectorAll('span');
    
    let currentErrors = 0;
    totalCharsTyped++;

    spans.forEach((span, i) => {
        const char = userText[i];
        if (char == null) {
            span.className = '';
        } else if (char === span.innerText) {
            span.className = 'char-correct';
        } else {
            span.className = 'char-incorrect';
            currentErrors++;
        }
        
        if (i === userText.length) span.classList.add('char-current');
    });

    errors += (currentErrors > 0 ? 1 : 0); // Simplificação de erro por caractere
    errorsEl.innerText = errors;
    updateAccuracy();

    if (userText.length >= taskText.length) {
        score += tasks[currentModule][currentTaskIndex].points;
        scoreEl.innerText = score;
        
        currentTaskIndex++;
        if (currentTaskIndex >= tasks[currentModule].length) {
            currentTaskIndex = 0;
        }
        initTask();
    }
});

startBtn.addEventListener('click', () => {
    isPlaying = true;
    startBtn.style.display = 'none';
    typingInput.focus();
    startTimer();
    initTask();
});

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!isPlaying) {
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentModule = btn.dataset.module;
            currentTaskIndex = 0;
            
            const titles = { email: "E-mails Profissionais", inventory: "Cadastro de Produtos", support: "Atendimento" };
            const descs = { 
                email: "Digite o e-mail abaixo para enviar ao cliente.", 
                inventory: "Registre os itens no sistema de estoque com precisão.", 
                support: "Responda as solicitações de suporte técnico." 
            };
            
            document.querySelector('#module-title h2').innerText = titles[currentModule];
            document.getElementById('module-desc').innerText = descs[currentModule];
            initTask();
        }
    });
});

// Inicializar visual
initTask();
