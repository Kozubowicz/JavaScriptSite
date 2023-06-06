//let box = document.getElementById("document");
//box.innerHTML = val;
const url = "https://randomuser.me/api";

window.onload = function () {
  fetch(url)
    .then((response) => response.json())
    .then((data) => dataReady(data));
};

function dataReady(data) {
  console.log(data);
  var results = data.results[0];
  var fullname =
    results.name.title + " " + results.name.first + " " + results.name.last;
  document.getElementById("full-name").innerHTML = fullname;
  var img = results.picture.large;
  document.getElementById("avatar-img").src = img;

  var username = results.login.username;
  document.getElementById("username").innerHTML = "@" + username;

  var email = results.email;
  document.getElementById("email").innerHTML = email;

  var country = results.location.city;
  document.getElementById("country").innerHTML = country;
}
