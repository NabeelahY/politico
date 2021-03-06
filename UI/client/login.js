const logIn = document.getElementById('login-form');
const message = document.getElementById('info');

const displayMsg = (errors) => {
  errors.forEach((error) => {
    message.style.display = 'block';
    document.getElementById('msg').innerHTML += `${error}`;
  });
};
close.onclick = () => {
  message.style.display = 'none';
};

logIn.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const pswd = document.getElementById('pswd').value;

  fetch('https://politico-page.herokuapp.com/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, */*',
    },
    body: JSON.stringify({
      'email': email,
      'password': pswd,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.status === 200 && data.data[0].isadmin === true) {
        message.style.display = 'block';
        document.getElementById('msg').innerHTML = 'Login successful';
        localStorage.setItem('token', data.data[1].token);
        localStorage.setItem('userId', data.data[0].id);
        window.location.assign('./admin-dashboard.html');
      } else if (data.status === 200 && data.data[0].isadmin === false) {
        message.style.display = 'block';
        document.getElementById('msg').innerHTML = 'Login successful';
        localStorage.setItem('token', data.data[1].token);
        localStorage.setItem('userId', data.data[0].id);
        window.location.assign('./home.html');
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
