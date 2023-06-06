window.onload = function () {
  fetch("questions.txt")
    .then((response) => response.text())
    .then((data) => quiz.init(data));
};

class Quiz {
  questions = [];
  currentQuestionIndex = -1;
  heading = null;
  questionParagraph = null;
  answer0 = null;
  answer1 = null;
  answer2 = null;
  answer3 = null;
  correctAnswerNum = null;
  userSelectedInput = null;
  userCorrectAnswers = 0;
  userInCorrectAnswers = 0;
  saveButton = null;
  nextButton = null;
  modalWindow = null;

  init(data) {
    const lines = data.split("\n");

    for (let i = 0; i < lines.length / 6; i++) {
      const tmp = { q: null, answers: [], correctAnswerNum: null };
      tmp.q = lines[0 + i * 6];
      tmp.answers[0] = lines[1 + i * 6];
      tmp.answers[1] = lines[2 + i * 6];
      tmp.answers[2] = lines[3 + i * 6];
      tmp.answers[3] = lines[4 + i * 6];
      tmp.correctAnswerNum = +lines[5 + i * 6];

      this.questions.push(tmp);
    }

    this.heading = document.querySelector(".alert-heading");
    this.answer0 = document.querySelector("#answer0");
    this.answer1 = document.querySelector("#answer1");
    this.answer2 = document.querySelector("#answer2");
    this.answer3 = document.querySelector("#answer3");
    this.questionParagraph = document.querySelector("#question");
    this.saveButton = document.querySelector("#saveButton");
    this.nextButton = document.querySelector("#nextButton");
    this.setNextQuestionData();

    this.saveButton.addEventListener("click", this.checkAnswer);
    this.nextButton.addEventListener("click", this.setNextQuestionData);

    this.initModal();
  }

  initModal = () => {
    this.modalWindow = new bootstrap.Modal(
      document.getElementById("modalWindow")
    );
    document
      .getElementById("closeModal")
      .addEventListener("click", this.restartQuiz);
  };

  checkAnswer = () => {
    this.userSelectedInput = document.querySelector(
      "input[type='radio']:checked"
    );
    if (!this.userSelectedInput) return;
    const selectedIndex = this.userSelectedInput.getAttribute("data-index");
    if (selectedIndex == this.correctAnswerNum) {
      //prawidłowa
      this.userCorrectAnswers++;
      console.log(this.userCorrectAnswers);
      this.userSelectedInput.classList.add("is-valid");
    } else {
      //nieprawidłowa
      this.userInCorrectAnswers++;
      this.userSelectedInput.classList.add("is-invalid");
    }
    this.setUserStats();

    this.saveButton.classList.add("disabled");
    this.nextButton.classList.remove("disabled");
  };

  setUserStats = () => {
    document.getElementById("correctAnswers").innerHTML =
      this.userCorrectAnswers;

    document.getElementById("inCorrectAnswers").innerHTML =
      this.userInCorrectAnswers;
  };

  setNextQuestionData = () => {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      console.log("Koniec quizu");
      this.showModalResults();
      return;
    }
    const question = this.questions[this.currentQuestionIndex];
    const qStr = `Pytanie ${this.currentQuestionIndex + 1} z ${
      this.questions.length
    }`;

    this.heading.innerHTML = qStr + " : " + question.q;
    this.answer0.innerHTML = question.answers[0];
    this.answer1.innerHTML = question.answers[1];
    this.answer2.innerHTML = question.answers[2];
    this.answer3.innerHTML = question.answers[3];
    this.correctAnswerNum = question.correctAnswerNum;

    document.querySelectorAll("input[type ='radio']").forEach((el) => {
      el.classList.remove("is-valid");
      el.classList.remove("is-invalid");
      el.checked = false;
    });

    this.nextButton.classList.add("disabled");
    this.saveButton.classList.remove("disabled");
  };

  showModalResults = () => {
    const modalParagraf = document.getElementById("modalResults");
    let information;
    if (this.userCorrectAnswers >= this.userInCorrectAnswers) {
      information = "Brawo! Przynajniej połowa z odpowiedzi jest prawidłowa.";
    } else {
      information = "Niestety, mniej niż połowa odpowiedzi jest prawidłowa.";
    }
    information += `</br></br>Prawidłowe odpowiedzi: ${this.userCorrectAnswers}
    </br>Błędne odpowiedzi: ${this.userInCorrectAnswers}`;

    modalParagraf.innerHTML = information;

    this.modalWindow.toggle();
  };

  restartQuiz = () => {
    this.currentQuestionIndex = -1;
    this.userCorrectAnswers = 0;
    this.userInCorrectAnswers = 0;
    this.setUserStats();
    this.setNextQuestionData();
  };
}
const quiz = new Quiz();
