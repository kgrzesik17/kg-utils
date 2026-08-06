"use strict";

const form = document.querySelector("form");
const isImperialSwitch = document.querySelector("#is-imperial");

let data;

// change switch styling on click
isImperialSwitch.addEventListener("click", function () {
  this.classList.toggle("switch__off");
});

// get data from the form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  data = Object.fromEntries(formData.entries());

  console.log(data);
  console.log(calculateMetabolism(data));
});

function calculateMetabolism(data) {
  if (data.sex === "male")
    return 66.5 + 13.75 * data.weight + 5.003 * data.height - 6.775 * data.age;
  else if (data.sex === "female")
    return 655.1 + 9.563 * data.weight + 1.85 * data.height - 4.676 * data.age;
}
