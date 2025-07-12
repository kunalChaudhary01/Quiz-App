const questions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "New Delhi", correct: true },
      { text: "Mumbai", correct: false },
      { text: "Bangalore", correct: false },
      { text: "Hyderabad", correct: false }
    ]
  },
  {
    question: "Which HTML tag is used for a paragraph?",
    answers: [
      { text: "<div>", correct: false },
      { text: "<p>", correct: true },
      { text: "<span>", correct: false },
      { text: "<h1>", correct: false }
    ]
  },
  {
    question: "Which CSS property is used to change text color?",
    answers: [
      { text: "text-color", correct: false },
      { text: "background-color", correct: false },
      { text: "color", correct: true },
      { text: "font-style", correct: false }
    ]
  },
  {
    question: "What does JS stand for?",
    answers: [
      { text: "JavaScript", correct: true },
      { text: "JavaSource", correct: false },
      { text: "JScript", correct: false },
      { text: "None of the above", correct: false }
    ]
  },
  {
    question: "Which symbol is used for comments in JS?",
    answers: [
      { text: "//", correct: true },
      { text: "/*", correct: false },
      { text: "<!--", correct: false },
      { text: "#", correct: false }
    ]
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Digital Output Method", correct: false },
      { text: "Data Object Management", correct: false },
      { text: "None", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 60;
let interval;
let inMemoryScores = JSON.parse(sessionStorage.getItem('quizScores')) || [];


const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const resultContainer = document.getElementById('result-container');
const finalScore = document.getElementById('final-score');
const allScoresList = document.getElementById('all-scores');
const usernameInput = document.getElementById('username');

function startQuiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.textContent = answer.text;
    btn.classList.add('btn');
    btn.onclick = () => selectAnswer(answer.correct, btn);
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  answerButtons.innerHTML = '';
  nextBtn.style.display = 'none';
}

function selectAnswer(correct, button) {
  const buttons = document.querySelectorAll('#answer-buttons button');
  buttons.forEach(btn => btn.disabled = true);

  if (correct) {
    score += 10;
    button.classList.add('correct');
  } else {
    button.classList.add('wrong');
  }

  scoreEl.textContent = score;
  nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function startTimer() {
  interval = setInterval(() => {
    timer--;
    timerEl.textContent = timer;
    if (timer === 0) {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(interval);
  document.getElementById('question-container').classList.add('hide');
  document.getElementById('controls').classList.add('hide');
  resultContainer.classList.remove('hide');
  finalScore.textContent = score;
  loadAllScores();
}

function saveScore() {
  const username = usernameInput.value.trim();
  if (username === "") {
    alert("Please enter your name before saving.");
    return;
  }

  inMemoryScores.push({ name: username, score: score });
  sessionStorage.setItem('quizScores', JSON.stringify(inMemoryScores)); // 🟢 Save in sessionStorage
  usernameInput.value = "";
  loadAllScores();
}

function loadAllScores() {
  allScoresList.innerHTML = '';

  if (inMemoryScores.length === 0) {
    allScoresList.innerHTML = '<li>No scores yet</li>';
    return;
  }

  inMemoryScores.slice().reverse().forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.name} - ${entry.score}`;
    allScoresList.appendChild(li);
  });
}


startQuiz();

// document.getElementById('save-scorre-btn').addEventListener('click', saveScore);
// document.getElementById('clear-scores-btn').addEventListener('click', () => {
//   inMemoryScores = [];
//   loadAllScores();
// });
