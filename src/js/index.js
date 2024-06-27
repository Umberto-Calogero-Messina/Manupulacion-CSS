// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
const rootStyles = document.documentElement.style;
// const checkForm = event => {
//   event.preventDefault();
// };

// const checkinput = event => {
//   console.log(event.target.value);
// };

// formElement.addEventListener('submit', checkForm);
// formElement.addEventListener('input', checkinput);

const formElement = document.getElementById('form');
const formName = document.getElementById('name');
const formNumber = document.getElementById('number');
const formMonth = document.getElementById('month');
const formYear = document.getElementById('year');
const formCvv = document.getElementById('cvv');
const sendElement = document.getElementById('submit');

const nameElement = document.getElementById('name');
const cardNameElement = document.getElementById('card-name');
const cardNumberElement = document.getElementById('card-number');
const cardMonthElement = document.getElementById('card-month');
const cardYearElement = document.getElementById('card-year');
const cardCvvElement = document.getElementById('card-cvv');

const nameErrorElement = document.getElementById('name--log');
const numberErrorElement = document.getElementById('number--log');
const monthErrorElement = document.getElementById('month--log');
const cvvErrorElement = document.getElementById('cvv--log');

const defaultNameString = cardNameElement.textContent;
const defaultNumberString = cardNumberElement.textContent;
const defaultMonthString = cardMonthElement.textContent;
const defaultYearString = cardYearElement.textContent;
const defaultCvvString = cardCvvElement.textContent;

const inputAllElement = document.querySelectorAll('input[type=text]');

const numersOnlyWarning = 'Wrong format, numbers only';
const lettersOnlyWarning = 'Wrong format, letters only';

const checkForm = event => {
  event.preventDefault();

  for (const input of inputAllElement) {
    input.classList.remove('error');
    if (!input.value) {
      input.classList.add('error');
      input.nextElementSibling.classList.replace('d-none', 'd-block');
    } else {
      input.classList.remove('error');
      input.nextElementSibling.classList.replace('d-block', 'd-none');
    }
  }
};

const checkInputName = event => {
  const inputName = event.target.value;

  const containsNumbers = /\d/.test(inputName);

  nameErrorElement.classList.replace(containsNumbers ? 'd-none' : 'd-block', containsNumbers ? 'd-block' : 'd-none');

  nameErrorElement.textContent = containsNumbers ? lettersOnlyWarning : "Can't be Blank";

  if (!inputName) {
    cardNameElement.textContent = defaultNameString;
    return;
  }

  cardNameElement.textContent = inputName.toUpperCase();
};

const checkInputNumber = event => {
  const inputNumber = event.target.value;

  const checkNumbers = /^\d*$/.test(inputNumber);

  numberErrorElement.classList.replace(
    inputNumber.length > 16 || !checkNumbers ? 'd-none' : 'd-block',
    inputNumber.length > 16 || !checkNumbers ? 'd-block' : 'd-none'
  );

  numberErrorElement.textContent =
    inputNumber.length > 16 ? 'Only 16 numbers' : !checkNumbers ? numersOnlyWarning : "Can't be Blank";

  let formattedNumber = '';

  for (let i = 0; i < inputNumber.length; i += 4) {
    formattedNumber += inputNumber.substr(i, 4);
    if (i + 4 < inputNumber.length) {
      formattedNumber += ' ';
    }
  }

  if (!inputNumber) {
    cardNumberElement.textContent = defaultNumberString;
    return;
  }

  cardNumberElement.textContent = formattedNumber;
};

const checkInputMonth = event => {
  const inputNumber = Number(event.target.value);

  inputNumber > 12 ? (formMonth.value = 12) : event.target.value;

  const checkNumbers = /^\d*$/.test(inputNumber);

  if (checkNumbers) {
    monthErrorElement.classList.replace('d-block', 'd-none');
  } else {
    monthErrorElement.classList.replace('d-none', 'd-block');
    monthErrorElement.textContent = numersOnlyWarning;
  }

  if (!inputNumber) {
    cardMonthElement.textContent = defaultMonthString;
    return;
  }

  cardMonthElement.textContent = inputNumber;
};
const checkInputYear = event => {
  const inputNumber = event.target.value;
  const checkNumbers = /^\d*$/.test(inputNumber);

  monthErrorElement.classList.replace(checkNumbers ? 'd-block' : 'd-none', checkNumbers ? 'd-none' : 'd-block');

  monthErrorElement.textContent = checkNumbers ? "Can't be Blank" : numersOnlyWarning;

  if (!inputNumber) {
    cardYearElement.textContent = defaultYearString;
    return;
  }

  cardYearElement.textContent = inputNumber;
};
const checkInputCvv = event => {
  const inputNumber = event.target.value;
  const checkNumbers = /^\d*$/.test(inputNumber);

  cvvErrorElement.classList.replace(checkNumbers ? 'd-block' : 'd-none', checkNumbers ? 'd-none' : 'd-block');

  cvvErrorElement.textContent = checkNumbers ? "Can't be Blank" : numersOnlyWarning;

  if (!inputNumber) {
    cardCvvElement.textContent = defaultCvvString;

    return;
  }

  cardCvvElement.textContent = inputNumber;
};

const sendConfirmation = () => {
  const fieldsToValidate = [
    { name: 'textContent', errorElement: nameErrorElement, errorMessage: `Can't be Blank` },
    { name: 'formNumber', errorElement: numberErrorElement, errorMessage: `Can't be Blank` },
    { name: 'formMonth', errorElement: monthErrorElement, errorMessage: `Can't be Blank` },
    { name: 'formYear', errorElement: monthErrorElement, errorMessage: `Can't be Blank` },
    { name: 'formCvv', errorElement: cvvErrorElement, errorMessage: `Can't be Blank` }
  ];
};

formElement.addEventListener('submit', checkForm);
formName.addEventListener('input', checkInputName);
formNumber.addEventListener('input', checkInputNumber);
formMonth.addEventListener('input', checkInputMonth);
formYear.addEventListener('input', checkInputYear);
formCvv.addEventListener('input', checkInputCvv);

sendElement.addEventListener('click', sendConfirmation);
