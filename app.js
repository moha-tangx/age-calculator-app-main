// @ts-check
"usestrict";

const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");
const [birthDay, birthMonth, birthYear] = inputs;

let yearsOut = document.getElementById("outputYear");
let monthsOut = document.getElementById("outputMonths");
let daysOut = document.getElementById("outputDays");

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let currentDay = date.getDate();

let year_Months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//  set and remove error function
const setErr = (field, message) => {
  field.nextElementSibling.textContent = message;
  field.parentElement.classList.add("err");
  setTimeout(() => {
    field.nextElementSibling.textContent = "";
    field.parentElement.classList.remove("err");
  }, 2000);
};

// check if the field is empty
function check() {
  inputs.forEach((input) => {
    input.value == "" ? setErr(input, "cant be empty") : validate();
  });
}

function validate() {
  if (
    +birthDay.value > year_Months[+birthMonth.value - 1] ||
    +birthDay.value > 31
  ) {
    setErr(birthDay, "must be a valid day");
  }
  if (+birthMonth.value > year_Months.length) {
    setErr(birthMonth, "must be a valid month");
  }
  if (+birthYear.value > currentYear) {
    setErr(birthYear, "must be in the past");
  } else {
    calculate();
  }
  // checking for leapYear
  +birthYear.value % 4 == 0 && (year_Months[1] = 29);
}

function calculate() {
  let Days = currentDay - +birthDay.value.trim();
  let Months = currentMonth - +birthMonth.value.trim();
  let Years = currentYear - +birthYear.value.trim();

  Days < 0 && ((Months -= 1), (Days += year_Months[currentMonth - 1]));
  Months < 0 && ((Months += 12), (Years -= 1));

  let daysAnimi = 0;
  let monthsAnimi = 0;
  let yearsAnimi = 0;

  function outputAge() {
    if (daysAnimi <= Days) {
      daysAnimi < 10 && (daysAnimi = 0 + daysAnimi);
      // @ts-ignore
      daysOut.textContent = daysAnimi;
      daysAnimi++;
    }
    if (monthsAnimi <= Months) {
      monthsAnimi < 10 && (monthsAnimi = 0 + monthsAnimi);
      // @ts-ignore
      monthsOut.textContent = monthsAnimi;
      monthsAnimi++;
    }
    if (yearsAnimi <= Years) {
      yearsAnimi < 10 && (yearsAnimi = 0 + yearsAnimi);
      // @ts-ignore
      yearsOut.textContent = yearsAnimi;
      yearsAnimi++;
    }
  }
  // let animationInterval = null;

  function animateAge() {
    setInterval(outputAge, 100);
  }
  animateAge();

  setTimeout(() => {
    inputs.forEach((input) => {
      input.value = "";
    });
  }, 100);
}

// @ts-ignore
button.addEventListener("click", (e) => {
  e.preventDefault();
  check();
});

(async () => {
  if ("serviceWorker" in navigator) {
    try {
      let reg = await navigator.serviceWorker.register("../serviceWorker.js");
      console.log("regtered serviceworkr successfullt", reg);
    } catch (error) {
      console.error("someting went wrong");
    }
  }
})();
