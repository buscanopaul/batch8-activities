let emailAdmin = document.getElementById("emailAdmin");
let passwordAdmin = document.getElementById("passwordAdmin");

async function getAPI() {
  const response = await fetch("https://my-find-covid-api.herokuapp.com/users");
  const data = await response.json();
  return data;
}

function submitLogin(event) {
  event.preventDefault();

  if (emailAdmin.value == "") {
    emailAdmin.style.border = "1px solid red";
  } else if (passwordAdmin.value == "") {
    passwordAdmin.style.border = "1px solid red";
  } else {
    passwordAdmin.style.border = "1px solid black";
    emailAdmin.style.border = "1px solid black";
    getAPI().then((data) => {
      // for loop users
      for (const element of data) {
        if (
          element.email === emailAdmin.value &&
          element.password === passwordAdmin.value
        ) {
          let adminName = emailAdmin.value;

          passwordAdmin.value = "";
          emailAdmin.value = "";
          emailAdmin.style.border = "1px solid black";
          passwordAdmin.style.border = "1px solid black";

          // Pass value of vaccine center and preferred date to thankyou.html
          window.location.href =
            "dashboard.html" + "?adminName=" + element.firstName;
        } else {
          emailAdmin.style.border = "1px solid red";
        }
      }
    });
  }
}
