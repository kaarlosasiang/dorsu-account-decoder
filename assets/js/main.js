"use strict";

const form = document.forms["form"].elements;
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const nameExt = document.getElementById("nameExtension");
const schoolID = document.getElementById("schoolId");
const schoolYear = document.getElementById("schoolYear");
const birthMonth = document.getElementById("birthMonth").value;
const inputField = document.querySelectorAll(".user-input");
const submitBtn = document.getElementById("form-submit");
let isValid = false;

introJs().start();
if (
  localStorage.getItem("dorsu-username") &&
  localStorage.getItem("dorsu-password")
) {
  document.getElementById("decoded-details").classList.remove("hidden");
  document.getElementById("username-alert").innerHTML =
    localStorage.getItem("dorsu-username");
  document.getElementById("password-alert").innerHTML =
    localStorage.getItem("dorsu-password");
}
// window.addEventListener("DOMContentLoaded", function () {
//   if (sessionStorage.getItem("isIntrojs") != "true") {
//     introJs().start();
//     sessionStorage.setItem("isIntrojs", "true");
//   }
// });

// window.addEventListener('DOMContentLoaded', function(){
//   Swal.fire({
//     title: '<strong>HTML <u>example</u></strong>',
//     icon: 'info',
//     html:
//       'You can use <b>bold text</b>, ' +
//       '<a href="//sweetalert2.github.io">links</a> ' +
//       'and other HTML tags',
//     showCloseButton: true,
//     showCancelButton: true,
//     focusConfirm: false,
//     confirmButtonText:
//       '<i class="fa fa-thumbs-up"></i> Great!',
//     confirmButtonAriaLabel: 'Thumbs up, great!',
//     cancelButtonText:
//       '<i class="fa fa-thumbs-down"></i>',
//     cancelButtonAriaLabel: 'Thumbs down'
//   })
// })

class User {
  constructor(
    firstName,
    lastName,
    nameExtension,
    schoolId,
    schoolYear,
    birthMonth
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.nameExtension = nameExtension.replace(/\s/g, "");
    this.schoolId = schoolId.replace(/\s/g, "");
    this.schoolYear = schoolYear.replace(/\s/g, "");
    this.birthMonth = birthMonth.replace(/\s/g, "");
  }

  getUsername() {
    const fullName =
      this.nameExtension == ""
        ? this.firstName.replace(/\s/g, "") + this.lastName.replace(/\s/g, "")
        : this.firstName.replace(/\s/g, "") +
          this.lastName.replace(/\s/g, "") +
          this.nameExtension.replace(/\s/g, "");

    const firstLetterOfFirstName = this.firstName
      .replace(/\s/g, "")
      .toUpperCase()[0];
    const firstLetterOfLastName = this.lastName
      .replace(/\s/g, "")
      .toUpperCase()[0];

    const nameCount = fullName.length;

    return `${
      this.schoolId +
      firstLetterOfFirstName +
      firstLetterOfLastName +
      nameCount +
      this.schoolYear
    }`;
  }

  getPassword() {
    const ra = "@ra11033";
    let vowels = 0;
    let consonants = 0;
    const firstLetterOfFirstName = this.firstName
      .replace(/\s/g, "")
      .toUpperCase()[0];
    const firstLetterOfLastName = this.lastName
      .replace(/\s/g, "")
      .toUpperCase()[0];

    const fullName =
      this.nameExtension == ""
        ? this.firstName.replace(/\s/g, "") + this.lastName.replace(/\s/g, "")
        : this.firstName.replace(/\s/g, "") +
          this.lastName.replace(/\s/g, "") +
          this.nameExtension.replace(/\s/g, "");

    for (let i = 0; i < fullName.length; i++) {
      let char = fullName[i].toLowerCase();

      if (
        char == "a" ||
        char == "e" ||
        char == "i" ||
        char == "o" ||
        char == "u"
      ) {
        vowels++;
      } else if (char >= "a" && char <= "z") {
        consonants++;
      }
    }

    return (
      this.birthMonth +
      firstLetterOfFirstName +
      firstLetterOfLastName +
      ra +
      "(" +
      vowels +
      "-" +
      consonants +
      ")"
    );
  }
}

inputField.forEach((element) => {
  element.addEventListener("focusout", function () {
    if (element.value == "") {
      document.getElementById(element.id).classList.add("border-red-500");
      document.querySelector(
        `.${element.id}-error-message`
      ).innerHTML = `${element.placeholder} cannot be empty!`;
    } else {
      document.getElementById(element.id).classList.remove("border-red-500");
      document.querySelector(`.${element.id}-error-message`).innerHTML = "";
      submitBtn.disabled = false;
    }

    const pattern = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    if (pattern.test(document.getElementById("schoolYear").value)) {
      document.getElementById("schoolYear").classList.add("border-red-500");
      document.querySelector(
        `.schoolYear-error-message`
      ).innerHTML = `${element.placeholder} cannot contain special characters!`;
      isValid = false;
    } else if (pattern.test(document.getElementById("schoolId").value)) {
      document.getElementById(element.id).classList.add("border-red-500");
      document.querySelector(
        `.${element.id}-error-message`
      ).innerHTML = `${element.placeholder} cannot contain special characters!`;
      isValid = false;
    } else {
      isValid = true;
    }
  });
});

submitBtn.addEventListener("click", function (e) {
  if (
    form["firstname"].value != "" &&
    form["lastname"].value != "" &&
    form["schoolId"].value != "" &&
    form["schoolYear"].value != "" &&
    form["birthMonth"].value != "default"
  ) {
    if (isValid) {
      console.log(isValid);
      const newUser = new User(
        form["firstname"].value,
        form["lastname"].value,
        form["nameExtension"].value,
        form["schoolId"].value,
        form["schoolYear"].value,
        form["birthMonth"].value
      );

      document.getElementById("decoded-details").classList.remove("hidden");
      document.getElementById("username-alert").innerHTML =
        newUser.getUsername();
      document.getElementById("password-alert").innerHTML =
        newUser.getPassword();

      localStorage.removeItem("dorsu-username");
      localStorage.removeItem("dorsu-password");
      localStorage.setItem("dorsu-username", `${newUser.getUsername()}`);
      localStorage.setItem("dorsu-password", `${newUser.getPassword()}`);

      // Swal.fire({
      //   position: "center",
      //   icon: "success",
      //   html: `<p>Username: ${newUser.getUsername()}</p>
      //   <p>Password: ${newUser.getPassword()}</p>`,
      //   showConfirmButton: true,
      // });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "School Year and ID number cannot contain special characters!",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill up all the necessary fields!",
    });
  }
});

document.getElementById("see-process").addEventListener("click", function () {
  Swal.fire({
    title: "<strong>Decoding Process</strong> ",
    icon: "info",
    html: `<h1>NOTE: Your details will not be saved in our system! Thanks!</h1> <img src="assets/img/username-process.png">
    <img src="assets/img/password-process.png">`,
    showCloseButton: true,
    focusConfirm: false,
    confirmButtonText: "Close",
    confirmButtonAriaLabel: "Thumbs up, great!",
  });
});

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
