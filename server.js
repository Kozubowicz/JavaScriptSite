const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8080;

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // Read the folder names in the public directory
  fs.readdir(path.join(__dirname, "public/Projects"), (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Wystąpił błąd");
    }

    let folders = files.filter((file) =>
      fs.statSync(path.join(__dirname, "public/Projects", file)).isDirectory()
    );

    //Folder sorting
    folders = customSort(folders);
    res.render("index", { folders });
  });
});
app.get("/projects/Project%2010%20Blog/", (req, res) => {
  const folderPath = path.join(__dirname, `public/Projects/Project 10 Blog/public/Posts`);
  const folders = getFoldersInfo(folderPath);
  res.render("../public/Projects/Project 10 Blog/views/index", { folders });
});

app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public/Files/404.html"));
});

// Server start-up
app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});

function customSort(arr) {
  const regex = /^Project (\d+)/; //Regular expression to match the number after "Project "

  arr.sort(function (a, b) {
    const numA = parseInt(a.match(regex)[1]);
    const numB = parseInt(b.match(regex)[1]);

    if (numA === numB) {
      const titleA = a.replace(regex, "").trim();
      const titleB = b.replace(regex, "").trim();
      return titleB.localeCompare(titleA);
    } else {
      return numB - numA;
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
