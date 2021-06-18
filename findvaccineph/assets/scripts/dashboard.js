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

// Variables for add appointment
let appointmentFirstName = document.getElementById("appointmentFirstName");
let appointmentLastName = document.getElementById("appointmentLastName");
let appointmentMiddleName = document.getElementById("appointmentMiddleName");
let appointmentBirthday = document.getElementById("appointmentBirthday");
let appointmentMobileNumber = document.getElementById(
  "appointmentMobileNumber"
);
let appointmentGender = document.getElementById("appointmentGender");
let appointmentCompleteAddress = document.getElementById(
  "appointmentCompleteAddress"
);

let appointmentCenter = document.getElementById("appointmentCenter");
let appointmentVaccineDate = document.getElementById("appointmentVaccineDate");

// Variables for add user
let adminFirstName = document.getElementById("adminFirstName");
let adminLastName = document.getElementById("adminLastName");
let adminEmail = document.getElementById("adminEmail");
let adminPassword = document.getElementById("adminPassword");
let adminConfirmPassword = document.getElementById("adminConfirmPassword");

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
      let isPending;
      let isActivated;
      let is1stDose;
      let is2ndDose;

      if (element.status == "pending") {
        isPending = "selected";
      } else if (element.status == "activated") {
        isActivated = "selected";
      } else if (element.status == "1stdose") {
        is1stDose = "selected";
      } else {
        is2ndDose = "selected";
      }
      outputAppointment += `<tr class="list-appointments">
              <td>#${element.id}</td>
              <td>${element.firstName} ${element.lastName}</td>
                <td>${element.mobileNumber}</td>
              <td>${element.preferredCenter}</td>
              <td>${element.created_at}</td>
              <td>${element.preferredDate}</td>
              <td>
              <select id="mySelect" data-record-id="${element.id}" onchange="myStatus(this)">
                <option value="pending" ${isPending}>Pending</option>
                <option value="activated" ${isActivated}>Activated</option>
                <option value="1stdose" ${is1stDose}>1st Dose</option>
                <option value="2nddose" ${is2ndDose}>2nd Dose</option>
              </select>
              </td>
            </tr>`;
      console.log("test", element);
    }

    appointmentsList.innerHTML = outputAppointment;
  });
}
showAppointmentList();

let mySelect = document.getElementById("mySelect");

function myStatus(element) {
  const selectValue = element.value;
  const record = element.dataset.recordId;

  console.log(record);

  let answer = confirm("Are you sure?");

  answer;

  if (answer) {
    getAPIAppointments().then((data) => {
      for (const element of data) {
        if (element.id == record) {
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

          fetch("http://localhost:3000/appointments/" + record, {
            method: "PUT",
            body: JSON.stringify({
              id: record,
              email: element.email,
              firstName: element.firstName,
              lastName: element.lastName,
              middleName: element.middleName,
              birthday: element.gender,
              mobileNumber: element.mobileNumber,
              gender: element.gender,
              completeAddress: element.completeAddress,
              preferredCenter: element.preferredCenter,
              created_at: element.created_at,
              update_at: strDateSubmit,
              preferredDate: element.preferredDate,
              status: selectValue,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(
                "response put appointment admin" + JSON.stringify(json)
              );
            });
        }
      }
    });
  } else {
    console.log("cancel");
  }
}

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
      let statusUser;
      if (element.status == "activated") {
        statusUser = "green";
      } else {
        statusUser = "red";
      }
      outputUsers += `<tr style="cursor:pointer;" data-record-id="${element.id}" class="list-appointments" onclick="selectUser(this)">
              <td>#${element.id}</td>
              <td>${element.firstName} ${element.lastName}</td>
              <td>${element.email}</td>
              <td>${element.created_at}</td>
               <td style="color: ${statusUser}">${element.status}</td>
            </tr>`;
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

// Add vaccine center admin
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

// Add appointment via admin
function submitAppointment(event) {
  getAPIAppointments().then((data) => {
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
        firstName: appointmentFirstName.value.toLocaleLowerCase(),
        lastName: appointmentLastName.value.toLocaleLowerCase(),
        middleName: appointmentMiddleName.value.toLocaleLowerCase(),
        birthday: appointmentBirthday.value,
        mobileNumber: appointmentMobileNumber.value,
        gender: appointmentGender.value.toLocaleLowerCase(),
        completeAddress: appointmentCompleteAddress.value.toLocaleLowerCase(),
        preferredCenter: appointmentCenter.value.toLocaleLowerCase(),
        created_at: strDateSubmit,
        preferredDate: appointmentVaccineDate.value,
        status: "pending",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("response post appointments admin" + JSON.stringify(json));
      });
  });
}

// Add user via admin
function submitUser(event) {
  getAPIUsers().then((data) => {
    if (data.email != adminEmail.value.toLocaleLowerCase()) {
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

      fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify({
          email: adminEmail.value.toLocaleLowerCase(),
          firstName: adminFirstName.value.toLocaleLowerCase(),
          lastName: adminLastName.value.toLocaleLowerCase(),
          password: adminPassword.value.toLocaleLowerCase(),
          created_at: strDateSubmit,
          status: "activated",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("response post user admin" + JSON.stringify(json));
        });
    }
  });
}

// Deactivate user
function selectUser(element) {
  const record = element.dataset.recordId;

  let answer = confirm("Are you sure?");

  answer;

  if (answer) {
    getAPIUsers().then((data) => {
      for (const element of data) {
        if (element.id == record) {
          fetch("http://localhost:3000/users/" + record, {
            method: "PUT",
            body: JSON.stringify({
              id: record,
              email: element.email,
              firstName: element.firstName,
              lastName: element.lastName,
              password: element.password,
              created_at: element.created_at,
              status: "deactivated",
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => {
              console.log("response put user admin" + JSON.stringify(json));
            });
        }
      }
    });
  } else {
    console.log("cancel");
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

appointmentVaccineDate.setAttribute("min", strToday);
