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

function verifyAnswer() {
  const userAnswer = document.getElementById("ans").value;
  const currentQuestionElement = document.getElementById("question");
  const currentQuestion = currentQuestionElement.textContent;
  const correctAnswer = currentQuestionElement.getAttribute("answer");

  if (userAnswer.toLowerCase() == correctAnswer.toLowerCase()) {
    console.log("Correct!");
    showAlert("Correct");
  } else {
    console.log("Incorrect!");
    showAlert("Incorrect");
  }

  const nextQuestionButton = document.createElement("button");
  nextQuestionButton.textContent = "Next question";
  nextQuestionButton.id = "nextQuestion";
  nextQuestionButton.onclick = function() {
    showNewQuestion();
    nextQuestionButton.style.display = "none";
  };
  const panel = document.getElementById("panel");
  panel.appendChild(nextQuestionButton);
  document.getElementById("ans").value = "";


//   setTimeout(function () {
//     document.getElementById("ans").value = "";
//     showNewQuestion();
//   }, 10000);
}

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
  }, 100);
}

// document.addEventListener("click", function (e) {
//   if (!e.target.closest(".alert-box")) {
//     const alertBox = document.querySelector(".alert-box");
//     if (alertBox) {
//       alertBox.remove();
//     }
//   }
// });
