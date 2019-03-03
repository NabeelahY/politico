const token = localStorage.getItem('token');
const candidateTable = document.getElementById('president-candidates');
const governorTable = document.getElementById('governor-candidates');
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
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      if (data.status === 200) {
        const president = data.data.filter(row => row.office_name === 'President');
        let cellRow = '';
        president.forEach((trow) => {
          cellRow += `<tr row_id = "${trow.id}">
          <td><img src='${trow.passporturl}'></td>
          <td>${trow.firstname} ${trow.othername}</td>
          <td>${trow.party_name}</td>
          <td><img src='${trow.logourl}'></td>
          </tr>`;
        });
        candidateTable.innerHTML = cellRow;
        const governor = data.data.filter(row => row.office_name === 'Governor');
        let cellRow1 = '';
        governor.forEach((trow) => {
          cellRow1 += `<tr row_id = "${trow.id}">
          <td><img src='${trow.passporturl}'></td>
          <td>${trow.firstname} ${trow.othername}</td>
          <td>${trow.party_name}</td>
          <td><img src='${trow.logourl}'></td>
          </tr>`;
        });
        governorTable.innerHTML = cellRow1;
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
