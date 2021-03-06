const signUp = document.getElementById('signup-form');
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

signUp.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(signUp);

  fetch ('https://politico-page.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, */*',
    },
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 201) {
        message.style.display = 'block';
        document.getElementById('msg').innerHTML = 'Registration successful';
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
