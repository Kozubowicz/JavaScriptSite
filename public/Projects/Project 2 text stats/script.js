let textArea = document.getElementsByTagName("textarea")[0];

textArea.addEventListener("input", onChange);

function onChange(e) {
  const data = textArea.value;

  const numCharakters = data.length;
  document.getElementById("num-charakters").innerHTML = numCharakters;

  const numWords = data.replace(/[\r\n]/g, " ").split(" ").length;
  document.getElementById("num-words").innerHTML = numWords;

  const numSentences = data.split(".").length;
  document.getElementById("num-sentences").innerHTML = numSentences;
}
