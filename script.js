let currentGame = null;
let timers = { math: 180, word: 120, trivia: 150 };
let scores = { math: 0, word: 0, trivia: 0 };
let intervals = { math: null, word: null, trivia: null };

function loadGame(game) {
    if (currentGame) {
        document.getElementById(`${currentGame}-game`).classList.add('hidden');
        clearInterval(intervals[currentGame]);
    }
    currentGame = game;
    document.getElementById(`${game}-game`).classList.remove('hidden');
    startGame(game);
}

function startGame(game) {
    timers[game] = game === 'math' ? 180 : game === 'word' ? 120 : 150;
    scores[game] = 0;
    document.getElementById(`${game}-score`).textContent = 0;
    document.getElementById(`${game}-time`).textContent = formatTime(timers[game]);
    intervals[game] = setInterval(() => updateTimer(game), 1000);
    generateQuestion(game);
}

function updateTimer(game) {
    timers[game]--;
    document.getElementById(`${game}-time`).textContent = formatTime(timers[game]);
    if (timers[game] <= 0) {
        clearInterval(intervals[game]);
        alert(`Game over! Your score is ${scores[game]}`);
    }
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function generateQuestion(game) {
    if (game === 'math') {
        let num1 = Math.floor(Math.random() * 100);
        let num2 = Math.floor(Math.random() * 100);
        let operator = Math.random() > 0.5 ? '+' : '-';
        document.getElementById('math-question').textContent = `What is ${num1} ${operator} ${num2}?`;
        window.currentMathAnswer = operator === '+' ? num1 + num2 : num1 - num2;
    } else if (game === 'word') {
        let words = ["apple", "banana", "cherry", "date", "elderberry"];
        let word = words[Math.floor(Math.random() * words.length)];
        let scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
        document.getElementById('word-question').textContent = `Unscramble: ${scrambled}`;
        window.currentWordAnswer = word;
    } else if (game === 'trivia') {
        let questions = [
            { question: "What is the capital of France?", answer: "Paris" },
            { question: "What is 2 + 2?", answer: "4" },
            { question: "What is the largest planet?", answer: "Jupiter" }
        ];
        let trivia = questions[Math.floor(Math.random() * questions.length)];
        document.getElementById('trivia-question').textContent = trivia.question;
        window.currentTriviaAnswer = trivia.answer;
    }
}

function checkMathAnswer() {
    let userAnswer = parseInt(document.getElementById('math-answer').value);
    let feedback = document.getElementById('math-feedback');
    if (userAnswer === window.currentMathAnswer) {
        scores.math += 3;
        feedback.textContent = "Correct!";
        feedback.className = "feedback correct";
    } else {
        scores.math -= 1;
        feedback.textContent = `Wrong! The correct answer was ${window.currentMathAnswer}.`;
        feedback.className = "feedback wrong";
    }
    document.getElementById('math-score').textContent = scores.math;
    document.getElementById('math-answer').value = '';
    generateQuestion('math');
}

function checkWordAnswer() {
    let userAnswer = document.getElementById('word-answer').value.toLowerCase();
    let feedback = document.getElementById('word-feedback');
    if (userAnswer === window.currentWordAnswer) {
        scores.word += 3;
        feedback.textContent = "Correct!";
        feedback.className = "feedback correct";
    } else {
        scores.word -= 1;
        feedback.textContent = `Wrong! The correct answer was ${window.currentWordAnswer}.`;
        feedback.className = "feedback wrong";
    }
    document.getElementById('word-score').textContent = scores.word;
    document.getElementById('word-answer').value = '';
    generateQuestion('word');
}

function checkTriviaAnswer() {
    let userAnswer = document.getElementById('trivia-answer').value.trim().toLowerCase();
    let feedback = document.getElementById('trivia-feedback');
    if (userAnswer === window.currentTriviaAnswer.toLowerCase()) {
        scores.trivia += 3;
        feedback.textContent = "Correct!";
        feedback.className = "feedback correct";
    } else {
        scores.trivia -= 1;
        feedback.textContent = `Wrong! The correct answer was ${window.currentTriviaAnswer}.`;
        feedback.className = "feedback wrong";
    }
    document.getElementById('trivia-score').textContent = scores.trivia;
    document.getElementById('trivia-answer').value = '';
    generateQuestion('trivia');
}
