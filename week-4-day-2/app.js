document.getElementById("active").style.color = "#4fb2ad";
document.getElementsByTagName("footer")[0].style.backgroundColor = "#fff";
document.querySelector(".container").style.background = "#fff";
document.querySelectorAll("li")[0].style.background = "#fff";

const specs = document.getElementById("specs");
const li = document.createElement("li");

li.textContent = "Up to 5 hours";

specs.appendChild(li);

document.getElementById("submit").addEventListener("click", sayHey);
document.getElementById("cta").addEventListener("click", changeText);

const firstHeadingTitle = document.querySelector(".first-heading");

function sayHey() {
  alert("Bili na!");
}

function changeText() {
  firstHeadingTitle.textContent = "OLD ERA";
}
