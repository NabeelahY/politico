const logIn = document.getElementById('login-form');
const email = document.getElementById('email');
const pswd = document.getElementById('pswd');
const message = document.getElementById('info');

const displayMsg = (errors) => {
  errors.forEach((error) => {
    message.style.display = 'block';
    document.getElementById('msg').innerHTML += `${error}`;
  });
};

logIn.addEventListener('submit', (e) => {
  e.preventDefault();
  const mail = email.value;
  const password = pswd.value;

  fetch('https://politico-page.herokuapp.com/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, */*',
    },
    body: JSON.stringify({
      'email': mail,
      'password': password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        message.style.display = 'block';
        document.getElementById('msg').innerHTML = 'Login successful';
        localStorage.setItem('token', data.data[1].token);
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
