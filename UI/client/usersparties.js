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
function seeParties() {
  fetch('https://politico-page.herokuapp.com/api/v1/parties', {
    method: 'GET',
    headers: {
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
          <td><img src='${trow.logourl}'></td>
          <td><div class="row_data" col_name="name">${trow.party_name}</div></td>
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

document.addEventListener('DOMContentLoaded', seeParties);
