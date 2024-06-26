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

const numersOnlyWarning = 'Wrong format, numbers only';
const lettersOnlyWarning = 'Wrong format, letters only';

const checkForm = event => {
  event.preventDefault();
};

const checkInputName = event => {
  const inputName = event.target.value;

  const containsNumbers = /\d/.test(inputName);

  nameErrorElement.classList.replace(containsNumbers ? 'd-none' : 'd-block', containsNumbers ? 'd-block' : 'd-none');

  nameErrorElement.textContent = containsNumbers ? lettersOnlyWarning : '';

  if (!inputName) {
    cardNameElement.textContent = defaultNameString;
    return;
  }

  cardNameElement.textContent = inputName.toUpperCase();
};

const checkInputNumber = event => {
  const inputNumber = event.target.value;

  const checkNumbers = /^\d*$/.test(inputNumber);

  //Solo lee el segundo if
  numberErrorElement.classList.replace(
    inputNumber.length > 16 || !checkNumbers ? 'd-none' : 'd-block',
    inputNumber.length > 16 || !checkNumbers ? 'd-block' : 'd-none'
  );

  numberErrorElement.textContent = inputNumber.length > 16 ? 'Only 16 numbers' : !checkNumbers ? numersOnlyWarning : '';

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
  const inputNumber = event.target.value;

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

  monthErrorElement.textContent = checkNumbers ? '' : numersOnlyWarning;

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

  cvvErrorElement.textContent = checkNumbers ? '' : numersOnlyWarning;

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

  fieldsToValidate.forEach(event => {
    const errorElement = event.errorElement;
    let fieldValue = '';

    if (event.name === 'textContent') {
      fieldValue = formName && formName.value ? formName.value : '';
    } else {
      fieldValue = formName && formName[event.name] && formName[event.name].value ? formName[event.name].value : '';
    }
    if (!fieldValue) {
      errorElement.classList.replace('d-none', 'd-block');
      errorElement.textContent = event.errorMessage;
      rootStyles.setProperty('--border-form', 'red'); // Error pone todo en red
    } else {
      errorElement.classList.replace('d-block', 'd-none');
      errorElement.textContent = '';
    }
  });
};

formElement.addEventListener('submit', checkForm);
formName.addEventListener('input', checkInputName);
formNumber.addEventListener('input', checkInputNumber);
formMonth.addEventListener('input', checkInputMonth);
formYear.addEventListener('input', checkInputYear);
formCvv.addEventListener('input', checkInputCvv);

sendElement.addEventListener('click', sendConfirmation);
