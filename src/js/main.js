"use strict";

const activityDescriptions = [
  "Siedzący tryb życia, praca biurowa, brak regularnych treningów lub sporadyczne spacery.",
  "Lekka aktywność fizyczna, praca siedząca + lekki trening / sport 1-3 razy w tygodniu.",
  "Umiarkowana aktywność, praca stojąca/chodząca lub trening o średniej intensywności 3-5 razy w tygodniu.",
  "Bardzo wysoka aktywność, ciężka praca fizyczna lub intensywne treningi 6-7 razy w tygodniu.",
  "Ekstremalna aktywność, sport wyczynowy / zawodowy, codzienne bardzo ciężkie treningi lub ciężka praca fizyczna połączona z treningami.",
];

const form = document.querySelector("form");
const isImperialSwitch = document.querySelector("#is-imperial");
const outputContainer = document.querySelector(".output");
const activitySlider = document.querySelector("#activity");
const activityDescription = document.querySelector("#activity-description");

let data;

function init() {
  const baseActivityLevel = 3;

  activityDescription.textContent = activityDescriptions[baseActivityLevel - 1];
  activitySlider.setAttribute("value", baseActivityLevel);
}

// change switch styling on click
// isImperialSwitch.addEventListener("click", function () {
//   const heightInput = document.querySelector("#height");
//   const weightInput = document.querySelector("#weight");

//   this.classList.toggle("switch__off");

//   this.dataset.isImperial =
//     this.dataset.isImperial === "false" ? "true" : "false";

//   if (this.dataset.isImperial === "false") {
//     heightInput.setAttribute("placeholder", "Wzrost (cm)");
//     weightInput.setAttribute("placeholder", "Waga (kg)");
//   } else {
//     heightInput.setAttribute("placeholder", "Wzrost (ft, inch)");
//     weightInput.setAttribute("placeholder", "Waga (lbs)");
//   }
// });

isImperialSwitch.addEventListener("click", function () {
  const heightLabel = document.querySelector("#height-label");
  const weightLabel = document.querySelector("#weight-label");
  const targetWeightLabwel = document.querySelector("#target-weight-label");

  this.classList.toggle("switch__off");

  this.dataset.isImperial =
    this.dataset.isImperial === "false" ? "true" : "false";

  if (this.dataset.isImperial === "false") {
    heightLabel.textContent = "Wzrost (cm)";
    weightLabel.textContent = "Waga (kg)";
    targetWeightLabwel.textContent = "Docelowa waga (kg)";
  } else {
    heightLabel.textContent = "Wzrost (ft, inch)";
    weightLabel.textContent = "Waga (lbs)";
    targetWeightLabwel.textContent = "Docelowa waga (lbs)";
  }
});

// get data from the form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  data = Object.fromEntries(formData.entries());
  data.isImperial = isImperialSwitch.dataset.isImperial;

  console.log(data);

  renderOutput(data);

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
});

// calculate the base metabolism value
function calculateMetabolism() {
  if (data.sex === "male")
    return 66.5 + 13.75 * data.weight + 5.003 * data.height - 6.775 * data.age;
  else if (data.sex === "female")
    return 655.1 + 9.563 * data.weight + 1.85 * data.height - 4.676 * data.age;
}

activitySlider.addEventListener("input", function (e) {
  activityDescription.textContent = activityDescriptions[e.target.value - 1];
});

function renderOutput() {
  const goalDifference = data.weight - data.targetWeight;
  const calorieDeficitOverall = goalDifference * 9 * 1000;
  const calorieDeficitPerDay = calorieDeficitOverall / data.time;
  const activityNumber = (1.025 + data.activity * 0.175).toFixed(2);

  const tdee = (calculateMetabolism() * activityNumber).toFixed(0);
  const diet = (tdee - calorieDeficitPerDay).toFixed(0);

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
  outputContainer.style.visibility = "visible";
}

init();
