const token = localStorage.getItem('token');
const partyTable = document.getElementById('party-table');
const message = document.getElementById('info');
const close = document.getElementsByClassName('close')[0];
let edit = document.getElementsByClassName('edit');
let tdata = document.getElementsByClassName('row_data');
let save = document.getElementsByClassName('save');
const cancel = document.getElementsByClassName('cancel');

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
      'Content-Type': 'application/json',
      'Accept': 'application/json, */*',
      'x-access-token': token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      if (data.status === 200) {
        let cellRow = '';
        data.data.forEach((trow) => {
          cellRow += `<tr row_id = "${trow.id}">
          <td>${trow.logourl}</td>
          <td><div class="row_data" col_name="name">${trow.name}</div></td>
           <td>
            <button class="edit" row_id = "${trow.id}">Edit</button>
            <button class="save" row_id = "${trow.id}">Save</button>
            <button class="cancel" row_id = "${trow.id}">Cancel</button>
          </td>
          <td><button class="delete" row_id = "${trow.id}">Delete</button></td>
          </tr>`;
        });
        return partyTable.innerHTML = cellRow;
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

document.addEventListener('DOMContentLoaded', getParties);


partyTable.addEventListener('click', (e) => {
  if (e.target && e.target.matches('button.edit')) {
    e.preventDefault();
    const trow = e.target.closest('tr');
    const value = trow.querySelector('div.row_data').innerHTML;
    trow.querySelector('button.save').style.display = 'block';
    trow.querySelector('button.cancel').style.display = 'block';
    trow.querySelector('button.edit').style.display = 'none';
    trow.querySelector('div.row_data').classList.add('focus');
    trow.querySelector('div.row_data')
      .setAttribute('contenteditable', 'true');
    trow.querySelector('div.row_data')
      .setAttribute('original', value);
  }
});

partyTable.addEventListener('click', (e) => {
  if (e.target && e.target.matches('button.cancel')) {
    e.preventDefault();
    const trow = e.target.closest('tr');
    const row_id = trow.getAttribute('row_id');
    const original = trow.querySelector('div.row_data').getAttribute('original');
    trow.querySelector('button.save').style.display = 'none';
    trow.querySelector('button.cancel').style.display = 'none';
    trow.querySelector('button.edit').style.display = 'block';
    trow.querySelector('div.row_data').classList.remove('focus');
    trow.querySelector('div.row_data')
      .removeAttribute('contenteditable');
    trow.querySelector('div.row_data').innerHTML = original;
  }
});

partyTable.addEventListener('click', (e) => {
  if (e.target && e.target.matches('button.save')) {
    e.preventDefault();
    const trow = e.target.closest('tr');
    const id = trow.getAttribute('row_id');
    trow.querySelector('button.save').style.display = 'none';
    trow.querySelector('button.cancel').style.display = 'none';
    trow.querySelector('button.edit').style.display = 'block';
    trow.querySelector('div.row_data').classList.remove('focus');
    trow.querySelector('div.row_data').removeAttribute('contenteditable');
    const colName = trow.querySelector('div.row_data').getAttribute('col_name');
    const colValue = trow.querySelector('div.row_data').textContent || trow.querySelector('div.row_data').innerText;
    const arr = {};
    arr[colName] = colValue;

    fetch (`https://politico-page.herokuapp.com/api/v1/parties/${id}/name`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, */*',
        'x-access-token': token,
      },
      body: JSON.stringify({
        'name': arr.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          message.style.display = 'block';
          document.getElementById('msg').innerHTML = 'Party name updated';
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

partyTable.addEventListener('click', (e) => {
  if (e.target && e.target.matches('button.delete')) {
    e.preventDefault();
    const trow = e.target.closest('tr');
    const id = trow.getAttribute('row_id');
    fetch (`https://politico-page.herokuapp.com/api/v1/parties/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, */*',
        'x-access-token': token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          message.style.display = 'block';
          document.getElementById('msg').innerHTML = 'Party deleted';
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
