// Definindo as perguntas e respostas
const questions = [
  {
    question: "Quanto é 5 + 3?",
    options: [6, 7, 8, 9],
    correctAnswer: 8,
  },
  {
    question: "Quanto é 12 - 7?",
    options: [5, 6, 7, 4],
    correctAnswer: 5,
  },
  {
    question: "Quanto é 9 × 3?",
    options: [27, 18, 30, 25],
    correctAnswer: 27,
  },
  {
    question: "Quanto é 15 ÷ 3?",
    options: [4, 5, 6, 7],
    correctAnswer: 5,
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const feedbackMessage = document.getElementById('feedback-message');
const nextButton = document.getElementById('next-button');

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach((option) => {
    const optionButton = document.createElement('button');
    optionButton.textContent = option;
    optionButton.classList.add('option');
    optionButton.addEventListener('click', () => checkAnswer(option));
    optionsContainer.appendChild(optionButton);
  });

  feedbackElement.classList.add('hidden');
  nextButton.classList.add('hidden');
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
    feedbackMessage.textContent = 'Resposta correta!';
    feedbackElement.classList.remove('hidden');
    feedbackElement.classList.add('correct');
  } else {
    feedbackMessage.textContent = 'Resposta errada!';
    feedbackElement.classList.remove('hidden');
    feedbackElement.classList.add('wrong');
  }

  nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    alert(`Fim do quiz! Você acertou ${score} de ${questions.length} perguntas.`);
    resetQuiz();
  }
});

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

loadQuestion();
