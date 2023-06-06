let box = document.getElementById("document");
let clc = document.getElementById("clock");
let bt = document.getElementById("bt");

window.onload = function () {
  watch.init();
};

class Watch {
  init() {
    box.innerHTML += `<button type="button" class = "button zegar"> ZEGAR  </button>`;
    box.innerHTML += ` <button id ="stoper" class = "button stoper"> STOPER  </button> `;
    box.innerHTML += `<button id ="timer" class = "button timer"> TIMER  </button></br>`;

    let watchButton = document.querySelector(`button.zegar`);
    watchButton.addEventListener("click", (e) => ui.clock(e));

    let stoperButton = document.querySelector(`button.stoper`);
    stoperButton.addEventListener("click", (e) => ui.stoper(e));

    let timerButton = document.querySelector(`button.timer`);
    timerButton.addEventListener("click", (e) => ui.timer(e));
  }
}
const watch = new Watch();

class Ui {
  constructor() {
    let intervalID;
    let flag = 0;
  }

  clock() {
    clearInterval(this.intervalID);

    bt.innerHTML = "";
    let time = new Date();
    clc.innerHTML = time.toLocaleTimeString();

    this.intervalID = setInterval(function () {
      let time = new Date();
      clc.innerHTML = time.toLocaleTimeString();
    }, 1000);
  }

  stoper() {
    clearInterval(this.intervalID);
    ui.flag = 0;
    ui.start = Date.now() + 3600000;
    ui.pauza;
    ui.res = 0;

    let cc = new Date(0, 0);
    clc.innerHTML = cc.toLocaleTimeString();
    bt.innerHTML = `<button type="button" class = "button start"> START/PAUZA </buttons> `;
    bt.innerHTML += ` <button type="button" class = "button stop"> RESET </buttons>`;

    let startButton = document.querySelector(`button.start`);
    startButton.addEventListener("click", (e) => ui.count(e));

    let stopButton = document.querySelector(`button.stop`);
    stopButton.addEventListener("click", (e) => ui.reset(e));
  }

  count(e) {
    clearInterval(this.intervalID);
    console.log(ui.flag);

    if (ui.flag == 0 || ui.flag == undefined) {
      if (ui.res == 1) {
        ui.res = 0;
        ui.start = Date.now() + 3600000;
      }
      ui.flag = 1;
      let stop, elapsed;

      this.intervalID = setInterval(function () {
        elapsed = Date.now();
        stop = elapsed - ui.start;
        const end = new Date(stop);
        clc.innerHTML = end.toLocaleTimeString();
      }, 1000);
    } else {
      ui.flag = 0;
      this.intervalID = setInterval(function () {
        ui.start += 1000;
      }, 1000);
    }
  }

  reset() {
    ui.flag = 0;
    ui.res = 1;
    ui.start = Date.now() + 3600000;
    clearInterval(this.intervalID);
    let tmp = new Date(0, 0);
    clc.innerHTML = tmp.toLocaleTimeString();
  }

  timer() {
    clearInterval(this.intervalID);
    let tmp = new Date(0, 0, 0);
    clc.innerHTML =
      "Dni: " + tmp.getDay() + "</br> Czas: " + tmp.toLocaleTimeString();

    bt.innerHTML = `<input type="datetime-local" id="final-date-input" style="color:black;" class = "datetext"></input> `;
    bt.innerHTML += `<button onclick="ui.pobierzWartosc()" class = "button"> Pobierz date</button>`;
  }
  pobierzWartosc() {
    clearInterval(this.intervalID);
    let finalData = document.getElementById("final-date-input").value;

    this.intervalID = setInterval(function () {
      let tmp = Date.now();
      let countdown = new Date(finalData).getTime() - tmp;

      if (countdown <= 0) {
        clearInterval(this.intervalID);
        clc.innerHTML = `<h2>Koniec odliczania</h2>`;
      } else {
        let days = Math.floor(countdown / (24 * 60 * 60 * 1000));
        if (days < 10) {
          days = "0" + days;
        }
        let pozostaleMilisekundy = countdown - days * 24 * 60 * 60 * 1000;

        let hou = Math.floor(pozostaleMilisekundy / (60 * 60 * 1000));
        pozostaleMilisekundy = pozostaleMilisekundy - hou * 60 * 60 * 1000;
        if (hou < 10) {
          hou = "0" + hou;
        }
        let min = Math.floor(pozostaleMilisekundy / (60 * 1000));
        pozostaleMilisekundy = pozostaleMilisekundy - min * 60 * 1000;
        if (min < 10) {
          min = "0" + min;
        }
        let sec = Math.floor(pozostaleMilisekundy / 1000);
        if (sec < 10) {
          sec = "0" + sec;
        }
        clc.innerHTML =
          "Dni: " + days + "</br> Czas: " + hou + ":" + min + ":" + sec;
      }
    }, 1000);
  }
}
const ui = new Ui();
