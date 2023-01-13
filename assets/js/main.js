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
// const userDetails = {
//     firstName : '',
//     lastName : '',
//     nameExtension : '',
//     schoolId : '',
//     birthYear: '',
//     birthMonth: ''
// }

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

    console.log(fullName);
    console.log(firstLetterOfFirstName);
    console.log(firstLetterOfLastName);

    const nameCount = fullName.length;
    console.log(nameCount);

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

inputField.forEach(element => {
  console.log(element);
  element.addEventListener("focusout", function(){
    if (element.value == '') {
      document.getElementById(element.id).classList.add("border-red-500");
      document.querySelector(`.${element.id}-error-message`).innerHTML = `${element.placeholder} cannot be empty!`;
    }else{
      document.getElementById(element.id).classList.remove("border-red-500");
      document.querySelector(`.${element.id}-error-message`).innerHTML = ``;
      submitBtn.disabled = false;
    }
  })
})

submitBtn.addEventListener("click", function (e) {
  const newUser = new User(
    form["firstname"].value,
    form["lastname"].value,
    form["nameExtension"].value,
    form["schoolId"].value,
    form["schoolYear"].value,
    form["birthMonth"].value
  );

  console.log(newUser.getUsername());
  console.log(newUser.getPassword());

  if (newUser.getUsername() && newUser.getPassword()) {
    Swal.fire({
      position: "center",
      icon: "success",
      html:`<p>Username: ${newUser.getUsername()}</p>
      <p>Password: ${newUser.getPassword()}</p>`,
      showConfirmButton: true,
    });
  }
});
