const token = localStorage.getItem('token');
const partyOption = document.getElementById('party-select');
const officeOption = document.getElementById('office-select');
const message = document.getElementById('info');
const close = document.getElementsByClassName('close')[0];

const displayMsg = (errors) => {
  errors.forEach((error) => {
    message.style.display = 'block';
    document.getElementById('msg').innerHTML += `${error}`;
  });
};

close.onclick = () => {
  message.style.display = 'none';
};

function getParties() {
  fetch('https://politico-page.herokuapp.com/api/v1/parties', {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data.data);
      if (data.status === 200) {
        let body = '';
        body += `<label for= 'party-option'>Please choose the party you are a member of: </label>
               <select id='party-option'>
               <option>Select Party</option>`;
        data.data.forEach((option) => {
          body += `<option value='${option.id}'>${option.party_name}</option>`;
        });
        body += `</select>`;

        partyOption.innerHTML = body;
      }
    })
    .catch((err) => {
      console.log(err);
      if (err) {
        message.style.display = 'block';
        document.getElementById('msg').innerHTML = 'Not connected. Check your connection and try again.';
      }
    });
}

function getOffices() {
  fetch('https://politico-page.herokuapp.com/api/v1/offices', {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data.data);
      if (data.status === 200) {
        let body = '';
        body += `<label for='office-option'>Please choose the office you are interested in: </label>
               <select id='office-option'>
               <option>Select Office</option>`;
        data.data.forEach((option) => {
          body += `<option value='${option.office_id}'>${option.office_name}</option>`;
        });
        body += `</select>`;

        officeOption.innerHTML = body;
      }
    })
    .catch((err) => {
      console.log(err);
      if (err) {
        message.style.display = 'block';
        document.getElementById('msg').innerHTML = 'Not connected. Check your connection and try again.';
      }
    });
}

document.addEventListener('DOMContentLoaded', () => { getParties(); getOffices(); });

function register(e) {
  e.preventDefault();
  const userId = localStorage.getItem('userId');
  const partyId = document.getElementById('party-option').value;
  const officeId = document.getElementById('office-option').value;

  fetch (`https://politico-page.herokuapp.com/api/v1/office/${userId}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, */*',
      'x-access-token': token,
    },
    body: JSON.stringify({
      'party': partyId,
      'office': officeId,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.status === 201) {
        message.style.display = 'block';
        document.getElementById('msg').innerHTML = 'Registered succesfully';
      } else if (data.message) {
        console.log(data);
        const obj = data.message;
        const errors = Object.values(obj);
        displayMsg(errors);
      } else {
        const details = data.details.map(msg => (msg.messages));
        details.forEach((msg) => {
          message.style.display = 'block';
          document.getElementById('msg').innerHTML += `
    <ul>
      <li>${msg}</li>
    </ul>
    `;
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (err) {
        message.style.display = 'block';
        document.getElementById('msg').innerHTML = 'Not connected. Check your connection and try again.';
      }
    });
}

document.getElementById('btn').addEventListener('click', register);
