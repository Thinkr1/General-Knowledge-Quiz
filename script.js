document.addEventListener("DOMContentLoaded", function () {
  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      const questionElement = document.getElementById("question");
      const randomQuestionObj = data[Math.floor(Math.random() * data.length)];
      const randomQuestion = `${randomQuestionObj.category}: ${randomQuestionObj.question}`;
      questionElement.textContent = randomQuestion;
      questionElement.setAttribute("answer", randomQuestionObj.answer);
    });
});

let nextQuestionButton;

function verifyAnswer() {
  const userAnswer = document.getElementById("ans").value;
  const currentQuestionElement = document.getElementById("question");
  const currentQuestion = currentQuestionElement.textContent;
  const correctAnswer = currentQuestionElement.getAttribute("answer");

  if (userAnswer.toLowerCase() == correctAnswer.toLowerCase()) {
    console.log("Correct!");
    showAlert("Correct");
    nextQuestionButton = createNextQuestionButton();
    nextQuestionButton.style.backgroundColor = "#3fb541";
  } else {
    console.log("Incorrect!");
    showAlert("Incorrect");
    nextQuestionButton = createNextQuestionButton();
    nextQuestionButton.style.backgroundColor = "#b53f3f";
  }

  const panel = document.getElementById("panel");
  clearPreviousNextQuestionButton(panel);
  panel.appendChild(nextQuestionButton);
  document.getElementById("ans").value = "";
}

function clearPreviousNextQuestionButton(parentElement) {
  const previousNextQuestionButton =
    parentElement.querySelector("#nextQuestion");
  if (previousNextQuestionButton) {
    previousNextQuestionButton.remove();
  }
}

function createNextQuestionButton() {
  const nextQuestionButton = document.createElement("button");
  nextQuestionButton.textContent = "Next question";
  nextQuestionButton.id = "nextQuestion";
  nextQuestionButton.onclick = function () {
    showNewQuestion();
    clearPreviousNextQuestionButton(document.getElementById("panel"));
  };
  return nextQuestionButton;
}

//   setTimeout(function () {
//     document.getElementById("ans").value = "";
//     showNewQuestion();
//   }, 10000);

function showNewQuestion() {
  fetch("./questions.json")
    .then((response) => response.json())
    .then((data) => {
      const questionElement = document.getElementById("question");
      const randomQuestionObj = data[Math.floor(Math.random() * data.length)];
      const randomQuestion = `${randomQuestionObj.category}: ${randomQuestionObj.question}`;
      questionElement.textContent = randomQuestion;
      questionElement.setAttribute("answer", randomQuestionObj.answer);
    });
}

let correctAnswers = 0;
let incorrectAnswers = 0;

function showAlert(message) {
  const alertBox = document.querySelector(".alert-box");
  if (alertBox) {
    alertBox.remove();
  }
  const newAlertBox = document.createElement("div");
  newAlertBox.classList.add("alert-box");
  newAlertBox.textContent = message;
  document.body.appendChild(newAlertBox);
  setTimeout(function () {
    newAlertBox.classList.add("show");
    updateAnswerCounters(message);
  }, 100);
}

function updateAnswerCounters(message) {
  const answerCountElement = document.getElementById("answerCount");
  let userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || {
    correct: 0,
    incorrect: 0,
  };
  if (message === "Correct") {
    userAnswers.correct++;
  } else {
    userAnswers.incorrect++;
  }
  const totalAnswerCount = userAnswers.correct + userAnswers.incorrect;
  answerCountElement.textContent = `${userAnswers.correct} correct and ${userAnswers.incorrect} wrong (${totalAnswerCount} total)`;
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
}

// document.addEventListener("click", function (e) {
//   if (!e.target.closest(".alert-box")) {
//     const alertBox = document.querySelector(".alert-box");
//     if (alertBox) {
//       alertBox.remove();
//     }
//   }
// });
