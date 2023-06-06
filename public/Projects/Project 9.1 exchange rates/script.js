const url = `http://api.nbp.pl/api/exchangerates/tables/a/last?format=json`;

window.onload = function () {
  google.charts.load("current", { packages: ["corechart"] });
  ui.init();
};

window.addEventListener("resize", (e) => chart.drawChart());

window.addEventListener("shown.bs.modal", (e) => ui.initChart());

class Ui {
  endDate = null;
  startDate = null;
  modalWindow = null;

  code = null;

  init() {
    this.initTable();
    this.initModal();
  }

  initTable() {
    const url = `http://api.nbp.pl/api/exchangerates/tables/a/last?format=json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => table.updateRates(data));
  }

  initModal() {
    this.modalWindow = new bootstrap.Modal(
      document.getElementById("modalWindow")
    );
    document
      .getElementById("codeCheckButton")
      .addEventListener("click", (e) => this.getChart(e));
  }

  initChart() {
    this.endDate = new Date();
    let endDataField = document.getElementById("end-date");
    this.endDate = this.endDate.toISOString().substring(0, 10);
    endDataField.value = this.endDate;

    this.startDate = new Date(new Date() - 90 * 24 * 60 * 60 * 1000);
    let startDataField = document.getElementById("start-date");
    this.startDate = this.startDate.toISOString().substring(0, 10);
    startDataField.value = this.startDate;
    this.getChart();
  }
  getChart() {
    chart.getData(
      this.code,
      document.getElementById("start-date").value,
      document.getElementById("end-date").value
    );
  }
}
const ui = new Ui();

class Table {
  currencyData = [];
  num = null;
  date = null;

  updateRates(data) {
    this.currencyData = data[0].rates;
    this.num = data[0].no;
    this.date = data[0].effectiveDate;
    console.log(data);
    this.printTable();
  }

  printTable() {
    document.getElementById(
      "document"
    ).innerHTML = `Tabela kursów walut NBP nr: ${this.num} z dnia: ${this.date} <br>`;

    for (let [lp, el] of this.currencyData.entries()) {
      let tr = document.createElement("tr");
      tr.innerHTML = `       
          <td>${lp}.</td>
          <td>${el.currency}</td>
          <td>${el.code}</td>
          <td>${el.mid}</td>        
    `;

      let tableContainer = document.querySelector("#currentTable tbody");

      tr.addEventListener("click", function () {
        let name = this.cells[2].textContent;
        ui.code = name;
        ui.modalWindow.toggle();
      });
      tableContainer.appendChild(tr);
    }
  }
}
const table = new Table();

class Chart {
  data;
  chart;

  options = {
    //title: "Wykres liniowy",
    curveType: "linear",
    legend: {
      position: "bottom",
      textStyle: { color: "#00FF00" },
    },
    colors: ["#00FF00"],

    backgroundColor: "black",
    hAxis: {
      textStyle: {
        color: "#00FF00", // Kolor tekstu osi X
      },
    },
    vAxis: {
      textStyle: {
        color: "#00FF00", // Kolor tekstu osi Y
      },
    },
  };

  getData(code, startDate, endDate) {
    const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/${startDate}/${endDate}/?format=json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => chart.updateChart(data));
  }

  updateChart(date) {
    console.log(date);

    this.data = new google.visualization.DataTable();
    this.data.addColumn("string", "Data");
    this.data.addColumn("number", date.code.toUpperCase() + " (wartość w PLN)");

    for (let [lp, el] of date.rates.entries()) {
      this.data.addRows([[date.rates[lp].effectiveDate, date.rates[lp].mid]]);
    }
    this.drawChart();
  }

  drawChart() {
    this.chart = new google.visualization.LineChart(
      document.getElementById("chart_div")
    );
    this.chart.draw(this.data, this.options);
  }
}
const chart = new Chart();
