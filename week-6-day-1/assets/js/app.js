//get temperature of current location
fetch("http://ip-api.com/json/")
  .then((respoonse) => {
    return respoonse.json();
  })
  .then((json) => {
    //start with long lat
    const myCity = json.city;
    const lat = json.lat;
    const lon = json.lon;
    const myApi = "398108a636fee5a9e614e25f4196227e";
    document.getElementById("city").innerHTML = myCity;
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=hourly,daily&appid=" +
        myApi +
        ""
    )
      .then((respoonse) => {
        return respoonse.json();
      })
      .then((json) => {
        const degreeCode = "&#176";
        document.getElementById("temp").innerHTML =
          Math.floor(json.current.temp - 273.15) + degreeCode;
      });
  });

//get date time now
const date = new Date();
const hrs = date.getHours();
const mn = date.getMinutes();
const local = date.toLocaleTimeString([], { timeStyle: "short" });
document.getElementById("time_now").innerHTML = local;

// random quotes start
var quotes = [
  '"The greatest glory in living lies not in never falling, but in rising every time we fall."<br><br> <span class="author">-Nelson Mandela</span>',
  '"The way to get started is to quit talking and begin doing."<br><br> <span class="author">-Walt Disney</span>',
  '"Your time is limited, so do not waste it living someone else is life. Do not be trapped by dogma – which is living with the results of other peoples thinking."<br><br> <span class="author">-Steve Jobs</span>',
  '"If you look at what you have in life, you will always have more. If you look at what you do not have in life, you will never have enough."<br><br> <span class="author">-Oprah Winfrey</span>',
];
const randomNumber = Math.floor(Math.random() * quotes.length);
document.getElementById("quote").innerHTML = quotes[randomNumber];
//random qoutes end

function next(target) {
  const input = target.previousElementSibling;
  const bgRight = document.querySelector("#main .column-right");

  const showTime = document.getElementById("time_now");
  const showErrorName = document.getElementById("error_name");
  const showErrorFocus = document.getElementById("error_focus");

  const showName = document.getElementById("display_name");
  const yourname = document.getElementById("yourname").value;

  const showFocusLabel = document.getElementById("display_focus");
  const showFocusValue = document.getElementById("display_focus_value");
  const focus = document.getElementById("focus").value;

  const showTodo = document.getElementById("todo-container");

  //check if good morning, good after or good evening
  let greet;
  let now;
  const newDate = new Date();
  const Newhrs = newDate.getHours();

  if (Newhrs < 12) {
    greet = "Good Morning";
    now = "TODAY";
  } else if (Newhrs > 12 && Newhrs <= 17) {
    greet = "Good Afternoon";
    now = "TODAY";
  } else if (Newhrs > 17 && Newhrs <= 24) {
    greet = "Good Evening";
    now = "TONIGHT";
  } else {
  }
  console.log(now);

  showFocusLabel.innerHTML = "MY MAIN FOCUS " + now + " IS";

  // Check if input is empty
  if (input.name === "yourname") {
    if (input.value === "") {
      bgRight.style.background = "red";
      showTime.style.display = "none";
      showErrorName.style.display = "block";
    } else {
      bgRight.style.background = "white";
      showTime.style.display = "block";
      showErrorName.style.display = "none";
      //show display name
      showName.innerHTML = greet + ", " + yourname + ".";
      showName.style.display = "block";

      //show focus
      showFocusValue.innerHTML = focus;
      showFocusLabel.style.display = "block";
      showFocusValue.style.display = "block";

      const enable = document.querySelector("form fieldset.enable");
      const nextEnable = enable.nextElementSibling;
      enable.classList.remove("enable");
      enable.classList.add("disable");
      nextEnable.classList.add("enable");
    }
  } else {
    if (input.value === "") {
      bgRight.style.background = "red";
      showTime.style.display = "block";
      showErrorFocus.style.display = "block";
    } else {
      bgRight.style.background = "white";
      showTime.style.display = "block";
      showErrorFocus.style.display = "none";
      //show display name
      showName.innerHTML = greet + ", " + yourname + ".";
      showName.style.display = "block";

      //show focus
      showFocusValue.innerHTML = focus;
      showFocusLabel.style.display = "block";
      showFocusValue.style.display = "block";

      const enable = document.querySelector("form fieldset.enable");
      const nextEnable = enable.nextElementSibling;
      enable.classList.remove("enable");
      enable.classList.add("disable");
      showTodo.classList.add("enable");
      // showTodo.style.display = "block";
    }
  }
}

function keyDown(event) {
  const key = event.keyCode,
    target = document.querySelector("fieldset.enable .button");
  if (key == 13 || key == 9) next(target);
}

const body = document.querySelector("body");
const form = document.querySelector("form");
const count = form.querySelectorAll("fieldset").length;

// window.onload = init;
document.body.onmouseup = function (event) {
  const target = event.target || event.toElement;
  if (target.classList.contains("button")) {
    next(target);
  }
};
document.addEventListener("keydown", keyDown, false);

// create todo | create a close button and append
const myNodeList = document.getElementsByTagName("LI");
var ay;
for (ay = 0; ay < myNodeList.length; ay++) {
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodeList[ay].appendChild(span);
}

// click on a close button to hide the current list item
const close = document.getElementsByClassName("close");
var ay;
for(ay = 0; ay < close.length; ay++) {
  close[ay].onclick = function() {
    const div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
const list = document.querySelector('#todo-container ul');
list.addEventListener('click', function(ev) {
  if(ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  const li = document.createElement("li");
  const inputValue = document.getElementById("myInput").value;
  const t = document.createTextNode(inputValue);
  li.appendChild(t);
  if(inputValue === '') {
    alert ("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for(ay = 0; ay < close.length; ay++) {
    close[ay].onclick = function() {
      const div = this.parentElement;
      div.style.display = "none";
    }
  }
}

//key press add to do
const todoInput = document.getElementById("myInput");

todoInput.addEventListener("keyup", function(event) {
  if(event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addClick").click();
  }
});


