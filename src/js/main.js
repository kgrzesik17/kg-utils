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
  calculateCalories();
});

function calculateMetabolism() {
  if (data.sex === "male")
    return 66.5 + 13.75 * data.weight + 5.003 * data.height - 6.775 * data.age;
  else if (data.sex === "female")
    return 655.1 + 9.563 * data.weight + 1.85 * data.height - 4.676 * data.age;
}

function calculateCalories() {
  const goalDifference = data.weight - data.targetWeight;
  const calorieDeficitOverall = goalDifference * 9 * 1000;
  const calorieDeficitPerDay = calorieDeficitOverall / data.time;
  const activityNumber = (1.025 + data.activity * 0.175).toFixed(2);

  const tdee = (calculateMetabolism() * activityNumber).toFixed(0);
  const diet = (tdee - calorieDeficitPerDay).toFixed(0);

  console.log(`Daily base metabolism: ${calculateMetabolism()} kcal`);
  console.log(`With all daily activities, that comes to ${tdee} kcal`);
  console.log(
    `You need to keep ${calorieDeficitPerDay} calorie sulprus/deficit per day`,
  );
  console.log(
    `That means you have to eat around ${diet} calories per day for ${data.time} days to reach the goal`,
  );
}
