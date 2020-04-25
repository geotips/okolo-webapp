url = "https://arcane-depths-61381.herokuapp.com/"
//
// let title;
// let contacts;

// const company = {
//   title: 'Какая-то',
//   contacts: 'Какие-то',
//   infoCompany: (company) => {
//     title = `Название компании: ${company.title}`;
//     contacts = `Сайт компании: ${company.contacts}`;
//
//     let divTitle = document.createElement('div');
//     let divContacts = document.createElement('div');
//
//     divTitle.className = "listOfCompany";
//     divContacts.className = "listOfCompany";
//
//     divTitle.innerHTML = `${title}`;
//     divContacts.innerHTML =`${contacts}`;
//
//     document.body.append(divTitle);
//     document.body.append(divContacts);
//
//   }
// }
let infoCompany = new Vue({
  el: '#infoCompany',
  data: {
    items: [
    ]
  }
})

async function loadData(url = '') {
  const response = await fetch(url);
  const data = await response.json();
  infoCompany.items.push({ message: data.title });
  infoCompany.items.push({ message: data.contacts });

  return data;
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
