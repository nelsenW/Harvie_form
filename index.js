let num = 1;
let validZipcode = false;

// Prevents submission of form on pressing of enter key unless on final step.
// Allows for moving of form on other steps
document.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    e.preventDefault();
    if (num === 6 || (!validZipcode && num === 3)) {
      handleSubmit();
    } else {
      handleMove(1);
    }
  }
});

// Moves between different tabs of the form.
const handleMove = (val) => {
  const previousButton = document.querySelector("#previous");
  const nextButton = document.querySelector("#next");
  const submitButton = document.querySelector("#submit");
  const placeholder = document.querySelector("#placeholder");

  num += val;
  handleSteps(num);
  if (num === 1) {
    previousButton.style.display = "none";
    placeholder.style.display = "block";
  } else {
    previousButton.style.display = "block";
    placeholder.style.display = "none";
  }

  if (num === 6 || (!validZipcode && num === 3)) {
    nextButton.style.display = "none";
    submitButton.style.display = "block";
  } else {
    submitButton.style.display = "none";
    nextButton.style.display = "block";
  }

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.remove("visible");
    if (num === +card.id) {
      card.classList.add("visible");
    }
  });
};

// Increments step bubbles at the bottom.
const handleSteps = (num) => {
  const steps = document.querySelectorAll(".step");
  steps.forEach((step, i) => {
    if (i === num - 1) {
      step.classList.add("active");
    } else if (i > num - 1) {
      step.classList.remove("active");
      step.classList.remove("finished");
    } else {
      step.classList.replace("active", "finished");
    }
  });
};

// Formats zipcode text and switches form if invalid zipcode.
const handleZipCode = (e) => {
  const zipcode = document.getElementById("zipcode");
  const email = document.getElementById("email");
  const steps = document.querySelectorAll(".step");
  const firstDelivery = document.querySelector("#first-delivery");
  let day;
  switch (+e) {
    case 15133:
    case 15122:
    case 15210:
    case 15367:
    case 15234:
    case 15207:
    case 15226:
    case 15102:
    case 15227:
    case 15120:
    case 15236:
    case 15211:
    case 15203:
    case 15228:
    case 15218:
    case 15221:
    case 15104:
    case 15642:
    case 15132:
    case 15131:
    case 15035:
    case 15137:
    case 15045:
    case 15112:
    case 15145:
    case 15110:
    case 15034:
    case 15615:
    case 15148:
    case 15647:
    case 15025:
      day = "Tuesday";
      break;
    case 15015:
    case 15042:
    case 15086:
    case 15668:
    case 16059:
    case 15024:
    case 15116:
    case 15147:
    case 15146:
    case 15139:
    case 15239:
    case 15209:
    case 16046:
    case 15044:
    case 15101:
    case 15214:
    case 15090:
    case 16066:
    case 15229:
    case 15235:
    case 15224:
    case 15215:
    case 15238:
    case 15201:
    case 15223:
    case 15140:
    case 15051:
    case 15075:
    case 15006:
    case 15007:
    case 15632:
    case 15085:
      day = "Wednesday";
      break;
    case 15219:
    case 15222:
    case 15213:
    case 15208:
    case 15232:
    case 15217:
    case 15206:
    case 15260:
    case 15212:
    case 15233:
      day = "Thursday";
      break;
    case 15017:
    case 15056:
    case 15057:
    case 15060:
    case 15071:
    case 15106:
    case 15108:
    case 15126:
    case 15136:
    case 15142:
    case 15143:
    case 15202:
    case 15204:
    case 15205:
    case 15216:
    case 15220:
    case 15237:
    case 15241:
    case 15243:
    case 15317:
    case 15321:
    case 15350:
    case 15361:
    case 15055:
    case 15064:
    case 15031:
    case 15082:
    case 15290:
    case 15225:
    case 15363:
    case 15342:
      day = "Friday";
      break;
    default:
      break;
  }
  if (day) {
    zipcode.textContent = `We deliver to your neighborhood every ${day}`;
    firstDelivery.textContent = handleDelivery(day);
    validZipcode = true;
    steps.forEach((step, i) => {
      if (i >= 3) {
        step.style.display = "inline-block";
      }
    });
  } else {
    email.textContent = `Add your email and we'll let you know if we expand to your area!*`;
    zipcode.textContent = "We do not deliver to your area currently!";
    steps.forEach((step, i) => {
      if (i >= 3) {
        step.style.display = "none";
      }
    });
  }
};

// Formats delivery date text based on what zipcode is selected.
const handleDelivery = (deliveryDay) => {
  let currentDate = new Date();
  let resultDate = new Date();
  let dayOfWeek;

  switch (deliveryDay) {
    case "Tuesday":
      dayOfWeek = 2;
      break;
    case "Wednesday":
      dayOfWeek = 3;
      break;
    case "Thursday":
      dayOfWeek = 4;
      break;
    case "Friday":
      dayOfWeek = 5;
      break;
  }

  resultDate.setDate(
    resultDate.getDate() + ((7 + dayOfWeek - resultDate.getDay()) % 7)
  );
  resultDate.setHours(0, 0, 0, 0);

  // Add a week if their are less than 18 hours before the delivery date.
  console.log(resultDate)
  if ((resultDate - currentDate) / (1000 * 60 * 60) < 18) {
      resultDate.setDate(resultDate.getDate() + 7);
  }
  console.log(resultDate.getDay())

  return `Your first delivery date will be ${deliveryDay}, ${resultDate.getMonth() + 1}/${resultDate.getDay() + 1}`;
};

const handleSubmit = (e) => {
  e.preventDefault();

};
