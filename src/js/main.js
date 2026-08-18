"use strict";

const form = document.querySelector("form");
const isImperialSwitch = document.querySelector("#is-imperial");
const outputContainer = document.querySelector(".output");

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
  // calculateCalories();

  renderOutput(data);
});

function calculateMetabolism() {
  if (data.sex === "male")
    return 66.5 + 13.75 * data.weight + 5.003 * data.height - 6.775 * data.age;
  else if (data.sex === "female")
    return 655.1 + 9.563 * data.weight + 1.85 * data.height - 4.676 * data.age;
}

function renderOutput() {
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

  const html = `
  <p class="output-title">Wynik</p><p class="output-info">
              Twój bazowy metabolizm to
              <span class="output-number" id="base-metabolism">${calculateMetabolism().toFixed(0)}</span> kcal
            </p>
            <p class="output-info">
              Razem z aktywnością daje
              <span class="output-number" id="base-metabolism">${tdee}</span> kcal
            </p>
            <p class="output-info">
              Potrzebujesz deficytu
              <span class="output-number" id="base-metabolism">${calorieDeficitPerDay}</span> kcal dziennie
            </p>
            <p class="output-info">
              Musisz jeść
              <span class="output-number" id="base-metabolism">${diet}</span> kcal
              dziennie przez
              <span class="output-number" id="base-metabolism">${data.time}</span> dni,
              aby osiągnąć cel.
            </p>`;

  outputContainer.innerHTML = "";
  outputContainer.insertAdjacentHTML("beforeend", html);
}
