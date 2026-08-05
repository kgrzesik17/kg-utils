"use strict";

const isImperialSwitch = document.querySelector("#is-imperial");

isImperialSwitch.addEventListener("click", function () {
  this.classList.toggle("switch__off");
});
