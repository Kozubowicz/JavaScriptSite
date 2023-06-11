window.onload = function () {
  //iniclalizacja biblioteki google charts
  google.charts.load("current", { packages: ["corechart"] });

  ui.init();
};

window.addEventListener("resize", (e) => chart.drawChart());

class Ui {
  endDate = null;
  startDate = null;

  init() {
    this.getList();

    document
      .getElementById("codeCheckButton")
      .addEventListener("click", (e) => this.codeCheckButton(e));
  }

  getList() {
    this.endDate = new Date();
    let endDataField = document.getElementById("end-date");
    this.endDate = this.endDate.toISOString().substring(0, 10);
    endDataField.value = this.endDate;

    this.startDate = new Date(new Date() - 90 * 24 * 60 * 60 * 1000);
    let startDataField = document.getElementById("start-date");
    this.startDate = this.startDate.toISOString().substring(0, 10);
    startDataField.value = this.startDate;

    const url = `http://api.nbp.pl/api/exchangerates/tables/a/last?format=json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setList(data));
  }

  setList(data) {
    let lista = document.getElementById("moja-lista");

    const rates = data[0].rates;

    for (let [lp, el] of rates.entries()) {
      const opcja = document.createElement("option");
      opcja.textContent = rates[lp].code;
      lista.appendChild(opcja);
    }

    lista.value = "EUR";
    console.log("Stworzono listę walut ");
    chart.getData(
      document.getElementById("moja-lista").value,
      document.getElementById("start-date").value,
      document.getElementById("end-date").value
    );
  }

  codeCheckButton() {
    console.log(document.getElementById("start-date").value);

    chart.getData(
      document.getElementById("moja-lista").value,
      document.getElementById("start-date").value,
      document.getElementById("end-date").value
    );
  }
}
const ui = new Ui();

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
    console.log("Przesłano kod waluty: " + code);
    const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/${startDate}/${endDate}/?format=json`;
    //const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/2023-05-01/2023-05-31/?format=json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => chart.updateChart(data));
  }

  updateChart(date) {
    console.log(date);
    document.getElementById("currencyData").innerHTML = `Waluta: ${
      date.currency
    } (${date.code.toUpperCase()})`;

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
