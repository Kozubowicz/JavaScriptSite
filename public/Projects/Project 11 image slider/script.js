let divisor = document.getElementById("divisor");
let slider = document.getElementById("slider-range");

function divisorChanged() {
  divisor.style.width = slider.value + "%";
}
