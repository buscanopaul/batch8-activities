const searchLabel = document.getElementById("searchLabel");
const inputBox = document.getElementById("searchCity");
const suggBox = document.getElementById("searchCitySuggestion");
let suggestionsCity = [];

// variables for search box barangay
const inputBoxBarangay = document.getElementById("searchBarangay");
const suggBoxBarangay = document.getElementById("searchBarangaySuggestion");
let suggestionsBarangay = [];

// variable for output
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
let vaccineList = document.querySelector(".row-card");
let output = "";

const showSearch = document.getElementById("showSearch");

// Variable form
const sheduleAppointment = document.getElementById("sheduleAppointment");
const submitAppointment = document.getElementById("submitAppointment");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const middleName = document.getElementById("middleName");
const birthday = document.getElementById("birthday");
const mobileNumber = document.getElementById("mobileNumber");
const gender = document.getElementById("gender");
const homeAddress = document.getElementById("homeAddress");
const preferred = document.getElementById("preferred");
const preferredDate = document.getElementById("preferredDate");
const errorForm = document.getElementById("errorForm");

const sheduleAppointmentList = document.querySelectorAll(
  "#sheduleAppointment input"
);

// If user press any key and release
inputBox.onkeyup = (e) => {
  let userData = e.target.value; // User entered data
  let emptyArray = [];
  if (userData) {
    emptyArray = suggestionsCity.filter((data) => {
      // Filtering array value and user char to lowercase and return only those word/sentence which starts with user entered word
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      return (data = "<li>" + data + "</li>");
    });
    suggBox.classList.add("active"); // Show autocomplete box
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let index = 0; index < allList.length; index++) {
      // Adding onclick attribute to all li tag
      allList[index].setAttribute("onclick", "select(this)");
    }
  } else {
    suggBox.classList.remove("active");
  }

  if (inputBox.value === "") {
    inputBoxBarangay.disabled = true;
    // inputBoxBarangay.value = "";
  }
};

inputBoxBarangay.onkeyup = (e) => {
  let userData = e.target.value; // User entered data
  let emptyArray = [];
  if (userData) {
    emptyArray = suggestionsBarangay.filter((data) => {
      // Filtering array value and user char to lowercase and return only those word/sentence which starts with user entered word
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      return (data = "<li>" + data + "</li>");
    });
    suggBoxBarangay.classList.add("active"); // Show autocomplete box
    showSuggestionsBarangay(emptyArray);
    let allList = suggBoxBarangay.querySelectorAll("li");
    for (let index = 0; index < allList.length; index++) {
      // Adding onclick attribute to all li tag
      allList[index].setAttribute("onclick", "selectBarangay(this)");
    }
  } else {
    suggBoxBarangay.classList.remove("active");
  }

  if (inputBoxBarangay.value === "") {
    showSearch.disabled = true;
  }
};

function removeBarangay() {
  suggestionsBarangay = [];
}

// end input

function select(element) {
  let selectUserData = element.textContent;
  inputBox.value = selectUserData; // Passing the user selected list item data in textfield
  suggBox.classList.remove("active");
}

function selectBarangay(element) {
  let selectUserData = element.textContent;
  inputBoxBarangay.value = selectUserData; // Passing the user selected list item data in textfield
  suggBoxBarangay.classList.remove("active");
}

//

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = "<li>" + userValue + "</li>";
    inputBoxBarangay.disabled = true;
    inputBox.style.border = "1px solid red";
    searchLabel.style.display = "block";
    showSearch.disabled = true;
  } else {
    listData = list.join("");
    inputBoxBarangay.disabled = false;
    inputBox.style.border = "1px solid white";
    searchLabel.style.display = "none";
    showSearch.disabled = false;
    myBarangay();
  }
  suggBox.innerHTML = listData;
}

function showSuggestionsBarangay(list) {
  let listData;
  if (!list.length) {
    userValue = inputBoxBarangay.value;
    listData = "<li>" + userValue + "</li>";
    showSearch.style.backgroundColor = "gray";
    inputBoxBarangay.style.border = "1px solid red";
  } else {
    listData = list.join("");
    showSearch.style.backgroundColor = "blue";
    inputBoxBarangay.style.border = "1px solid white";
  }
  suggBoxBarangay.innerHTML = listData;
}

//

function myBarangay() {
  getAPI().then((data) => {
    for (const element of data) {
      if (element.city == inputBox.value.toLocaleLowerCase()) {
        for (const baranga of element.barangay) {
          let myBarangay = baranga.barangayName;
          let capitalBarangay = myBarangay.replace(/\w\S*/g, (w) =>
            w.replace(/^\w/, (c) => c.toUpperCase())
          );

          suggestionsBarangay.push(capitalBarangay);
        }

        console.log(suggestionsBarangay);
      }
    }
  });
}

async function getAPI() {
  const response = await fetch("http://localhost:3000/facilities");
  const data = await response.json();
  return data;
}

getAPI().then((data) => {
  // for loop facilities
  for (const element of data) {
    let myCity = element.city;
    let capitalCity = myCity.replace(/\w\S*/g, (w) =>
      w.replace(/^\w/, (c) => c.toUpperCase())
    );

    suggestionsCity.push(capitalCity);
  }
});

function showSearchResult() {
  output = "";
  // Check if empty input
  if (inputBox.value == "") {
    inputBox.style.border = "1px solid red";
  } else if (inputBoxBarangay.value == "") {
    inputBoxBarangay.style.border = "1pxe solid red";
  } else {
    result.style.display = "block";
    getAPI().then((data) => {
      for (const element of data) {
        if (element.city == inputBox.value.toLocaleLowerCase()) {
          for (const baranga of element.barangay) {
            if (
              baranga.barangayName == inputBoxBarangay.value.toLocaleLowerCase()
            ) {
              for (const school of baranga.schools) {
                output += `<div class="card">
              <div class="vaccine-group">
               <h5>${school.schoolName}</h5>
                <a class="vaccine-address-link" href="http://maps.google.com/?q=${school.schoolAddress}" target="_blank"><p class="vaccine-address">${school.schoolAddress}</p></a>
              </div>  
              <div class="vaccine-type border-bottom-gray">
                <p>Vaccine Type:</p>
                <p class="cure">${school.vaccineType}</p>
              </div>
              <div class="group-book" data-id="${school.schoolName}" onclick="some_func(this)" href="#sheduleAppointment">
              <p id="cardCity">${element.city}</p>
              <p id="cardBarangay">${baranga.barangayName}</p>
                <a id="btnBook" class="book-vaccine" href="#sheduleAppointment">Book Now</a>
              </div>
            </div>`;
              }
            }
          }
        }
      }

      resultTitle.innerHTML = `Vaccination Center/s in <br>Brgy. ${inputBoxBarangay.value}`;
      vaccineList.innerHTML = output;
      inputBox.value = "";
      inputBoxBarangay.value = "";
    });
  }
}

function some_func(val) {
  preferred.value = val.dataset.id;
  sheduleAppointment.style.display = "block";
}

// submitAppointment.addEventListener("click", (e) => {
// e.preventDefault();
function submitForm() {
  // form validations
  if (firstName.value == "") {
    firstName.style.border = "1px solid red";
    errorForm.style.display = "block";
  } else if (lastName.value == "") {
    lastName.style.border = "1px solid red";
    errorForm.style.display = "block";
  } else if (middleName.value == "") {
    middleName.style.border = "1px solid red";
    errorForm.style.display = "block";
  } else if (birthday.value == "") {
    birthday.style.border = "1px solid red";
    errorForm.style.display = "block";
  } else if (mobileNumber.value == "") {
    mobileNumber.style.border = "1px solid red";
    errorForm.style.display = "block";
  } else if (gender.value == "") {
    gender.style.border = "1px solid red";
    errorForm.style.display = "block";
  } else if (homeAddress.value == "") {
    homeAddress.style.border = "1px solid red";
    errorForm.style.display = "block";
  } else if (preferredDate.value == "") {
    preferredDate.style.border = "1px solid red";
    errorForm.style.display = "block";
  } else if (preferred.value == "") {
    preferred.style.border = "1px solid red";
    errorForm.style.display = "block";
  } else {
    errorForm.style.display = "none";
    firstName.style.border = "1px solid transparent";
    lastName.style.border = "1px solid transparent";
    middleName.style.border = "1px solid transparent";
    birthday.style.border = "1px solid transparent";
    mobileNumber.style.border = "1px solid transparent";
    gender.style.border = "1px solid transparent";
    homeAddress.style.border = "1px solid transparent";
    preferredDate.style.border = "1px solid transparent";
    preferred.style.border = "1px solid transparent";

    // Created date or submitted date
    let dateSubmit = new Date();
    let strDateSubmit =
      dateSubmit.getFullYear() +
      "-" +
      (dateSubmit.getMonth() + 1) +
      "-" +
      dateSubmit.getDate() +
      " " +
      dateSubmit.getHours() +
      ":" +
      dateSubmit.getMinutes() +
      ":" +
      dateSubmit.getSeconds();

    fetch("http://localhost:3000/appointments", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        middleName: middleName.value,
        birthday: birthday.value,
        mobileNumber: mobileNumber.value,
        gender: gender.value,
        completeAddress: homeAddress.value,
        preferredCenter: preferred.value,
        created_at: strDateSubmit,
        preferredDate: preferredDate.value,
        status: "pending",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("response" + JSON.stringify(json));
      });

    // Pass value of vaccine center and preferred date to thankyou.html
    window.location.href =
      "thankyou.html" +
      "?center=" +
      preferred.value +
      "&date=" +
      preferredDate.value;
  }
}

// disable past date in preferred date
let newToday = new Date();
let strToday =
  newToday.getFullYear() +
  "-" +
  0 +
  parseInt(newToday.getMonth() + 1) +
  "-" +
  parseInt(newToday.getDate() + 7);

preferredDate.setAttribute("min", strToday);
