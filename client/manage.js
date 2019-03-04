const createParty = document.getElementById('party-form');
const createOffice = document.getElementById('office-form');
const token = localStorage.getItem('token');
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

createParty.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(createParty);

  fetch('https://politico-page.herokuapp.com/api/v1/parties', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, */*',
      'x-access-token': token,
    },
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 201) {
        message.style.display = 'block';
        document.getElementById('msg').innerHTML = 'Party created successfully';
      } else if (data.message) {
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
});

createOffice.addEventListener('submit', (e) => {
  e.preventDefault();
  const officeType = document.getElementById('office-type').value;
  const officeName = document.getElementById('office-name').value;

  fetch('https://politico-page.herokuapp.com/api/v1/offices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, */*',
      'x-access-token': token,
    },
    body: JSON.stringify({
      'office_name': officeName,
      'type': officeType,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 201) {
        message.style.display = 'block';
        document.getElementById('msg').innerHTML = 'Office created successfully';
      } else if (data.message) {
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
      if (err) {
        message.style.display = 'block';
        document.getElementById('msg').innerHTML = 'Not connected. Check your connection and try again.';
      }
    });
});
