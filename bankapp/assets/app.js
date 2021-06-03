// Variables
let login = document.getElementById("login");
let dashboard = document.getElementById("dashboard");
let btnLogin = document.getElementById("btnLogin");
let errorUsername = document.getElementById("errorUsername");
let errorPassword = document.getElementById("errorPassword");
let breadcrumbs = document.getElementById("breadcrumbs");
// Get login fields
let usernameField = document.getElementById("username");
let passwordField = document.getElementById("password");
let btnGotoSignup = document.getElementById("btnGotoSignup");
let showPassword = document.getElementById("showPassword");

let listDeposit = document.getElementById("listDeposit");
let listWithdraw = document.getElementById("listWithdraw");
let listHistory = document.getElementById("listHistory");
let listUsers = document.getElementById("listUsers");
let cardNum = document.getElementById("cardNum");
let listTransactionHistory = document.getElementById("listTransactionHistory");

// Variables Transaction History User/Client
const transactionsUser = document.getElementById("transactionsUser");
const budgetUser = document.getElementById("budgetUser");

//credentials for admin
const admin = {
  username: "adminadmin",
  password: "nimda",
};

const isLogin = {
  accountNumber: 0,
  accountType: "",
  balance: 999,
};

// User class
class User {
  constructor(
    accountNumber,
    firstName,
    lastName,
    password,
    email,
    balance,
    created_at,
    accountType,
    budget_amount,
    total_expenses
  ) {
    (this.accountNumber = accountNumber),
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.password = password),
      (this.email = email),
      (this.balance = balance),
      (this.created_at = created_at),
      (this.accountType = accountType),
      (this.budget_amoun = budget_amount),
      (this.transactions = []),
      (this.logins = []),
      (this.total_expenses = total_expenses),
      (this.expenses = []);
  }

  create_user(user, balance) {
    return this.balance;
  }

  list_users() {
    // for loop local storage start from last object
    for (let i = localStorage.length - 1; i >= 0; i--) {
      let retrievedUsers = JSON.parse(
        localStorage.getItem(localStorage.key(i))
      );
      console.log(retrievedUsers);
      customers.innerHTML +=
        "<tr><td>" +
        retrievedUsers.accountNumber +
        "</td><td>" +
        retrievedUsers.name +
        "</td><td>" +
        retrievedUsers.email +
        "</td><td class='balance'>" +
        retrievedUsers.balance +
        "</td></tr>";
    }
  }

  list_transactions() {
    // for loop local storage start from last object
    for (let i = localStorage.length - 1; i >= 0; i--) {
      let retrievedTransactions = JSON.parse(
        localStorage.getItem(localStorage.key(i))
      );

      // for loop all transactions every user
      for (let value of retrievedTransactions.transactions) {
        transactions.innerHTML +=
          "<tr><td>" +
          value.transactionId +
          "</td><td>" +
          value.transactionDate +
          "</td><td>" +
          retrievedTransactions.accountNumber +
          "</td><td>" +
          value.transactionType +
          "</td>" +
          "<td class='balance'>" +
          value.transactionAmount +
          "</td>" +
          "<td class='balance'>" +
          value.transactionInitialBalance +
          "</td>" +
          "<td class='balance'>" +
          value.transactionNewBalance +
          "</td>" +
          "</tr>";
      }
    }
  }
}

let getUser = new User();

function clearLogin() {
  errorUsername.style.display = "none";
  errorPassword.style.display = "none";
  usernameField.style.border = "2px solid white";
  passwordField.style.border = "2px solid white";
}

function clearSignup() {
  signupEmail.value = "";
  signupFirstName.value = "";
  signupLastName.value = "";
  signupPassword.value = "";
  confirmPassword.value = "";
  showPassword.value = "";
}

// Detect keypress username field delete error
function removeError() {
  errorUsername.style.display = "none";
  errorPassword.style.display = "none";
  usernameField.style.border = "2px solid white";
  passwordField.style.border = "2px solid white";

  showPassword.style.top = "390px";

  // Sign up error
  errorEmail.style.display = "none";
  signupEmail.style.border = "2px solid white";

  errorFirstName.style.display = "none";
  signupFirstName.style.border = "2px solid white";

  errorLastName.style.display = "none";
  signupLastName.style.border = "2px solid white";

  signupErrorPassword.style.display = "none";
  signupPassword.style.border = "2px solid white";

  confirmErrorPassword.style.display = "none";
  confirmPassword.style.border = "2px solid white";

  showPasswordSignUptest.style.top = "415px";
  showPassword.style.color = "white";
}

// Go to sign up form
btnGotoSignup.addEventListener("click", (e) => {
  errorUsername.style.display = "none";
  usernameField.style.border = "2px solid white";
  usernameField.value = "";

  errorPassword.style.display = "none";
  passwordField.style.border = "2px solid white";
  passwordField.value = "";

  // show sign up form
  loginForm.style.display = "none";
  signUpForm.style.display = "block";
});

// login event
btnLogin.addEventListener("click", (e) => {
  // convert input to capital
  const capitalUsername = usernameField.value.toLowerCase();
  const capitalPassword = passwordField.value.toLowerCase();

  if (usernameField.value == "") {
    errorUsername.style.display = "block";
    errorUsername.innerHTML = "Please enter your email";
    showPassword.style.color = "white";
    showPassword.style.top = "400px";
  } else if (passwordField.value == "") {
    errorPassword.style.display = "block";
    passwordField.style.border = "2px solid red";
    showPassword.style.top = "400px";
  } else {
    // Check if users db is null
    if (localStorage.length == 0) {
      //for loop check if equals input values and admin object
      for (let key in admin) {
        if (
          admin["username"] == capitalUsername &&
          admin["password"] == capitalPassword
        ) {
          login.style.display = "none";
          dashboard.style.display = "block";
          usernameField.value = "";
          passwordField.value = "";

          bodyDashboard.style.display = "flex";
          bodyDashboard.style.visibility = "visible";
          bodyDashboard.style.flexDirection = "column";
          bodyDashboard.style.maxWidth = "70%";

          bodyDashboardSide.style.display = "flex";
          bodyDashboardSide.style.visibility = "visible";
          bodyDashboardSide.style.flexDirection = "column";
          bodyDashboardSide.style.maxWidth = "30%";
          bodyDashboardSide.style.marginRight = "40px";
          bodyDashboardSide.style.marginLeft = "0px";

          // global variable
          isLogin.accountNumber = 1;
          isLogin.accountType = "admin";
          isLogin.balance = 999;
          isLogin.firstName = "super admin";
          console.log(isLogin);

          // Change card number
          cardNum.innerHTML = "6969 6969 6969 6969";

          // Set the dashboard balance to current balance
          currentBalance.innerHTML = isLogin.balance;
          currentName.innerHTML = isLogin.firstName;
        } else {
          usernameField.style.border = "2px solid red";
          errorUsername.style.display = "block";
          errorUsername.innerHTML = "Invalid email or password";
          showPassword.style.top = "400px";
        }
      }
    } else {
      if (
        admin["username"] == usernameField.value &&
        admin["password"] == passwordField.value
      ) {
        login.style.display = "none";
        dashboard.style.display = "block";
        usernameField.value = "";
        passwordField.value = "";

        bodyDashboard.style.display = "flex";
        bodyDashboard.style.visibility = "visible";
        bodyDashboard.style.flexDirection = "column";
        bodyDashboard.style.maxWidth = "70%";

        bodyDashboardSide.style.display = "flex";
        bodyDashboardSide.style.visibility = "visible";
        bodyDashboardSide.style.flexDirection = "column";
        bodyDashboardSide.style.maxWidth = "30%";
        bodyDashboardSide.style.marginRight = "40px";
        bodyDashboardSide.style.marginLeft = "0px";

        // global variable
        isLogin.accountNumber = 1;
        isLogin.accountType = "admin";
        isLogin.balance = 999999;
        isLogin.firstName = "super admin";

        console.log(isLogin);

        // Change card number
        cardNum.innerHTML = "6969 6969 6969 6969";

        // check if admin or client
        if (isLogin.accountType === "admin") {
          listSend.style.display = "none";
          listRequest.style.display = "none";
          listTransactionHistory.style.display = "none";
          listProfile.style.display = "none";
        } else {
          listDeposit.style.display = "none";
          listWithdraw.style.display = "none";
          listHistory.style.display = "none";
          listUsers.style.display = "none";
        }

        // Set the dashboard balance to current balance
        currentBalance.innerHTML = isLogin.balance
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");
        currentName.innerHTML = isLogin.firstName;
      } else {
        let retrievedAccountForLogin = JSON.parse(
          localStorage.getItem(usernameField.value)
        );

        console.log(retrievedAccountForLogin);

        if (retrievedAccountForLogin == null) {
          usernameField.style.border = "2px solid red";
          errorUsername.style.display = "block";
          errorUsername.innerHTML = "Invalid email or password";
          showPassword.style.top = "400px";
        } else {
          if (
            retrievedAccountForLogin.email === usernameField.value &&
            retrievedAccountForLogin.password === passwordField.value
          ) {
            // Pass value to class constructor
            getUser.accountNumber = retrievedAccountForLogin.accountNumber;
            getUser.accountType = retrievedAccountForLogin.accountType;
            getUser.balance = retrievedAccountForLogin.balance;
            getUser.budget_amount = retrievedAccountForLogin.balance;
            getUser.created_at = retrievedAccountForLogin.created_at;
            getUser.email = retrievedAccountForLogin.email;
            getUser.firstName = retrievedAccountForLogin.firstName;
            getUser.lastName = retrievedAccountForLogin.lastName;
            getUser.password = retrievedAccountForLogin.password;
            getUser.logins = retrievedAccountForLogin.logins;
            getUser.transactions = retrievedAccountForLogin.transactions;
            getUser.total_expenses = retrievedAccountForLogin.total_expenses;
            getUser.expenses = retrievedAccountForLogin.expenses;

            let lastLogin = retrievedAccountForLogin.logins.length;
            let dateLogin = new Date();
            let strDateLogin =
              dateLogin.getFullYear() +
              "" +
              (dateLogin.getMonth() + 1) +
              "" +
              dateLogin.getDate() +
              "" +
              dateLogin.getHours() +
              "" +
              dateLogin.getMinutes() +
              "" +
              dateLogin.getSeconds();

            let newLogin = {
              dateId: strDateLogin + lastLogin++,
              date: getFormattedDate(),
            };

            getUser.logins.push(newLogin);
            // store it on local storage
            localStorage.setItem(getUser.email, JSON.stringify(getUser));
            clearLogin();

            login.style.display = "none";
            dashboard.style.display = "block";
            usernameField.value = "";
            passwordField.value = "";

            bodyDashboard.style.display = "flex";
            bodyDashboard.style.visibility = "visible";
            bodyDashboard.style.flexDirection = "column";
            bodyDashboard.style.maxWidth = "70%";

            bodyDashboardSide.style.display = "flex";
            bodyDashboardSide.style.visibility = "visible";
            bodyDashboardSide.style.flexDirection = "column";
            bodyDashboardSide.style.maxWidth = "30%";
            bodyDashboardSide.style.marginRight = "40px";
            bodyDashboardSide.style.marginLeft = "0px";

            // global variable
            isLogin.accountNumber = retrievedAccountForLogin.accountNumber;
            isLogin.accountType = retrievedAccountForLogin.accountType;
            isLogin.balance = retrievedAccountForLogin.balance;
            isLogin.created_at = retrievedAccountForLogin.created_at;
            isLogin.email = retrievedAccountForLogin.email;
            isLogin.firstName = retrievedAccountForLogin.firstName;
            isLogin.lastName = retrievedAccountForLogin.lastName;
            isLogin.password = retrievedAccountForLogin.password;
            isLogin.logins = retrievedAccountForLogin.logins;
            isLogin.transactions = retrievedAccountForLogin.transactions;
            isLogin.budget_amount = retrievedAccountForLogin.balance;
            isLogin.expenses = retrievedAccountForLogin.expenses;
            isLogin.total_expenses = retrievedAccountForLogin.total_expenses;

            console.log(isLogin);

            // check if admin or client
            if (isLogin.accountType === "client") {
              listDeposit.style.display = "none";
              listWithdraw.style.display = "none";
              listHistory.style.display = "none";
              listUsers.style.display = "none";
            } else {
              listSend.style.display = "none";
              listRequest.style.display = "none";
              listTransactionHistory.style.display = "none";
              listProfile.style.display = "none";
            }

            // Set the dashboard balance to current balance
            currentBalance.innerHTML = isLogin.balance
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,");
            currentName.innerHTML = isLogin.firstName;

            // Call Transaction History User
            for (let transaction of isLogin.transactions) {
              // Check transaction if received or send
              let plusminus = "";
              if (transaction.transactionType == "received") {
                plusminus = "+";
              } else {
                plusminus = "-";
              }
              transactionsUser.innerHTML +=
                "<tr><td>" +
                transaction.transactionId +
                "</td><td>" +
                transaction.transactionDate +
                "</td><td>" +
                transaction.transactionAccountNumber +
                "</td><td>" +
                transaction.transactionType +
                "</td>" +
                "<td class='balance'>" +
                plusminus +
                "" +
                transaction.transactionAmount +
                "</td>" +
                "<td class='balance'>" +
                transaction.transactionInitialBalance +
                "</td>" +
                "<td class='balance'>" +
                transaction.transactionNewBalance +
                "</td>" +
                "<td class='balance'>" +
                transaction.transactionDescription +
                "</td>" +
                "</tr>";
            }

            // Call Transaction History User
            for (let expense of isLogin.expenses) {
              budgetUser.innerHTML +=
                "<tr><td>" +
                expense.value +
                "</td><td style='padding-left: 20px;'>" +
                expense.title +
                "</td>" +
                "</tr>";
            }

            expenses_amount.innerHTML =
              "Total Spent: " + isLogin.total_expenses;
          } else {
            usernameField.style.border = "2px solid red";
            errorUsername.style.display = "block";
            errorUsername.innerHTML = "Invalid email or password";
            showPassword.style.top = "400px";
          }
        }
      }
    }
  }
});

// Sign up form
let signupEmail = document.getElementById("signupEmail");
let signupFirstName = document.getElementById("signupFirstName");
let signupLastName = document.getElementById("signupLastName");
let signupPassword = document.getElementById("signupPassword");
let confirmPassword = document.getElementById("confirmPassword");

let errorEmail = document.getElementById("errorEmail");
let errorFirstName = document.getElementById("errorFirstName");
let errorLastName = document.getElementById("errorLastName");
let signupErrorPassword = document.getElementById("signupErrorPassword");
let confirmErrorPassword = document.getElementById("confirmErrorPassword");
let btnSignUp = document.getElementById("btnSignUp");
let btnGotoLogin = document.getElementById("btnGotoLogin");
let loginForm = document.getElementById("loginForm");
let signUpForm = document.getElementById("signUpForm");
let showPasswordSignUptest = document.getElementById("showPasswordSignUp");
let showPasswordConfirmtest = document.getElementById("showPasswordConfirm");

btnGotoLogin.addEventListener("click", (e) => {
  // Sign up error
  errorEmail.style.display = "none";
  signupEmail.style.border = "2px solid white";
  signupEmail.value = "";

  errorFirstName.style.display = "none";
  signupFirstName.style.border = "2px solid white";
  signupFirstName.value = "";

  errorLastName.style.display = "none";
  signupLastName.style.border = "2px solid white";
  signupLastName.value = "";

  signupErrorPassword.style.display = "none";
  signupPassword.style.border = "2px solid white";
  signupPassword.value = "";

  confirmErrorPassword.style.display = "none";
  confirmPassword.style.border = "2px solid white";
  confirmPassword.value = "";

  // show login
  loginForm.style.display = "block";
  signUpForm.style.display = "none";
  showPassword.style.color = "white";
});

// Trigger Sign up
btnSignUp.addEventListener("click", (e) => {
  // check email format
  const mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // check names
  const letters = /^[A-Za-z]+$/;

  // forms validation
  if (!signupEmail.value.match(mailformat)) {
    signupEmail.style.border = "2px solid red";
    errorEmail.style.display = "block";
    showPasswordSignUptest.style.top = "430px";
    showPasswordConfirmtest.style.top = "490px";
  } else if (!signupFirstName.value.match(letters)) {
    signupFirstName.style.border = "2px solid red";
    errorFirstName.style.display = "block";
    showPasswordSignUptest.style.top = "440px";
    showPasswordConfirmtest.style.top = "500px";
  } else if (!signupLastName.value.match(letters)) {
    signupLastName.style.border = "2px solid red";
    signupLastName.style.display = "block";
    showPasswordSignUptest.style.top = "450px";
    showPasswordConfirmtest.style.top = "510px";
  } else if (signupPassword.value == "") {
    signupPassword.style.border = "2px solid red";
    signupErrorPassword.style.display = "block";
    showPasswordSignUptest.style.top = "440px";
    showPasswordConfirmtest.style.top = "500px";
  } else if (signupPassword.value == "") {
    confirmPassword.style.border = "2px solid red";
    confirmErrorPassword.style.display = "block";
  } else if (signupPassword.value != confirmPassword.value) {
    signupPassword.style.border = "2px solid red";
    confirmPassword.style.border = "2px solid red";
    confirmErrorPassword.style.display = "block";
  } else {
    // random account number
    let randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    // Check if users key exists
    if (localStorage.getItem(signupEmail.value) === null) {
      // Pass value to class constructor
      getUser.accountNumber = randomNumber;
      getUser.email = signupEmail.value;
      getUser.firstName = signupFirstName.value;
      getUser.lastName = signupLastName.value;
      getUser.password = signupPassword.value;
      getUser.balance = 0;
      getUser.created_at = getFormattedDate();
      getUser.accountType = "client";
      getUser.total_expenses = 0;

      localStorage.setItem(signupEmail.value, JSON.stringify(getUser));
      clearSignup();
      // show login
      loginForm.style.display = "block";
      signUpForm.style.display = "none";
    } else {
      // Retrieve users
      for (let y = 0; y < localStorage.length; y++) {
        let retrievedAccount = JSON.parse(
          localStorage.getItem(localStorage.key(y))
        );
        console.log(retrievedAccount);
        //check if account number exists
        if (retrievedAccount.accountNumber == randomNumber) {
          console.log("account number already exist");
          let randomNumberNew = Math.floor(
            100000000 + Math.random() * 900000000
          );
          randomNumber = randomNumberNew;
        } else {
          if (retrievedAccount.email == signupEmail.value) {
            console.log("email already exist");
            signupEmail.style.border = "2px solid red";
            errorEmail.style.display = "block";
          } else {
            // Pass value to class constructor
            getUser.accountNumber = randomNumber;
            getUser.email = signupEmail.value;
            getUser.firstName = signupFirstName.value;
            getUser.lastName = signupLastName.value;
            getUser.password = signupPassword.value;
            getUser.balance = 0;
            getUser.created_at = getFormattedDate();
            getUser.accountType = "client";
            getUser.total_expenses = 0;

            localStorage.setItem(getUser.email, JSON.stringify(getUser));
            clearSignup();
            // show login
            loginForm.style.display = "block";
            signUpForm.style.display = "none";
          }
        }
      }
    }
  } // end else form validations
});

// Variables for Send Client Version
const btnSendMoney = document.getElementById("btnSendMoney");
const sendAccountNumber = document.getElementById("sendAccountNumber");
const sendAccountName = document.getElementById("sendAccountName");
const sendAmount = document.getElementById("sendAmount");
const sendDescription = document.getElementById("sendDescription");

// Error fields
const errorsendAccountNumber = document.getElementById(
  "errorsendAccountNumber"
);
const errorsendAccountName = document.getElementById("errorsendAccountName");
const errorsendAmount = document.getElementById("errorsendAmount");

// Error remover
function removeErrorSend() {
  errorsendAccountNumber.style.display = "none";
  sendAccountNumber.style.border = "2px solid white";
  errorsendAccountName.style.display = "none";
  sendAccountName.style.border = "2px solid white";
  errorsendAmount.style.display = "none";
  sendAmount.style.border = "2px solid white";
}

// Clear input() {
function clearSendMoney() {
  sendAccountNumber.value = "";
  sendAccountName.value = "";
  sendAmount.value = "";
  sendDescription.value = "";
}

// Trigger Send/Transfer Balance User/Client
btnSendMoney.addEventListener("click", (e) => {
  // empty validations
  if (sendAccountNumber.value == "") {
    errorsendAccountNumber.style.display = "block";
    sendAccountNumber.style.border = "2px solid red";
  } else if (sendAccountName.value == "") {
    errorsendAccountName.style.display = "block";
    sendAccountName.style.border = "2px solid red";
  } else if (sendAmount.value == "") {
    errorsendAmount.style.display = "block";
    sendAmount.style.border = "2px solid red";
  } else {
    // Retrieve users
    for (let y = 0; y < localStorage.length; y++) {
      let retrievedAccount = JSON.parse(
        localStorage.getItem(localStorage.key(y))
      );

      console.log(retrievedAccount);

      // Check if account number exist from local storage
      if (retrievedAccount.accountNumber == parseInt(sendAccountNumber.value)) {
        // Check if amount is greater than balance
        if (parseInt(sendAmount.value) > isLogin.balance) {
          errorsendAmount.style.display = "block";
          sendAmount.style.border = "2px solid red";
          errorsendAmount.innerHTML =
            "Amount is greater than your current balance";
        } else {
          let compute = isLogin.balance - parseInt(sendAmount.value);

          getUser.accountNumber = isLogin.accountNumber;
          getUser.accountType = isLogin.accountType;
          getUser.balance = compute;
          getUser.created_at = isLogin.created_at;
          getUser.email = isLogin.email;
          getUser.firstName = isLogin.firstName;
          getUser.lastName = isLogin.lastName;
          getUser.logins = isLogin.logins;
          getUser.password = isLogin.password;
          getUser.budget_amount = compute;
          getUser.expenses = isLogin.expenses;
          getUser.total_expenses = isLogin.total_expenses;
          getUser.transactions = isLogin.transactions;

          let sendlastTransactionId = isLogin.transactions.length;

          // get date for transaction ID
          let senddateTransaction = new Date();
          let sendstrTransaction =
            senddateTransaction.getFullYear() +
            "" +
            (senddateTransaction.getMonth() + 1) +
            "" +
            senddateTransaction.getDate() +
            "" +
            senddateTransaction.getHours() +
            "" +
            senddateTransaction.getMinutes() +
            "" +
            senddateTransaction.getSeconds();

          let sendTransaction = {
            transactionId: parseInt(
              sendstrTransaction + sendlastTransactionId++
            ),
            transactionType: "send",
            transactionAmount: parseInt(sendAmount.value),
            transactionDescription: sendDescription.value,
            transactionInitialBalance: isLogin.balance,
            transactionNewBalance: compute,
            transactionDate: getFormattedDate(),
            transactionAccountNumber: parseInt(sendAccountNumber.value),
          };

          getUser.transactions.push(sendTransaction);

          // store it on local storage
          localStorage.setItem(isLogin.email, JSON.stringify(getUser));

          let receiverCompute =
            retrievedAccount.balance + parseInt(sendAmount.value);

          // update sender db
          let sender = {
            accountNumber: retrievedAccount.accountNumber,
            accountType: retrievedAccount.accountType,
            balance: parseInt(receiverCompute),
            created_at: retrievedAccount.created_at,
            email: retrievedAccount.email,
            firstName: retrievedAccount.firstName,
            lastName: retrievedAccount.lastName,
            logins: retrievedAccount.logins,
            password: retrievedAccount.password,
            transactions: retrievedAccount.transactions,
            budget_amount: parseInt(receiverCompute),
            expenses: retrievedAccount.expenses,
            total_expenses: retrievedAccount.total_expenses,
          };

          let receiverlastTransactionId = retrievedAccount.transactions.length;

          // get date for transaction ID
          let receiverdateTransaction = new Date();
          let receiverstrTransaction =
            receiverdateTransaction.getFullYear() +
            "" +
            (receiverdateTransaction.getMonth() + 1) +
            "" +
            receiverdateTransaction.getDate() +
            "" +
            receiverdateTransaction.getHours() +
            "" +
            receiverdateTransaction.getMinutes() +
            "" +
            receiverdateTransaction.getSeconds();

          let receiverTransaction = {
            transactionId: parseInt(
              receiverstrTransaction + receiverlastTransactionId++
            ),
            transactionType: "received",
            transactionAmount: parseInt(sendAmount.value),
            transactionDescription: sendDescription.value,
            transactionInitialBalance: retrievedAccount.balance,
            transactionNewBalance: parseInt(receiverCompute),
            transactionDate: getFormattedDate(),
            transactionAccountNumber: parseInt(isLogin.accountNumber),
          };

          sender.transactions.push(receiverTransaction);

          // update sender
          localStorage.setItem(retrievedAccount.email, JSON.stringify(sender));

          clearSendMoney();
          removeErrorSend();
          errorsendAccountNumber.style.display = "none";
          sendAccountNumber.style.border = "2px solid white";

          isLogin.balance = compute;
          currentBalance.innerHTML = compute;

          // show dashboard
          showDashboard();

          // Insert Transaction History User
          let row = transactionsUser.insertRow(1);
          let cell0 = row.insertCell(0);
          let cell1 = row.insertCell(1);
          let cell2 = row.insertCell(2);
          let cell3 = row.insertCell(3);
          let cell4 = row.insertCell(4);
          let cell5 = row.insertCell(5);
          let cell6 = row.insertCell(6);
          let cell7 = row.insertCell(7);

          cell0.innerHTML = sendTransaction.transactionId;
          cell1.innerHTML = sendTransaction.transactionDate;
          cell2.innerHTML = sendTransaction.transactionAccountNumber;
          cell3.innerHTML = sendTransaction.transactionType;
          cell4.innerHTML = "-" + sendTransaction.transactionAmount;
          cell5.innerHTML = sendTransaction.transactionInitialBalance;
          cell6.innerHTML = sendTransaction.transactionNewBalance;
          cell7.innerHTML = sendTransaction.transactionDescription;
        }
      } else {
        errorsendAccountNumber.style.display = "block";
        sendAccountNumber.style.border = "2px solid red";
        errorsendAccountNumber.innerHTML = "Account number not exist";
      }
    }
  }
});

// Variables for dashboard
const btnDashboard = document.getElementById("btnDashboard");
const btnDeposit = document.getElementById("btnDeposit");
const btnWithdraw = document.getElementById("btnWithdraw");
const btnHistory = document.getElementById("btnHistory");
const btnUsers = document.getElementById("btnUsers");
const btnLogout = document.getElementById("btnLogout");

const bodyDeposit = document.getElementById("bodyDeposit");
const bodyWithdraw = document.getElementById("bodyWithdraw");
const bodyHistory = document.getElementById("bodyHistory");
const bodyUsers = document.getElementById("bodyUsers");

const rowBody = document.getElementsByClassName(".row-body");

// users tab variables
const btnAddUser = document.getElementById("btnAddUser");
const addUser = document.getElementById("addUser");
const userList = document.getElementById("userList");
const backUser = document.getElementById("backUser");
const btnCreateCustomer = document.getElementById("btnCreateCustomer");
const accountNumber = document.getElementById("accountNumber");
const customerName = document.getElementById("customerName");
const customerEmail = document.getElementById("customerEmail");
const customerBalance = document.getElementById("customerBalance");
const customerAccountType = document.getElementById("customerAccountType");
const customers = document.getElementById("customers");

// history tab
const transactions = document.getElementById("transactions");

// deposit tab variables
const depositAccountNumber = document.getElementById("depositAccountNumber");
const depositCustomerName = document.getElementById("depositCustomerName");
const depositAmount = document.getElementById("depositAmount");
const btnDepositCustomer = document.getElementById("btnDepositCustomer");

// withdraw tab variables
const withdrawAccountNumber = document.getElementById("withdrawAccountNumber");
const withdrawCustomerName = document.getElementById("withdrawCustomerName");
const withdrawAmount = document.getElementById("withdrawAmount");
const btnWithdrawCustomer = document.getElementById("btnWithdrawCustomer");

// variables for dashboard user
const currentBalance = document.getElementById("currentBalance");
const currentName = document.getElementById("currentName");

// Vairables for side menu
const allBody = document.querySelectorAll(".row-body-dashboard");

// li buttons
const listSend = document.getElementById("listSend");
const listDashboard = document.getElementById("listDashboard");
const listBudget = document.getElementById("listBudget");

// body
const bodySend = document.getElementById("bodySend");
const bodyDashboard = document.getElementById("bodyDashboard");
const bodyDashboardSide = document.getElementById("bodyDashboardSide");
const bodyHistoryUser = document.getElementById("bodyHistoryUser");
const bodyBudget = document.getElementById("bodyBudget");

// New side menu event
function showSend() {
  for (var i = 0; i < allBody.length; i++) {
    allBody[i].style.visibility = "hidden";
    allBody[i].style.display = "none";
  }

  bodySend.style.display = "flex";
  bodySend.style.visibility = "visible";
  breadcrumbs.innerHTML = "Send";

  let name = "mystyle";
  let arr = listSend.className.split(" ");
  if (arr.indexOf(name) == -1) {
    listSend.className += " " + name;
  }

  // Remove mystyle class
  listTransactionHistory.classList.remove("mystyle");
  listDashboard.classList.remove("mystyle");
}

function showDashboard() {
  for (var i = 0; i < allBody.length; i++) {
    allBody[i].style.visibility = "hidden";
    allBody[i].style.display = "none";
  }

  bodyDashboard.style.display = "flex";
  bodyDashboard.style.visibility = "visible";
  bodyDashboard.style.flexDirection = "column";
  bodyDashboard.style.maxWidth = "70%";

  bodyDashboardSide.style.display = "flex";
  bodyDashboardSide.style.visibility = "visible";
  bodyDashboardSide.style.flexDirection = "column";
  bodyDashboardSide.style.maxWidth = "30%";
  bodyDashboardSide.style.marginRight = "40px";
  bodyDashboardSide.style.marginLeft = "0px";
  breadcrumbs.innerHTML = "Home";

  let name = "mystyle";
  let arr = listDashboard.className.split(" ");
  if (arr.indexOf(name) == -1) {
    listDashboard.className += " " + name;
  }

  // Remove mystyle class
  listTransactionHistory.classList.remove("mystyle");
  listSend.classList.remove("mystyle");
  listBudget.classList.remove("listBudget");
}

function showTransactionHistory() {
  for (var i = 0; i < allBody.length; i++) {
    allBody[i].style.visibility = "hidden";
    allBody[i].style.display = "none";
  }

  bodyHistoryUser.style.display = "flex";
  bodyHistoryUser.style.visibility = "visible";
  breadcrumbs.innerHTML = "Transaction History";

  let name = "mystyle";
  let arr = listTransactionHistory.className.split(" ");
  if (arr.indexOf(name) == -1) {
    listTransactionHistory.className += " " + name;
  }

  // Remove mystyle class
  listDashboard.classList.remove("mystyle");
  listSend.classList.remove("mystyle");
  listBudget.classList.remove("listBudget");
}

function showBudget() {
  for (var i = 0; i < allBody.length; i++) {
    allBody[i].style.visibility = "hidden";
    allBody[i].style.display = "none";
  }

  bodyBudget.style.display = "flex";
  bodyBudget.style.visibility = "visible";
  breadcrumbs.innerHTML = "Budget Tracker";

  let name = "mystyle";
  let arr = listBudget.className.split(" ");
  if (arr.indexOf(name) == -1) {
    listBudget.className += " " + name;
  }

  // Remove mystyle class
  listTransactionHistory.classList.remove("mystyle");
  listDashboard.classList.remove("mystyle");
  listSend.classList.remove("mystyle");
  // setValues();
}

// New side menu event
function showDeposit() {
  for (var i = 0; i < allBody.length; i++) {
    allBody[i].style.visibility = "hidden";
    allBody[i].style.display = "none";
  }

  bodyDeposit.style.display = "flex";
  bodyDeposit.style.visibility = "visible";
  breadcrumbs.innerHTML = "Send";

  let name = "mystyle";
  let arr = listSend.className.split(" ");
  if (arr.indexOf(name) == -1) {
    listSend.className += " " + name;
  }

  // Remove mystyle class
  listTransactionHistory.classList.remove("mystyle");
  listDashboard.classList.remove("mystyle");
}

// side menu event
btnWithdraw.addEventListener("click", (e) => {
  bodyDashboard.style.display = "none";
  bodyDeposit.style.display = "none";
  bodyWithdraw.style.display = "flex";
  bodyHistory.style.display = "none";
  bodyUsers.style.display = "none";
});

btnHistory.addEventListener("click", (e) => {
  bodyDashboard.style.display = "none";
  bodyDeposit.style.display = "none";
  bodyWithdraw.style.display = "none";
  bodyHistory.style.display = "flex";
  bodyUsers.style.display = "none";
  getUser.list_transactions();
});

btnUsers.addEventListener("click", (e) => {
  bodyDashboard.style.display = "none";
  bodyDeposit.style.display = "none";
  bodyWithdraw.style.display = "none";
  bodyHistory.style.display = "none";
  bodyUsers.style.display = "flex";
  getUser.list_users();
});

// Button Deposit section
btnDeposit.addEventListener("click", (e) => {
  bodyDashboard.style.display = "none";
  bodyDeposit.style.display = "flex";
  bodyWithdraw.style.display = "none";
  bodyHistory.style.display = "none";
  bodyUsers.style.display = "none";
});

// Budget tracker
const btn_add_expense = document.getElementById("btnBudgetSubmit");
const input_expense_desc = document.getElementById("budgetDescription");
const input_expense = document.getElementById("budgetAmount");
const expenses_amount = document.getElementById("expenses-amount");

btn_add_expense.addEventListener("click", addExpense, false);

function addExpense() {
  let item = JSON.parse(localStorage.getItem(isLogin.email));

  console.log(item.expenses.length);

  let Newexpenses = {
    title: input_expense_desc.value,
    value: parseInt(input_expense.value),
  };

  let totalExpense = 0;

  if (item.expenses.length == 0) {
    totalExpense = Newexpenses.value;
  } else {
    totalExpense += Newexpenses.value;
    for (var expense of item.expenses) {
      totalExpense += expense.value;
    }
  }

  getUser.accountNumber = item.accountNumber;
  getUser.accountType = item.accountType;
  getUser.created_at = item.created_at;
  getUser.email = item.email;
  getUser.firstName = item.firstName;
  getUser.lastName = item.lastName;
  getUser.logins = item.logins;
  getUser.password = item.password;
  getUser.transactions = item.transactions;
  getUser.total_expenses = totalExpense;
  getUser.balance = item.balance - Newexpenses.value;

  getUser.expenses.push(Newexpenses);

  localStorage.setItem(isLogin.email, JSON.stringify(getUser));

  expenses_amount.innerHTML = "Total Spent: " + totalExpense;

  currentBalance.innerHTML = getUser.balance;

  input_expense.value = "";
  input_expense_desc.value = "";

  let row = budgetUser.insertRow(item.expenses.length + 1);
  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);

  cell0.innerHTML = Newexpenses.value;
  cell1.innerHTML = Newexpenses.title;
}

//   function editExpense(e) {
//   let id = e.target.id;
//   let title = budget.expenses[id].title;
//   let value = budget.expenses[id].value;
//   budget.expenses.splice(id, 0);
//   calculate(true);
//   input_expense_desc.value = title;
//   input_expense.value = value;
// }

// var budget;
// const object_data = {
//   budget_amount: isLogin.balance + 1,
//   total_expenses: 0,
//   balance: isLogin.balance + 1,
//   expenses: [],
// };

// // Initialize local storage
// if (localStorage.getItem(isLogin.email)) {
//   budget = JSON.parse(localStorage.getItem(isLogin.email));
//   setValues();
// } else {
//   localStorage.setItem(isLogin.email, JSON.stringify(object_data));
//   budget = object_data;
// }

// // expense value
// function addExpense() {
//   if (input_expense.value === "" || input_expense_desc.value === "") {
//   } else {
//     budget.expenses.push({
//       title: input_expense_desc.value,
//       value: input_expense.value,
//     });
//     calculate(true);
//   }
// }

// function calculate(val) {
//   if (!val) {
//     budget.balance = input_budget.value;
//   }

//   budget.accountNumber = isLogin.accountNumber;
//   budget.accountType = isLogin.accountType;
//   budget.created_at = isLogin.created_at;
//   budget.email = isLogin.email;
//   budget.firstName = isLogin.firstName;
//   budget.lastName = isLogin.lastName;
//   budget.logins = isLogin.logins;
//   budget.password = isLogin.password;
//   budget.transactions = isLogin.transactions;
//   budget.total_expenses = calculateExpenses();
//   budget.balance = budget.budget_amount - budget.total_expenses;
//   localStorage.setItem(isLogin.email, JSON.stringify(budget));
//   setValues();

//   budget_amount = 0;
// }

// function setValues() {
//   expenses_amount.innerHTML = `P ${budget.total_expenses}`;
//   input_expense.value = "";
//   input_expense_desc.value = "";

//   showListExpenses();
// }

// function calculateExpenses() {
//   let total = 0;
//   if (budget.expenses) {
//     for (let item of budget.expenses) {
//       total += parseInt(item.value);
//     }
//   }
//   return total;
// }

// function showListExpenses() {
//   let content = "";
//   for (let [index, item] of budget.expenses.entries()) {
//     let divs = `
//       <div class="list-item">
//         <div class="col">- ${item.title}</div>
//         <div class="col">P ${item.value}</div>
//         <div class="col">
//           <i id="${index}" class="edit-button fa fa-edit"></i>
//           <i id="${index}" class="delete-button fa fa-trash"></i>
//         </div>
//       </div>
//     `;
//     content += divs;
//   }

//   let el = document.querySelector("#expenses-list");
//   el.innerHTML = content;

//   setEvents();
// }

// Deposit event
btnDepositCustomer.addEventListener("click", (e) => {
  if (
    depositAccountNumber.value === "" ||
    depositCustomerName.value === "" ||
    depositAmount.value === ""
  ) {
    alert("must be filled out");
  } else {
    //test customer name must me a text only
    const rule = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    if (rule.test(depositCustomerName.value)) {
      // loop check if the account number is existing
      for (let y = 0; y < localStorage.length; y++) {
        let retrievedAccount = JSON.parse(
          localStorage.getItem(localStorage.key(y))
        );

        // check if account number and customer name are match
        if (retrievedAccount.accountNumber == depositAccountNumber.value) {
          // plus balance and deposit amount
          let dbBalance = parseInt(retrievedAccount.balance);
          let inputDeposit = parseInt(depositAmount.value);
          let newBalance = dbBalance + inputDeposit;

          getUser.accountNumber = retrievedAccount.accountNumber;
          getUser.accountType = retrievedAccount.accountType;
          getUser.balance = newBalance;
          getUser.budget_amount = retrievedAccount.budget_amount;
          getUser.created_at = retrievedAccount.created_at;
          getUser.email = retrievedAccount.email;
          getUser.expenses = retrievedAccount.expenses;
          getUser.firstName = retrievedAccount.firstName;
          getUser.lastName = retrievedAccount.lastName;
          getUser.logins = retrievedAccount.logins;
          getUser.password = retrievedAccount.password;
          getUser.total_expenses = retrievedAccount.total_expenses;
          getUser.transactions = retrievedAccount.transactions;

          let lastTransactionId = retrievedAccount.transactions.length;

          // get date for transaction ID
          let dateTransaction = new Date();
          let strTransaction =
            dateTransaction.getFullYear() +
            "" +
            (dateTransaction.getMonth() + 1) +
            "" +
            dateTransaction.getDate() +
            "" +
            dateTransaction.getHours() +
            "" +
            dateTransaction.getMinutes() +
            "" +
            dateTransaction.getSeconds();

          let newTransation = {
            transactionId: strTransaction + lastTransactionId++,
            transactionType: "deposit-admin",
            transactionAmount: depositAmount.value,
            transactionInitialBalance: dbBalance,
            transactionNewBalance: newBalance,
            transactionDate: getFormattedDate(),
          };

          getUser.transactions.push(newTransation);

          // store it on local storage
          localStorage.setItem(getUser.email, JSON.stringify(getUser));

          //clear input field
          depositAccountNumber.value = "";
          depositCustomerName.value = "";
          depositAmount.value = "";
          alert("Deposit Success");
          //     }
          //   }
          // } else {
          //   alert("Name cannot contain a number");
        } else {
          console.log("mali");
        }
      }
    } else {
      alert("Name cannot contain a number");
    }
  }
});

// Withdraw event
btnWithdrawCustomer.addEventListener("click", (e) => {
  if (
    withdrawAccountNumber.value === "" ||
    withdrawCustomerName.value === "" ||
    withdrawAmount.value === ""
  ) {
    alert("must be filled out");
  } else {
    //test customer name must me a text only
    const ruleWithdraw = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    if (ruleWithdraw.test(withdrawCustomerName.value)) {
      // loop check if the account number is existing
      for (let y = 0; y < localStorage.length; y++) {
        let retrievedAccountWithdraw = JSON.parse(
          localStorage.getItem(localStorage.key(y))
        );

        // check if account number and customer name are match
        if (
          retrievedAccountWithdraw.accountNumber ===
            withdrawAccountNumber.value &&
          retrievedAccountWithdraw.name === withdrawCustomerName.value
        ) {
          console.log(
            "tama",
            retrievedAccountWithdraw.accountNumber,
            retrievedAccountWithdraw.name
          );

          // plus balance and deposit amount
          let dbBalanceWithdraw = parseInt(retrievedAccountWithdraw.balance);
          let inputWithdraw = parseInt(withdrawAmount.value);
          let newBalanceWithdraw = dbBalanceWithdraw - inputWithdraw;

          getUser.accountNumber = retrievedAccountWithdraw.accountNumber;
          getUser.name = retrievedAccountWithdraw.name;
          getUser.email = retrievedAccountWithdraw.email;
          getUser.balance = newBalanceWithdraw;
          getUser.accountType = retrievedAccountWithdraw.client;
          getUser.created_at = retrievedAccountWithdraw.created_at;
          getUser.transactions = retrievedAccountWithdraw.transactions;

          let lastTransactionIdWithdraw =
            retrievedAccountWithdraw.transactions.length;

          // get date for transaction ID
          let dateTransactionWithdraw = new Date();
          let strTransactionWithdraw =
            dateTransactionWithdraw.getFullYear() +
            "" +
            (dateTransactionWithdraw.getMonth() + 1) +
            "" +
            dateTransactionWithdraw.getDate() +
            "" +
            dateTransactionWithdraw.getHours() +
            "" +
            dateTransactionWithdraw.getMinutes() +
            "" +
            dateTransactionWithdraw.getSeconds();

          let newTransationWithdraw = {
            transactionId: strTransactionWithdraw + lastTransactionIdWithdraw++,
            transactionType: "withdraw",
            transactionAmount: withdrawAmount.value,
            transactionInitialBalance: dbBalanceWithdraw,
            transactionNewBalance: newBalanceWithdraw,
            transactionDate: getFormattedDate(),
          };

          getUser.transactions.push(newTransationWithdraw);

          // store it on local storage
          localStorage.setItem(getUser.accountNumber, JSON.stringify(getUser));

          //clear input field
          withdrawAccountNumber.value = "";
          withdrawCustomerName.value = "";
          withdrawAmount.value = "";
        }
      }
    } else {
      alert("Name cannot contain a number");
    }
  }
});

// Add user
btnAddUser.addEventListener("click", (e) => {
  // random account number every add user page
  let randomAccountNumber = Math.floor(100000000 + Math.random() * 900000000);
  accountNumber.value = randomAccountNumber;
  userList.style.display = "none";
  addUser.style.display = "block";
});

// Create client button
btnCreateCustomer.addEventListener("click", (e) => {
  let defaultBalance = 0;

  if (
    accountNumber.value === "" ||
    customerName.value === "" ||
    customerEmail.value === ""
  ) {
    alert("must be filled out");
  } else {
    // Check name only letters
    const rule = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    if (rule.test(customerName.value)) {
      // Check email validation
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          customerEmail.value
        )
      ) {
        if (customerBalance.value == "") {
          defaultBalance = 0;
        } else {
          defaultBalance = customerBalance.value;
        }

        //check if account number is exists
        while (localStorage.getItem(accountNumber.value) === null) {
          // replace constructor values
          getUser.accountNumber = accountNumber.value;
          getUser.name = customerName.value;
          getUser.email = customerEmail.value;
          getUser.balance = defaultBalance;
          getUser.accountType = customerAccountType.value;
          getUser.created_at = getFormattedDate();

          // store it on local storage
          localStorage.setItem(getUser.accountNumber, JSON.stringify(getUser));

          //clear input field
          customerName.value = "";
          customerEmail.value = "";
          customerBalance.value = "";
          userList.style.display = "block";
          addUser.style.display = "none";
          // getUser.list_users();
        }
      } else {
        alert("You have entered an invalid email address!");
      }
    } else {
      alert("Name cannot contain a number");
    }
  }
});

// Get date for time stamp
function getFormattedDate() {
  let date = new Date();
  let str =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  return str;
}

// Show password
function showPasswordLogin() {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    showPassword.className = "fas fa-eye-slash";
  } else {
    passwordField.type = "password";
    showPassword.className = "fas fa-eye";
  }
}

// Show password sign up
function showPasswordSignup() {
  if (signupPassword.type === "password") {
    signupPassword.type = "text";
    showPasswordSignUp.className = "fas fa-eye-slash";
  } else {
    signupPassword.type = "password";
    showPasswordSignUp.className = "fas fa-eye";
  }
}

function showPasswordConfirm() {
  if (confirmPassword.type === "password") {
    confirmPassword.type = "text";
    showPasswordConfirm.className = "fas fa-eye-slash";
  } else {
    confirmPassword.type = "password";
    showPasswordConfirm.className = "fas fa-eye";
  }
}
