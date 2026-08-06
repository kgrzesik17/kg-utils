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
});
