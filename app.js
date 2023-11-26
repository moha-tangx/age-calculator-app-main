"usestrict";

// input fields and submit button
const inputs = document.querySelectorAll("input"),
  button = document.querySelector("button"),
  [birthDay, birthMonth, birthYear] = inputs;

//  years months and days outputs
let yearsOut = document.getElementById("outputYear"),
  monthsOut = document.getElementById("outputMonths"),
  daysOut = document.getElementById("outputDays");

// current yaer month and day (today's date)
let date = new Date(),
  currentYear = date.getFullYear(),
  currentMonth = date.getMonth(),
  currentDay = date.getDate();

// months of the year
const year_Months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//  set and remove error function
const setErr = (field, message) => {
  // set error
  field.nextElementSibling.textContent = message;
  field.parentElement.classList.add("err");
  field.error = true;
  // remove error after 2 seconds
  setTimeout(() => {
    field.nextElementSibling.textContent = "";
    field.parentElement.classList.remove("err");
    field.error = false;
  }, 2000);
};

function valid() {
  // checking for leapYear
  +birthYear.value % 4 == 0 && (year_Months[1] = 29);

  // checking  for empty fields
  inputs.forEach((input) => {
    input.value == "" && setErr(input, "cant be empty");
  });

  if (
    +birthDay.value > year_Months[+birthMonth.value - 1] ||
    +birthDay.value > 31 ||
    +birthDay.value < 1
  ) {
    setErr(birthDay, "must be a valid day");
  }
  if (+birthMonth.value > year_Months.length || +birthMonth.value < 1) {
    setErr(birthMonth, "must be a valid month");
  }
  if (+birthYear.value > currentYear || birthYear.value < 1) {
    setErr(birthYear, "must be in the past");
  }

  return birthDay.error || birthMonth.error || birthYear.error;
}

function calculate() {
  let Days = currentDay - +birthDay.value.trim(),
    Months = currentMonth - +birthMonth.value.trim(),
    Years = currentYear - +birthYear.value.trim();

  Days < 0 && ((Months -= 1), (Days += year_Months[currentMonth - 1]));
  Months < 0 && ((Months += 12), (Years -= 1));

  let daysAnimi = 0,
    monthsAnimi = 0,
    yearsAnimi = 0;

  function outputAge() {
    if (daysAnimi <= Days) {
      daysAnimi < 10 && (daysAnimi = 0 + daysAnimi);
      daysOut.textContent = daysAnimi;
      daysAnimi++;
    }
    if (monthsAnimi <= Months) {
      monthsAnimi < 10 && (monthsAnimi = 0 + monthsAnimi);
      monthsOut.textContent = monthsAnimi;
      monthsAnimi++;
    }
    if (yearsAnimi <= Years) {
      yearsAnimi < 10 && (yearsAnimi = 0 + yearsAnimi);
      yearsOut.textContent = yearsAnimi;
      yearsAnimi++;
    }
  }

  //animates age output
  setInterval(outputAge, 100);

  // clears the input after a second of calculating the age
  setTimeout(() => {
    inputs.forEach((input) => {
      input.value = "";
    });
  }, 100);
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  !valid() && calculate();
});

// registering SERVICE WORKER
(async () => {
  const onLocalHost =
    window.location.hostname == "localhost" ||
    window.location.hostname == "127.0.0.1";
  if ("serviceWorker" in navigator && !onLocalHost) {
    try {
      await navigator.serviceWorker.register("./serviceWorker.js");
    } catch (error) {
      const message = "someting went wrong";
      // console.error(message);
      alert(message);
    }
  }
})();
