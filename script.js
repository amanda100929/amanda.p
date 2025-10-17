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
const usernameInput = document.createElement('input'); // Campo para inserir nome de usuário

// Adicionando campo de nome de usuário
if (!localStorage.getItem("username")) {
  const usernameLabel = document.createElement('label');
  usernameLabel.textContent = "Digite seu nome para começar:";
  document.querySelector('.quiz-container').prepend(usernameLabel);
  
  usernameInput.type = "text";
  usernameInput.placeholder = "Nome de usuário";
  document.querySelector('.quiz-container').prepend(usernameInput);
  
  const startButton = document.createElement('button');
  startButton.textContent = "Começar";
  startButton.addEventListener('click', startQuiz);
  document.querySelector('.quiz-container').prepend(startButton);
  
  function startQuiz() {
    const username = usernameInput.value.trim();
    if (username === "") {
      alert("Por favor, digite um nome!");
      return;
    }
    localStorage.setItem('username', username);
    loadQuestion();
    startButton.style.display = "none";
    usernameInput.style.display = "none";
    usernameLabel.style.display = "none";
  }
} else {
  loadQuestion();
}

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
    showResult();
  }
});

function showResult() {
  const username = localStorage.getItem('username');
  
  // Armazenando o resultado no localStorage
  const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
  ranking.push({ username, score });
  ranking.sort((a, b) => b.score - a.score); // Ordenando pela pontuação
  localStorage.setItem('ranking', JSON.stringify(ranking));

  alert(`Fim do quiz, ${username}! Você acertou ${score} de ${questions.length} perguntas.`);
  
  // Exibindo o ranking
  showRanking(ranking);
  resetQuiz();
}

function showRanking(ranking) {
  let rankingList = "<h3>Ranking:</h3><ol>";
  ranking.forEach((entry, index) => {
    rankingList += `<li>${index + 1}. ${entry.username} - ${entry.score} pontos</li>`;
  });
  rankingList += "</ol>";
  document.querySelector('.quiz-container').innerHTML += rankingList;
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}
