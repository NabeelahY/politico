const token = localStorage.getItem('token');
const profile = document.querySelector('section.top');
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

function userProfile() {
  fetch('https://politico-page.herokuapp.com/api/v1/profile', {
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
        body += `<h2>Welcome ${data.data.firstname} ${data.data.othername}</h2>
                 <div class="user-pic">
                 <img src='${data.data.passporturl}'>
                 </div>
                 <div class="user-details">
                 <p><strong>Email:</strong>${data.data.email}<br>
                 <strong>Phone Number:</strong>${data.data.phonenumber}<br>`;
        profile.innerHTML = body;
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

document.addEventListener('DOMContentLoaded', userProfile);
