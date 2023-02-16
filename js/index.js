var registerInputs = document.querySelectorAll(`input`);
var nameInput = document.querySelector(`#nameInput`);
var emailInput = document.querySelector(`#emailInput`);
var passwordInput = document.querySelector(`#passwordInput`);
var accounts = [];
var loginEmailInput = document.querySelector(`#loginEmailInput`);
var loginPasswordInput = document.querySelector(`#loginPasswordInput`);
var resSuccess = document.querySelector(`#resSuccess`);
var resLogin = document.querySelector(`#resLogin`);

for (i = 0; i < registerInputs.length; i++) {
  registerInputs[i].addEventListener(`focus`, function (eventInfo) {
    eventInfo.target.classList.replace(`border-dark-subtle`, `border-info`);
  })
  registerInputs[i].addEventListener(`blur`, function (eventInfo) {
    eventInfo.target.classList.replace(`border-info`, `border-dark-subtle`);
  })
}

var welcomeMsg = localStorage.getItem('Username')
if (welcomeMsg) {
  document.querySelector(`#welcomeMsg`).innerHTML = "Welcome " + welcomeMsg;
}

if (localStorage.getItem(`accountDetails`) != null) {
  accounts = JSON.parse(localStorage.getItem(`accountDetails`))
}


function register() {
  if (checkEmpty() == true) {
    resSuccess.innerHTML = `All inputs is required`;
    resSuccess.classList.replace(`text-success`, `text-danger`);
  }
  else if (checkExist() == true) {
    resSuccess.innerHTML = `email already exists`;
    resSuccess.classList.replace(`text-success`, `text-danger`);
  }
  else {
    var user = {
      namee: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    accounts.push(user);
    localStorage.setItem(`accountDetails`, JSON.stringify(accounts));
    resSuccess.classList.replace(`text-danger`, `text-success`);
    resSuccess.innerHTML = `Success`;
  }
}



function checkExist() {
  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].email.toLowerCase() == emailInput.value.toLowerCase()) {
      return true
    }
  }
}

function checkEmpty() {
  if (nameInput.value == "" || emailInput.value == "" || passwordInput.value == "") {
    return true
  }
  else {
    return false
  }
}



function login() {
  if (loginCheckEmpty() == true) {
    resLogin.innerHTML = `All inputs is required`;
    resLogin.classList.replace(`text-success`, `text-danger`);
  }
  else {
    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].email.toLowerCase() == loginEmailInput.value.toLowerCase() && String(accounts[i].password).toLowerCase() == String(loginPasswordInput.value).toLowerCase()) {
        localStorage.setItem('Username', accounts[i].namee)
        location.href = `Home.html`;
      }
      else {
        resLogin.innerHTML = `incorrect email or password`;
        resLogin.classList.replace(`text-success`, `text-danger`);
      }
    }
  }
}

function loginCheckEmpty() {
  if (loginEmailInput.value == "" || loginPasswordInput.value == "") {
    return true
  }
  else {
    return false
  }
}

function logout() {
  location.href = `index.html`;
  localStorage.removeItem(`Username`);
}