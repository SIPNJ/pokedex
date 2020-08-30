let toggleLight = document.getElementById("toggle-light");
let topnav = document.getElementById("topnav");
let bgthird0 = document.getElementsByClassName("bgthird0");
let bgthird1 = document.getElementsByClassName("bgthird1");
let bgthird2 = document.getElementsByClassName("bgthird2");
let bgthird3 = document.getElementsByClassName("bgthird3");
let bdthird0 = document.getElementsByClassName("bdthird0");
let bdthird1 = document.getElementsByClassName("bdthird1");
let bdthird2 = document.getElementsByClassName("bdthird2");
let bdthird3 = document.getElementsByClassName("bdthird3");
let third0 = document.getElementsByClassName("third0");
let third1 = document.getElementsByClassName("third1");
let third2 = document.getElementsByClassName("third2");
let third3 = document.getElementsByClassName("third3");
// DARK / LIGHT MODE
toggleLight.addEventListener("click", function () {
  toggleLight.classList.toggle("toggle-dark");
  if (toggleLight.classList.contains("toggle-dark") == true) {
    // DOCUMENT COLOR
    document.body.style.backgroundColor = "rgb(0, 0 ,0)";
    // BACKGROUND COLOR
    for (let i = 0; i < bgthird0.length; i++) {
      bgthird0[i].style.backgroundColor = "rgb(255, 255, 255)";
    }
    for (let i = 0; i < bgthird1.length; i++) {
      bgthird1[i].style.backgroundColor = "rgb(0, 0, 0)";
    }
    for (let i = 0; i < bgthird2.length; i++) {
      bgthird2[i].style.backgroundColor = "rgb(224, 224, 228)";
    }
    for (let i = 0; i < bgthird3.length; i++) {
      bgthird3[i].style.backgroundColor = "rgb(45, 45, 45)";
    }
    // TEXT COLOR
    for (let i = 0; i < third0.length; i++) {
      third0[i].style.color = "rgb(255, 255, 255)";
    }
    for (let i = 0; i < third1.length; i++) {
      third1[i].style.color = "rgb(0, 0, 0)";
    }
    for (let i = 0; i < third2.length; i++) {
      third2[i].style.color = "rgb(224, 224, 228)";
    }
    for (let i = 0; i < third3.length; i++) {
      third3[i].style.color = "rgb(45, 45, 45)";
    }
    // BORDER COLOR
    for (let i = 0; i < bdthird0.length; i++) {
      bdthird0[i].style.borderColor = "rgb(255, 255, 255)";
    }
    for (let i = 0; i < bdthird1.length; i++) {
      bdthird1[i].style.borderColor = "rgb(0, 0, 0)";
    }
    for (let i = 0; i < bdthird2.length; i++) {
      bdthird0[i].style.borderColor = "rgb(224, 224, 228)";
    }
    for (let i = 0; i < bdthird3.length; i++) {
      bdthird1[i].style.borderColor = "rgb(45, 45, 45)";
    }
  } else {
    // DOCUMENT COLOR
    document.body.style.backgroundColor = "rgb(255, 255, 255)";
    // BACKGROUND COLOR
    for (let i = 0; i < bgthird0.length; i++) {
      bgthird0[i].style.backgroundColor = "rgb(0, 0, 0)";
    }
    for (let i = 0; i < bgthird1.length; i++) {
      bgthird1[i].style.backgroundColor = "rgb(255, 255, 255)";
    }
    for (let i = 0; i < bgthird2.length; i++) {
      bgthird2[i].style.backgroundColor = "rgb(45, 45, 45)";
    }
    for (let i = 0; i < bgthird3.length; i++) {
      bgthird3[i].style.backgroundColor = "rgb(224, 224, 228)";
    }
    // TEXT COLOR
    for (let i = 0; i < third0.length; i++) {
      third0[i].style.color = "rgb(0, 0, 0)";
    }
    for (let i = 0; i < third1.length; i++) {
      third1[i].style.color = "rgb(255,255,255)";
    }
    for (let i = 0; i < third2.length; i++) {
      third2[i].style.color = "rgb(45, 45, 45)";
    }
    for (let i = 0; i < third3.length; i++) {
      third3[i].style.color = "rgb(224, 224, 228)";
    }
    // BORDER COLOR
    for (let i = 0; i < bdthird0.length; i++) {
      bdthird0[i].style.borderColor = "rgb(0, 0, 0)";
    }
    for (let i = 0; i < bdthird1.length; i++) {
      bdthird1[i].style.borderColor = "rgb(255,255,255)";
    }
    for (let i = 0; i < bdthird2.length; i++) {
      bdthird2[i].style.borderColor = "rgb(45, 45, 45)";
    }
    for (let i = 0; i < bdthird3.length; i++) {
      bdthird3[i].style.borderColor = "rgb(224, 224, 228)";
    }
  }
});
// Top navigation
let account_drop_down = document.getElementById("accountDropdown");
// Signin or Not
let keyLogin = localStorage.getItem("keyLogin");
// console.log(keyLogin);
if (keyLogin == null || keyLogin == "null") {
  let signin_item = document.createElement("a");
  signin_item.classList.add("dropdown-item");
  signin_item.classList.add("subtitle");
  signin_item.classList.add("text-dark");
  signin_item.innerHTML = "Sign in";
  signin_item.href =
    "/stunary/account/signin/signin.html";
  let signup_item = document.createElement("a");
  signup_item.classList.add("dropdown-item");
  signup_item.classList.add("subtitle");
  signup_item.classList.add("text-dark");
  signup_item.innerHTML = "Sign up";
  signup_item.href =
    "/stunary/account/signup/signup.html";
  account_drop_down.appendChild(signin_item);
  account_drop_down.appendChild(signup_item);
} else {
  let profile = document.createElement("a");
  profile.classList.add("dropdown-item");
  profile.classList.add("subtitle");
  profile.classList.add("text-dark");
  profile.innerHTML = "Profile";
  profile.href =
    "/stunary/account/signin/signin.html";
  let signout_item = document.createElement("a");
  signout_item.classList.add("dropdown-item");
  signout_item.classList.add("subtitle");
  signout_item.classList.add("text-danger");
  signout_item.innerHTML = "Sign out";
  signout_item.addEventListener("click", function () {
    keyLogin = localStorage.setItem("keyLogin", null);
    console.log(keyLogin);
    window.open("http://localhost:31415/", "_self")
  });
  account_drop_down.appendChild(profile);
  account_drop_down.appendChild(signout_item);
}

// Top Navigation

// let rootnav = document.getElementById("root-nav");
// let nav = document.createElement("nav");
// nav.classList.add(
//   "navbar",
//   "navbar-expand-md",
//   "navbar-light",
//   "bgbase3",
//   "container-fluid"
// );
// let button_nav = document.createElement("button");
// button_nav.classList.add("navbar-toggler");
// button_nav.type = "button";
