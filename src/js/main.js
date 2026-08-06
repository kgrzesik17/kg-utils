"use strict";

const isImperialSwitch = document.querySelector("#is-imperial");
const submitButton = document.querySelector(".feature-submit");

const heightInput = document.querySelector("#height");

let height, weight, age, target_weight, time, isImperial, sex, activity;

isImperialSwitch.addEventListener("click", function () {
  this.classList.toggle("switch__off");
});

submitButton.addEventListener("click", function () {
  validate();
});

function validate() {
  console.log(heightInput.value);
}
