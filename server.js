const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8080;

// Ustawienie silnika szablonów EJS
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // Odczytaj nazwy folderów w katalogu public
  fs.readdir(path.join(__dirname, "public/Projects"), (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Wystąpił błąd");
    }

    // Filtruj tylko foldery
    let folders = files.filter((file) =>
      fs.statSync(path.join(__dirname, "public/Projects", file)).isDirectory()
    );
    //sortowanie folderów
    folders = customSort(folders);

    // Renderuj widok EJS z danymi folderów
    res.render("index", { folders });
  });
});
app.get("/projects/Project%2010%20Blog/", (req, res) => {
  const folderPath = path.join(__dirname, `public/Projects/Project 10 Blog/public/Posts`);
  const folders = getFoldersInfo(folderPath);
  res.render("../public/Projects/Project 10 Blog/views/index", { folders });
});

app.use((req, res, next) => {
  // Wyznaczanie ścieżki bazowej na podstawie położenia pliku index.html
  const indexPath = path.join(
    __dirname,
    "public/Projects/Project 25 - React TypeScript - Project 1 - Online shop",
    "index.html"
  );
  const basePath = path.dirname(indexPath);
  req.basePath = basePath;
  next();
});

// Endpoint dla konkretnej ścieżki
app.get("/projects/Project%25%-%React%TypeScript%-%Project%1%-%Online%shop/", (req, res) => {
  const indexPath = path.join(req.basePath, "index.html");
  res.sendFile(indexPath);
});

app.get("*", (req, res) => {
  res.status(404).sendFile(__dirname + "/public/Files/404.html");
});

// Start serwera
app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});

function customSort(arr) {
  const regex = /^Project (\d+)/; // Wyrażenie regularne dopasowujące liczbę po "Project "

  arr.sort(function (a, b) {
    const numA = parseInt(a.match(regex)[1]);
    const numB = parseInt(b.match(regex)[1]);

    if (numA === numB) {
      // Jeśli liczby są równe, sortujemy według kolejności leksykograficznej tytułów
      const titleA = a.replace(regex, "").trim();
      const titleB = b.replace(regex, "").trim();
      return titleA.localeCompare(titleB);
    } else {
      return numA - numB;
    }
  });

  return arr;
}

function getFoldersInfo(location) {
  const folders = [];

  const files = fs.readdirSync(location);
  files.forEach((file) => {
    const filePath = path.join(location, file);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      const subFolders = getFoldersInfo(filePath);
      folders.push(...subFolders);
    } else if (fileStat.isFile() && path.extname(file) === ".html") {
      const relativePath = path.relative(path.join(__dirname, "public"), filePath);
      const folderPath = path.dirname(relativePath);
      const folderName = path.basename(folderPath);
      const folder = {
        name: folderName,
        path: folderPath,
        htmlFile: relativePath,
      };
      folders.push(folder);
    }
  });

  return folders;
}
