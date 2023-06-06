let box = document.getElementById("calculator");

window.onload = function () {
  console.log("run");
  calculator.init();
};

let calculator = {
  buttons: undefined,
  input: undefined,

  init: function () {
    this.buttons = document.querySelectorAll(
      ".numers button, .operators button"
    );
    //console.log(this.buttons);

    this.input = document.getElementById("input");
    for (let i = 0; i < this.buttons.length; i++) {
      let el = this.buttons[i];
      el.addEventListener("click", this.buttonClick);
    }
  },

  buttonClick: function (e) {
    let divHTMLText = e.target.innerHTML;
    console.log("click" + divHTMLText);

    switch (divHTMLText) {
      case "=":
        calculator.evaluate();
        break;
      case "c":
        calculator.input.value = "";
        break;
      default:
        calculator.addToInput(divHTMLText);
        break;
    }
  },
  addToInput: function (str) {
    this.input.value += str;
  },
  evaluate: function () {
    let res = math.evaluate(calculator.input.value);
    calculator.input.value = res;
  },
};
