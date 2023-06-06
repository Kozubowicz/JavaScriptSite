//NI4JYHXJ7GCF1HDL
//const url = https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesla&apikey=NI4JYHXJ7GCF1HDL;
window.onload = function () {
  autocomplete.init();
};

class Autocomplete {
  input = null;
  autoCompliteList = null;
  init() {
    this.input = document.querySelector(".input");
    this.autoCompliteList = document.querySelector(".auto-complite-list");

    this.input.addEventListener("input", (e) => {
      this.removeAllListItems();
      this.featchTickers();
    });
  }

  featchTickers() {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.input.value}&apikey=NI4JYHXJ7GCF1HDL`;

    if (!this.input.value) return;
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.parseData(data));
  }
  parseData(data) {
    console.log(data);

    if (!data.bestMatches) return;

    data.bestMatches.forEach((element) => {
      console.log(element);
      const name = element["1. symbol"] + " " + element["2. name"];
      const li = this.makeListItem(name);
      this.autoCompliteList.appendChild(li);
    });
  }
  makeListItem(data) {
    const li = document.createElement("li");
    li.classList.add("list-item");
    li.innerHTML = data;

    return li;
  }

  removeAllListItems() {
    this.autoCompliteList.innerHTML = "";
  }
}

const autocomplete = new Autocomplete();
