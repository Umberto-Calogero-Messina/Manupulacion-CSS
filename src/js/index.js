// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const formElement = document.getElementById('form');

const checkForm = event => {
  event.preventDefault();
};

const checkinput = event => {
  console.log(event.target.value);
};

formElement.addEventListener('submit', checkForm);
formElement.addEventListener('input', checkinput);
