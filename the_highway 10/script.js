const quotes = {
    easy: [
        "O sol brilha para todos.",
        "A prática leva à perfeição.",
        "A vida é bela e curta.",
        "Gatos gostam de dormir ao sol.",
        "Café ajuda a manter o foco.",
        "O céu está muito azul hoje.",
        "Aprender algo novo é vital.",
        "O gato dorme no sofá.",
        "Hoje o dia está bonito.",
        "Eu gosto de estudar.",
        "O teclado é muito útil.",
        "A escola começa cedo.",
        "O aluno digitou rápido.",
        "O café estava quente.",
        "A música toca alto.",
        "O computador ligou bem.",
        "Meu amigo joga bola."
       
    ],
    medium: [
        "A persistência é o caminho do êxito e da vitória.",
        "O sucesso não é o final, o fracasso não é fatal.",
        "A tecnologia move o mundo de formas inesperadas.",
        "Digitar rápido requer coordenação e muita paciência.",
        "O conhecimento é a única coisa que ninguém pode tirar.",
        "Programação é a arte de dizer a um computador o que fazer."
    ],
    hard: [
        "A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original.",
        "No meio da dificuldade encontra-se a oportunidade para crescer profissionalmente.",
        "A jornada de mil milhas começa com um único passo em direção ao horizonte infinito.",
        "A simplicidade é o último grau de sofisticação em qualquer projeto de engenharia moderna.",
        "O entusiasmo é a maior força da alma. Conserva-o e nunca te faltará poder para conseguir o que desejas."
    ]
};

let timer;
let timeLeft = 60;
let isPlaying = false;
let currentQuote = "";
let errors = 0;
let totalChars = 0;

const quoteDisplay = document.getElementById('quote-display');
const inputArea = document.getElementById('input-area');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');
const resetBtn = document.getElementById('reset-btn');
const difficultySelect = document.getElementById('difficulty');

function getRandomQuote() {
    const difficulty = difficultySelect.value;
    const selectedQuotes = quotes[difficulty];
    return selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];
}

function updateQuote() {
    currentQuote = getRandomQuote();
    quoteDisplay.innerHTML = '';
    currentQuote.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        quoteDisplay.appendChild(span);
    });
    inputArea.value = '';
}

function startTimer() {
    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerDisplay.innerText = timeLeft;
                calculateStats();
            } else {
                endGame();
            }
        }, 1000);
    }
}

function calculateStats() {
    const timeSpent = (60 - timeLeft) / 60;
    if (timeSpent > 0) {
        const wpm = Math.round((totalChars / 5) / timeSpent);
        wpmDisplay.innerText = wpm;
    }
    
    if (totalChars > 0) {
        const accuracy = Math.round(((totalChars - errors) / totalChars) * 100);
        accuracyDisplay.innerText = accuracy < 0 ? 0 : accuracy;
    }
}

function endGame() {
    clearInterval(timer);
    isPlaying = false;
    inputArea.disabled = true;
    alert(`Fim de jogo! Seu WPM: ${wpmDisplay.innerText} | Precisão: ${accuracyDisplay.innerText}%`);
}

inputArea.addEventListener('input', () => {
    if (!isPlaying && inputArea.value.length > 0) {
        startTimer();
    }

    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayValue = inputArea.value.split('');
    
    let currentErrors = 0;
    
    arrayQuote.forEach((span, index) => {
        const char = arrayValue[index];
        if (char == null) {
            span.classList.remove('correct');
            span.classList.remove('incorrect');
            span.classList.remove('current');
        } else if (char === span.innerText) {
            span.classList.add('correct');
            span.classList.remove('incorrect');
        } else {
            span.classList.add('incorrect');
            span.classList.remove('correct');
            currentErrors++;
        }
        
        if (index === arrayValue.length) {
            span.classList.add('current');
        } else {
            span.classList.remove('current');
        }
    });

    errors = currentErrors;
    totalChars = arrayValue.length;

    if (arrayValue.length >= currentQuote.length) {
        updateQuote();
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 60;
    isPlaying = false;
    errors = 0;
    totalChars = 0;
    inputArea.disabled = false;
    inputArea.value = '';
    timerDisplay.innerText = timeLeft;
    wpmDisplay.innerText = '0';
    accuracyDisplay.innerText = '100';
    updateQuote();
    inputArea.focus();
});

difficultySelect.addEventListener('change', () => {
    resetBtn.click();
});

// Inicializar
updateQuote();
