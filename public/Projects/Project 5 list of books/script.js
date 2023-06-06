window.onload = function () {
  console.log("App start");
  booksList.init();
};

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now(); //time
  }
}

class BooksList {
  constructor() {
    this.books = [];
  }

  init() {
    document
      .getElementById("saveButton")
      .addEventListener("click", (e) => this.saveButton(e));

    this.loadDataFromStorage();
  }

  loadDataFromStorage() {
    const data = storage.getItems();
    if (data == null || data == undefined) return;

    this.books = data;

    data.forEach((value, index) => {
      ui.addBookToTable(value);
    });
  }

  saveButton(e) {
    console.log("Save button");

    const author = document.getElementById("bookAuthor").value;
    const title = document.getElementById("bookTitle").value;

    if (author === "" || title === "") {
      console.log("blank data");
      return;
    }

    e.preventDefault();
    console.log("Autor: " + author + " Tytuł: " + title);
    const book = new Book(title, author);
    this.addBook(book);
  }

  addBook(book) {
    this.books.push(book);
    ui.addBookToTable(book);
    this.saveData();
  }

  removeBookById(bookId) {
    this.books.forEach((el, index) => {
      if (el.id == bookId) this.books.splice(index, 1);
    });
    this.saveData();
  }
  moveBookUp(bookId) {
    let arr = this.books;

    for (let a = 0; a < arr.length; a++) {
      let el = arr[a];

      if (el.id == bookId) {
        if (a >= 1) {
          let temp = arr[a - 1];
          arr[a - 1] = arr[a];
          arr[a] = temp;
          break;
        }
      }
    }
    this.saveData();
    ui.delateAllBookRows();
    this.loadDataFromStorage();
  }

  moveBookDown(bookId) {
    let arr = this.books;

    for (let a = 0; a < arr.length; a++) {
      let el = arr[a];

      if (el.id == bookId) {
        if (a <= arr.length - 2) {
          let temp = arr[a + 1];
          arr[a + 1] = arr[a];
          arr[a] = temp;
          break;
        }
      }
    }
    this.saveData();
    ui.delateAllBookRows();
    this.loadDataFromStorage();
  }

  saveData() {
    storage.saveItems(this.books);
  }
}

const booksList = new BooksList();

class Ui {
  deleteBook(e) {
    const bookId = e.target.getAttribute("data-book-id");
    e.target.parentElement.parentElement.remove();
    booksList.removeBookById(bookId);
  }

  delateAllBookRows() {
    const tbodyRows = document.querySelectorAll("#booksTable tbody tr");
    tbodyRows.forEach(function (el) {
      el.remove();
    });
  }

  UpBook(e) {
    const bookId = e.target.getAttribute("data-book-id");
    console.log("up", bookId);
    booksList.moveBookUp(bookId);
  }

  DownBook(e) {
    const bookId = e.target.getAttribute("data-book-id");
    console.log("down", bookId);
    booksList.moveBookDown(bookId);
  }

  addBookToTable(book) {
    const tbody = document.querySelector("#booksTable tbody");
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td> ${book.title}</td>
    <td> ${book.author}</td>
    <td> 
    <button type="button" data-book-id="${book.id}" class ="btn btn-danger btn-sm delete">Skasuj</button>
    
    <button type="button" data-book-id="${book.id}" class ="btn btn-info btn-sm Up"> 🢁 </button>
    <button type="button" data-book-id="${book.id}" class ="btn btn-info btn-sm Down"> 🢃 </button>
    </td>`;

    tbody.appendChild(tr);

    let deleteButton = document.querySelector(
      `button.delete[data-book-id='${book.id}']`
    );
    deleteButton.addEventListener("click", (e) => this.deleteBook(e));

    let UpButton = document.querySelector(
      `button.Up[data-book-id='${book.id}']`
    );
    UpButton.addEventListener("click", (e) => this.UpBook(e));

    let DownButton = document.querySelector(
      `button.Down[data-book-id='${book.id}']`
    );
    DownButton.addEventListener("click", (e) => this.DownBook(e));

    this.clearForm();
  }
  clearForm() {
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookForm").classList.remove("was-validated");
  }
}

const ui = new Ui();

class Storage {
  getItems() {
    let books = null;
    if (localStorage.getItem("books") !== null) {
      books = JSON.parse(localStorage.getItem("books"));
    } else {
      books = [];
    }
    return books;
  }
  saveItems(books) {
    localStorage.setItem("books", JSON.stringify(books));
  }
}

/*
storage.saveItems({a1:"test"});
storage.getItems()

*/
const storage = new Storage();

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
