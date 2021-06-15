let vaccineCenterList = document.querySelector(".row-body");
let outputCenter = [];

// Variables for appointments
let appointmentsList = document.querySelector("#appointmentsList");
let outputAppointment = [];

// Variables for users
let usersList = document.querySelector("#usersList");
let outputUsers = [];

// Variables for row by menu
let menuVaccine = document.getElementById("menuVaccine");
let menuAppointments = document.getElementById("menuAppointments");
let menuUsers = document.getElementById("menuUsers");

// variables for body
let appointmentsBody = document.querySelector(".row-body-appointments");
let usersBody = document.querySelector(".row-body-users");

// Variables for header
let headerVaccine = document.getElementById("headerVaccine");
let headerAppointments = document.getElementById("headerAppointments");
let headerUsers = document.getElementById("headerUsers");

// Variables for form add vaccine center
let cityName = document.getElementById("cityName");
let inputbarangayName = document.getElementById("inputbarangayName");
let centerName = document.getElementById("centerName");
let centerAddress = document.getElementById("centerAddress");
let vaccineType = document.getElementById("vaccineType");

// Parent api
async function getAPI() {
  const response = await fetch("http://localhost:3000/facilities");
  const data = await response.json();
  return data;
}

function showVaccineList() {
  getAPI().then((data) => {
    for (const element of data) {
      //   console.log(element);

      //   console.log("city", element.city);

      for (const barangay of element.barangay) {
        // console.log("barangay", barangay.barangayName);

        for (const school of barangay.schools) {
          //   console.log("school", school.schoolName);

          outputCenter += `<div class="card">
                    <div class="sub-card">
                    <div class="vaccine-group">
                     <h5 style="text-transform: capitalize;">${school.schoolName}</h5>
                      <a style="text-transform: capitalize;" class="vaccine-address-link" href="http://maps.google.com/?q=${school.schoolAddress}" target="_blank"><p class="vaccine-address">${school.schoolAddress}</p></a>
                    </div>
                    <div class="vaccine-type border-bottom-gray">
                      <p>City:</p>
                      <p class="cure">${element.city}</p>
                    </div>
                    <div class="vaccine-type border-bottom-gray">
                      <p>Barangay:</p>
                      <p class="cure">${barangay.barangayName}</p>
                    </div>
                    <div class="vaccine-type border-bottom-gray">
                      <p>Vaccine Type:</p>
                      <p class="cure">${school.vaccineType}</p>
                    </div>
                    <div class="group-book" data-id="${school.schoolName}" onclick="some_func(this)" href="#sheduleAppointment">
                    <p id="cardCity">${element.city}</p>
                    <p id="cardBarangay">${barangay.barangayName}</p>
                      <a id="btnBook" class="book-vaccine" href="#sheduleAppointment">Book Now</a>
                    </div>
                    </div>
                  </div>`;
        }
      }
    }

    vaccineCenterList.innerHTML = outputCenter;
  });
}
showVaccineList();

// Parent api appointments
async function getAPIAppointments() {
  const response = await fetch("http://localhost:3000/appointments");
  const data = await response.json();
  return data;
}

function showAppointmentList() {
  outputAppointment[0] = `<tr id="table-label">
              <th>ID</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Preferred Vaccine Center</th>
              <th>Date Booked</th>
              <th>Preferred Date</th>
              <th>Status</th>
            </tr>`;
  getAPIAppointments().then((data) => {
    for (const element of data) {
      outputAppointment += `<tr class="list-appointments">
              <td>#${element.id}</td>
              <td>${element.firstName} ${element.lastName}</td>
                <td>${element.mobileNumber}</td>
              <td>${element.preferredCenter}</td>
              <td>${element.created_at}</td>
              <td>${element.preferredDate}</td>
              <td style="color: red;">${element.status}</td>
            </tr>`;
      console.log("test", element);
    }

    appointmentsList.innerHTML = outputAppointment;
  });
}
showAppointmentList();

// Parent api users
async function getAPIUsers() {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  return data;
}

function showUsersList() {
  outputUsers[0] = `<tr id="table-label">
              <th>ID</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Account created</th>
              <th>Status</th>
            </tr>`;
  getAPIUsers().then((data) => {
    for (const element of data) {
      outputUsers += `<tr class="list-appointments">
              <td>#${element.id}</td>
              <td>${element.firstName} ${element.lastName}</td>
              <td>${element.email}</td>
              <td>${element.created_at}</td>
               <td style="color: green">${element.status}</td>
            </tr>`;
      console.log("users", element);
    }

    usersList.innerHTML = outputUsers;
  });
}
showUsersList();

// event listener for buttons
menuVaccine.addEventListener("click", function () {
  vaccineCenterList.style.display = "flex";
  appointmentsBody.style.display = "none";
  usersBody.style.display = "none";

  // Header Styles
  headerVaccine.style.display = "flex";
  headerAppointments.style.display = "none";
  headerUsers.style.display = "none";

  // Button styles
  menuVaccine.style.backgroundColor = "#0660fe";
  menuVaccine.style.padding = "10px";
  menuVaccine.style.color = "white";
  menuVaccine.style.borderRadius = "8px";

  menuAppointments.style.backgroundColor = "transparent";
  menuAppointments.style.color = "#2a2a2a";
  menuAppointments.style.borderRadius = "none";

  menuUsers.style.backgroundColor = "transparent";
  menuUsers.style.color = "#2a2a2a";
  menuUsers.style.borderRadius = "none";
});

menuAppointments.addEventListener("click", function () {
  vaccineCenterList.style.display = "none";
  appointmentsBody.style.display = "block";
  usersBody.style.display = "none";

  // Header Styles
  headerVaccine.style.display = "none";
  headerAppointments.style.display = "flex";
  headerUsers.style.display = "none";

  // Button styles
  menuVaccine.style.backgroundColor = "transparent";
  menuVaccine.style.color = "#2a2a2a";
  menuVaccine.style.borderRadius = "none";

  menuAppointments.style.backgroundColor = "#0660fe";
  menuAppointments.style.padding = "10px";
  menuAppointments.style.color = "white";
  menuAppointments.style.borderRadius = "8px";

  menuUsers.style.backgroundColor = "transparent";
  menuUsers.style.color = "#2a2a2a";
  menuUsers.style.borderRadius = "none";
});

menuUsers.addEventListener("click", function () {
  vaccineCenterList.style.display = "none";
  appointmentsBody.style.display = "none";
  usersBody.style.display = "block";

  // Header Styles
  headerVaccine.style.display = "none";
  headerAppointments.style.display = "none";
  headerUsers.style.display = "flex";

  // Button styles
  menuVaccine.style.backgroundColor = "transparent";
  menuVaccine.style.color = "#2a2a2a";
  menuVaccine.style.borderRadius = "none";

  menuAppointments.style.backgroundColor = "transparent";
  menuAppointments.style.color = "#2a2a2a";
  menuAppointments.style.borderRadius = "none";

  menuUsers.style.backgroundColor = "#0660fe";
  menuUsers.style.padding = "10px";
  menuUsers.style.color = "white";
  menuUsers.style.borderRadius = "8px";
});

function submitVaccine(event) {
  getAPI().then((data) => {
    if (data.city != cityName.value.toLocaleLowerCase()) {
      console.log("wala");

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

      fetch("http://localhost:3000/facilities", {
        method: "POST",
        body: JSON.stringify({
          city: cityName.value.toLocaleLowerCase(),
          country: "philippines",
          barangay: [
            {
              barangayName: inputbarangayName.value.toLocaleLowerCase(),
              schools: [
                {
                  schoolName: centerName.value.toLocaleLowerCase(),
                  schoolAddress: centerAddress.value.toLocaleLowerCase(),
                  vaccineType: vaccineType.value.toLocaleLowerCase(),
                  created_at: strDateSubmit,
                },
              ],
            },
          ],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("response" + JSON.stringify(json));
        });
    }
  });
}
