url = "https://arcane-depths-61381.herokuapp.com/"

let title;
let contacts;

const company = {
  title: 'Какая-то',
  contacts: 'Какие-то',
  infoCompany: (companyName) => {
    title = `Название компании: ${companyName.title}`;
    contacts = `Сайт компании: ${companyName.contacts}`;

    let divTitle = document.createElement('div');
    let divContacts = document.createElement('div');

    divTitle.className = "listOfCompany";
    divContacts.className = "listOfCompany";

    divTitle.innerHTML = `${title}`;
    divContacts.innerHTML =`${contacts}`;

    document.body.append(divTitle);
    document.body.append(divContacts);

  }
}

async function loadData(url = '') {
  const response = await fetch(url);
  const data = await response.json();
  return company.infoCompany(data);
}

function init() {
  document.querySelector('#getJson').addEventListener('click', getJ);

  function getJ () {
    navigator.geolocation.getCurrentPosition(showPosition);

  function showPosition(position) {
    loadData(url+`deliveries/${position.coords.longitude},${position.coords.latitude}`)
    }
  };
}
document.addEventListener('DOMContentLoaded', init);