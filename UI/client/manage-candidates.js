const token = localStorage.getItem('token');
const partyTable = document.getElementById('party-table');
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
        if (data.length >= 1) {
          const unconfirmed = data.data.filter(row => row.confirmed !== true);
          console.log(unconfirmed);
          let cellRow = '';
          unconfirmed.forEach((trow) => {
            cellRow += `<tr row_id = "${trow.id}">
            <td>${trow.firstname} ${trow.othername}</td>
            <td>${trow.party_name}</td>
            <td>${trow.office_name}</td>
            <td>
              <button class="edit" row_id = "${trow.id}">Confirm</button>
            </td>
            <td><button class="delete" row_id = "${trow.id}">Decline</button></td>
           </tr>`;
          });
          partyTable.innerHTML = cellRow;
        } else {
          message.style.display = 'block';
          document.getElementById('msg').innerHTML = 'No new requests';
        }
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

document.addEventListener('DOMContentLoaded', getCandidates);

partyTable.addEventListener('click', (e) => {
  if (e.target && e.target.matches('button.edit')) {
    e.preventDefault();
    const trow = e.target.closest('tr');
    const id = trow.getAttribute('row_id');
    const confirm = true;

    fetch (`https://politico-page.herokuapp.com/api/v1/office/${id}/confirm`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, */*',
        'x-access-token': token,
      },
      body: JSON.stringify({
        'confirmed': confirm,
      }),
    })
      .then(res => res.json())
      .then((data) => {
        if (data.status === 200) {
          message.style.display = 'block';
          document.getElementById('msg').innerHTML = 'Candidate confirmed';
          const index = trow.rowIndex;
          document.getElementById('political-party').deleteRow(index);
        } else if (data.message) {
          const obj = data.message;
          const errors = Object.values(obj);
          displayMsg(errors);
        } else {
          const details = data.details.map(msg => (msg.messages));
          details.forEach((msg) => {
            message.style.display = 'block';
            document.getElementById('msg').innerHTML += `${msg}`;
          });
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          message.style.display = 'block';
          document.getElementById('msg').innerHTML = 'Not connected. Check your connection and try again.';
        }
      });
  }
});

partyTable.addEventListener('click', (e) => {
  if (e.target && e.target.matches('button.delete')) {
    e.preventDefault();
    const trow = e.target.closest('tr');
    const id = trow.getAttribute('row_id');
    fetch (`https://politico-page.herokuapp.com/api/v1/candidates/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, */*',
        'x-access-token': token,
      },
    })
      .then(res => res.json())
      .then((data) => {
        if (data.status === 200) {
          message.style.display = 'block';
          document.getElementById('msg').innerHTML = 'Candidate declined';
          const index = trow.rowIndex;
          document.getElementById('political-party').deleteRow(index);
        } else if (data.message) {
          const obj = data.message;
          const errors = Object.values(obj);
          displayMsg(errors);
        } else {
          const details = data.details.map(msg => (msg.messages));
          details.forEach((msg) => {
            message.style.display = 'block';
            document.getElementById('msg').innerHTML += `${msg}`;
          });
        }
      })
      .catch((err) => {
        if (err) {
          message.style.display = 'block';
          document.getElementById('msg').innerHTML = 'Not connected. Check your connection and try again.';
        }
      });
  }
});
