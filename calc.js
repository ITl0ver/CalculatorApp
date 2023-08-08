// Get DOM elements
const bill = document.getElementById("bill");
const customPercent = document.getElementById("customInput");
const numOfPeople = document.getElementById("numOfPeople");
const tipAmountValue = document.getElementById("tipAmountValue");
const totalAmountValue = document.getElementById("totalAmountValue");
const resetButton = document.getElementById("reset");
const buttons = document.querySelectorAll('.dataInputSection button');
const errorMessage = document.getElementById("message");

let heldButtonValue = null;

// Function to handle button click and set active state
function percent(value) {
  heldButtonValue = value;
  customPercent.value = "";
  updateButtonStates();
  calculation();
}

// Function to handle custom percentage input
function customInputChanged() {
  heldButtonValue = null;
  updateButtonStates();
  calculation();
}

// Function to update button active states
function updateButtonStates() {
  buttons.forEach(btn => {
    const isActive = heldButtonValue !== null && btn.textContent === `${heldButtonValue}%`;
    btn.classList.toggle('active', isActive);
  });
}

// Function to calculate and update the tip and total amounts
function calculation() {
  const billValue = Number(bill.value);
  const customPercentValue = heldButtonValue !== null ? heldButtonValue : Number(customPercent.value);
  const numOfPeopleValue = Number(numOfPeople.value);

  if (billValue > 0 && customPercentValue >= 0 && numOfPeopleValue > 0) {
    const tipAmount = (billValue * customPercentValue) / 100 / numOfPeopleValue;
    const totalAmount = (billValue / numOfPeopleValue) + tipAmount;

    tipAmountValue.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountValue.textContent = `$${totalAmount.toFixed(2)}`;
  } else {
    tipAmountValue.textContent = "$0.00";
    totalAmountValue.textContent = "$0.00";
  }

  if (numOfPeopleValue === 0) {
    errorMessage.style.display = "block"; // Show the error message
  } else {
    errorMessage.style.display = "none"; // Hide the error message
  }
}

// Function to validate input and prevent negative values
function validateInput() {
  const inputField = this;
  if (inputField.value < 0) {
    inputField.value = "";
  }
  calculation();
}

// Event listeners
bill.addEventListener("input", calculation);
bill.addEventListener("input", validateInput);
customPercent.addEventListener("input", customInputChanged);
customPercent.addEventListener("input", validateInput);
numOfPeople.addEventListener("input", calculation);
numOfPeople.addEventListener("input", validateInput);

// Reset button click event
resetButton.addEventListener("click", function () {
  bill.value = "";
  customPercent.value = "";
  numOfPeople.value = "";
  tipAmountValue.textContent = "$0.00";
  totalAmountValue.textContent = "$0.00";
  heldButtonValue = null;
  updateButtonStates();
  errorMessage.style.display = "none";
});

// Initial calculation to set default values when the page loads
calculation();