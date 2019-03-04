const token = localStorage.getItem('token');
const voteForm = document.getElementById('select');
const presidentDiv = document.getElementById('president');
const governorDiv = document.getElementById('governor');
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

function getCandidateOffice() {
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
        body += `<select id="offices">
               <option>Select Office</option>`;
        data.data.forEach((option) => {
          body += `<option value='${option.office_id}'>${option.office_name}</option>`;
        });
        body += `</select>`;

        voteForm.innerHTML = body;
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

function getCandidates() {
  fetch('https://politico-page.herokuapp.com/api/v1/candidates', {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data.data);
      if (data.status === 200) {
        const president = data.data.filter(row => row.office_name === 'President');
        let body = '';
        president.forEach((candidate) => {
          body += `<div class='can'>
          <input type= 'radio' id= '${candidate.id}' value= '${candidate.id}'>
          <label for= '${candidate.id}'>${candidate.firstname} ${candidate.othername}</label>
          <img src= '${candidate.passporturl}'>
          <p class="describe"><strong>Party:</strong> ${candidate.party_name}</p>
          <hr>
          </div>`;
        });
        presidentDiv.innerHTML = body;
        const governor = data.data.filter(row => row.office_name === 'Governor');
        let body1 = '';
        governor.forEach((candidate) => {
          body1 += `<div class='can'>
          <input type= 'radio' id= '${candidate.id}' value= '${candidate.id}'>
          <label for= '${candidate.id}'>${candidate.firstname} ${candidate.othername}</label>
          <img src= '${candidate.passporturl}'>
          <p class="describe"><strong>Party:</strong> ${candidate.party_name}</p>
          <hr>
          </div>`;
        });
        governorDiv.innerHTML = body1;
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

document.addEventListener('DOMContentLoaded', () => { getCandidateOffice(); getCandidates(); });

voteForm.addEventListener('change', (e) => {
  if (e.target && e.target.matches('select#offices')) {
    const dropDown = e.target.closest('select');
    if (dropDown.value === '1') {
      presidentDiv.style.display = 'block';
      governorDiv.style.display = 'none';
    } else if (dropDown.value === '2') {
      governorDiv.style.display = 'block';
      presidentDiv.style.display = 'none';
    } else {
      presidentDiv.style.display = 'none';
      governorDiv.style.display = 'none';
    }
  }
});

function vote(e) {
  e.preventDefault();
  const office = document.getElementById('offices').value;
  const candidate = document.querySelector('input[type= radio]:checked').value;
  const regEx = /(key)|(already)|(exists)/gi;
  const errMsg = 'You can only vote one candidate per office';

  fetch ('https://politico-page.herokuapp.com/api/v1/votes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, */*',
      'x-access-token': token,
    },
    body: JSON.stringify({
      'office': office,
      'candidate': candidate,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.status === 201) {
        message.style.display = 'block';
        document.getElementById('msg').innerHTML = 'Voted successfully';
      } else if (regEx.test(data.message)) {
        data.message = errMsg;
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

document.getElementById('btn').addEventListener('click', vote);
