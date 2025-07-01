const StartButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

StartButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  StartButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  quizScore = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';

  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === 'true');
  });

  if (correct) {
    quizScore++;
  }

  document.getElementById('right-answers').innerText = quizScore;

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    StartButton.innerText = 'Restart';
    StartButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'Which one of these is a JavaScript framework?',
    answers: [
      { text: 'Python', correct: false },
      { text: 'Django', correct: false },
      { text: 'React', correct: true },
      { text: 'Eclipse', correct: false }
    ]
  },
  {
    question: 'Who is the PM of India?',
    answers: [
      { text: 'Narendra Modi', correct: true },
      { text: 'Gandhi', correct: false },
      { text: 'Stalin', correct: false },
      { text: 'Vijay', correct: false }
    ]
  },
  {
    question: 'Who is the Father of the Nation?',
    answers: [
      { text: 'Gandhi', correct: true },
      { text: 'Surya', correct: false },
      { text: 'Nehru', correct: false },
      { text: 'Modi', correct: false }
    ]
  }
];
