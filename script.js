document.addEventListener("DOMContentLoaded", () => {
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

let tryCount = 0;
let answered = false;
let correct = false;

function verifyAnswer() {
  correct = false;
  if (answered) {
    return;
  }

  const userAnswer = document.getElementById("ans").value;
  const currentQuestionElement = document.getElementById("question");
  const currentQuestion = currentQuestionElement.textContent;
  const correctAnswer = currentQuestionElement.getAttribute("answer");

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    console.log("Correct!");
    showAlert("Correct!");
    NQB = createNQB();
    NQB.style.backgroundColor = "#3FB541"; // greenish
    answered = true;
    correct = true;
  } else {
    tryCount++;
    if (tryCount < 3) {
      console.log("Incorrect! Try again.");
      showAlert(`Incorrect! Try again. Tries left: ${3 - tryCount}`);
    } else {
      console.log("Incorrect! Showing correct answer.");
      showAlert(`Incorrect! The correct answer is: ${correctAnswer}.`);
      NQB = createNQB();
      NQB.style.backgroundColor = "#B53F3F"; // reddish
      answered = true;
      correct = false;
      document.getElementById("ans").disabled = true;
      const panel = document.getElementById("panel");
      clearNQB(panel);
      panel.appendChild(NQB);
    }
  }

  if (!answered && tryCount === 3 || correct === true) {
    // If user has exceeded 3 tries, disable the answer input and show the "Next question" button
    document.getElementById("ans").disabled = true;
    NQB = createNQB();
    NQB.style.backgroundColor = correct ? "#3FB541" : "#E65454";
    const panel = document.getElementById("panel");
    clearNQB(panel);
    panel.appendChild(NQB);
  }
}

function showNQ() {
  answered = false;
  tryCount = 0;
  document.getElementById("ans").disabled = false;
  document.getElementById("ans").value = "";
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

function clearNQB(parentElement) {
  const previousNQB = parentElement.querySelector("#nQ");
  if (previousNQB) {
    previousNQB.remove();
  }
}

function createNQB() {
  const NQB = document.createElement("button");
  NQB.textContent = "Next question";
  NQB.id = "nQ";
  NQB.onclick = () => {
    showNQ();
    clearNQB(document.getElementById("panel"));
    hideAlert();
  };
  return NQB;
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

function hideAlert() {
  const alertBox = document.querySelector(".alert-box");
  if (alertBox) {
    alertBox.classList.remove("show");
    setTimeout(() => {
      alertBox.remove();
    }, 250);
  }
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
