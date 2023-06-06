const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8080;

// Ustawienie silnika szablonów EJS
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  const folderPath = path.join(__dirname, `public/posts`);
  const folders = getFoldersInfo(folderPath);
  res.render("index", { folders });
});
app.get("*", (req, res) => {
  res.status(404).sendFile(__dirname + "/public/files/404.html");
});
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
      const relativePath = path.relative(
        path.join(__dirname, "public"),
        filePath
      );
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
app.get("*", (req, res) => {
  res.status(200).send("404 invalid url");
});
// Start serwera
app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
