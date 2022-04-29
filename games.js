const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which bird can fly backwards?",
    choice1: "Nightjars",
    choice2: "Hummingbirds",
    choice3: "Shorebirds",
    choice4: "Mousebirds",
    answer: 2
  },
  {
    question: "The World Largest desert is?",
    choice1: "Thar",
    choice2: "Kalahari",
    choice3: "Sahara",
    choice4: "Sonoran",
    answer: 3
  },
  {
    question: "The most popular dog breed is?",
    choice1: "Labrador Retriever",
    choice2: "French Bulldog",
    choice3: "German Shepherd",
    choice4: "Golden Retriever",
    answer: 1
  },
  {
    question:
      "Which of these is the largest animal?",
    choice1: "African Elephant",
    choice2: "Blue Whale",
    choice3: "Giraffe",
    choice4: "Colossal Squid",
    answer: 2
  },
  {
    question: "Which country has the largest capacity reservoir in the world?",
    choice1: "Egypt",
    choice2: "United States",
    choice3: "Uganda",
    choice4: "Brazil",
    answer: 3
  },
  {
    question: "Which state is known as the “Beehive State”?",
    choice1: "North Dakota",
    choice2: "Oregon",
    choice3: "Georgia",
    choice4: "Utah",
    answer: 4
  },
  {
    question:
      "A collection of hundreds of stars around a common centre is called a:",
    choice1: "Solar system",
    choice2: "Galaxy",
    choice3: "Light year",
    choice4: "Black hole",
    answer: 2
  },
  {
    question: "One of these words does not belong. Find the odd word out.",
    choice1: "Baseball",
    choice2: "Volleyball",
    choice3: "Soccer",
    choice4: "Swimming",
    answer: 4
  },
  {
    question:
      "Which animal is said to have nine lives?",
    choice1: "Tiger",
    choice2: "Wolve",
    choice3: "Eagle",
    choice4: "Cat",
    answer: 4
  },
  {
    question: "Which Animal eats the most?",
    choice1: "Lions",
    choice2: "Elephant",
    choice3: "Blue Whale",
    choice4: "Polar Bear",
    answer: 3
  }
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // sets the most recent score

    return window.location.assign("end.html");
    // moves to end.html page
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  // randomly selects questions

  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
