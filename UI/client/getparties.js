const token = localStorage.getItem('token');
let partyTable = document.getElementById('political-party');
const message = document.getElementById('info');
const close = document.getElementsByClassName('close')[0];

const displayMsg = (errors) => {
  errors.forEach((error) => {
    message.style.display = 'block';
    document.getElementById('msg').innerHTML += `
    <ul>
      <li>${error}</li>
    </ul>
    `;
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
        partyTable.innerHTML += `
        <tr>
            <th>Logo</th>
            <th>Political Party</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        <tbody>`;
        data.data.forEach((row) => {
          partyTable.innerHTML += `<tr row_id = "${row.id}">
        <td>${row.logourl}</td>
        <td>${row.name}</td>
        <td>
            <button class="edit" row_id = "${row.id}">Edit</button>
            <button class="save" row_id = "${row.id}">Save</button>
            <button class="cancel" row_id = "${row.id}">Cancel</button>
        </td>
        <td><button class="delete" row_id = "${row.id}">Delete</button></td>
        </tr>
        </tbody>`;
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
document.addEventListener('DOMContentLoaded', getParties);
