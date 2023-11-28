const questions = [
  {
    question: "What is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Horse", correct: false },
      { text: "Elephant", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Europe", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Sahara", correct: false },
      { text: "Gobi", correct: false },
      { text: "Arabia", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Who is the Prime Minister of India?",
    answers: [
      { text: "Narendra Damodar Das Modi", correct: true },
      { text: "Manmohan Singh", correct: false },
      { text: "Amit Shah", correct: false },
      { text: "Rajnath Singh", correct: false },
    ],
  },
  {
    question: "Which is the largest country in the world?",
    answers: [
      { text: "Pakistan", correct: false },
      { text: "India", correct: false },
      { text: "China", correct: true },
      { text: "Nepal", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    // button.addEventListener("click", () => checkAnswer(answer.correct));
    answerButton.appendChild(button);
    if(answer.correct){
    button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
 nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

// function checkAnswer(correct) {
//   if (correct) {
//     score++;
//   }
//   if (currentQuestionIndex < questions.length - 1) {
//     currentQuestionIndex++;
//     showQuestion();
//   } else {
//     endQuiz();
//   }
// }

// function endQuiz() {
//   // Display the final score or any other end-of-quiz logic
//   alert("Quiz completed! Your score is: " + score);
// }

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore(){
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}


function handleNextButton (){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click", () =>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }
  else{
    startQuiz();
  }
});
startQuiz();