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

let NQB;

function verifyAnswer() {
  const userAnswer = document.getElementById("ans").value;
  const currentQuestionElement = document.getElementById("question");
  const currentQuestion = currentQuestionElement.textContent;
  const correctAnswer = currentQuestionElement.getAttribute("answer");

  if (userAnswer.toLowerCase() == correctAnswer.toLowerCase()) {
    console.log("Correct!");
    showAlert("Correct!");
    NQB = createNQB();
    NQB.style.backgroundColor = "#3fb541"; // greenish
  } else {
    console.log("Incorrect!");
    showAlert("Incorrect!");
    NQB = createNQB();
    NQB.style.backgroundColor = "#b53f3f"; // reddish
  }

  const panel = document.getElementById("panel");
  clearNQB(panel);
  panel.appendChild(NQB);
  document.getElementById("ans").value = "";
}

function clearNQB(parentElement) {
  const previousNQB =
    parentElement.querySelector("#nextQuestion");
  if (previousNQB) {
    previousNQB.remove();
  }
}

function createNQB() {
  const NQB = document.createElement("button");
  NQB.textContent = "Next question";
  NQB.id = "nextQuestion";
  NQB.onclick = function () {
    showNQ();
    clearNQB(document.getElementById("panel"));
  };
  return NQB;
}

//   setTimeout(function () {
//     document.getElementById("ans").value = "";
//     showNQ();
//   }, 10000);

function showNQ() {
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
  const alertBx = document.createElement("div");
  alertBx.classList.add("alert-box");
  alertBx.textContent = message;
  document.body.appendChild(alertBx);
  setTimeout(function () {
    alertBx.classList.add("show");
    updateAnswerCounters(message);
  }, 100);
}

function updateAnswerCounters(message) {
  const answerCountElement = document.getElementById("answerCount");
  let userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || {
    correct: 0,
    incorrect: 0,
  };
  if (message === "Correct!") {
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
