const signUp = document.querySelector('.signup-form');
const firstName = document.getElementById('fname');
const otherName = document.getElementById('oname');
const email = document.getElementById('email');
const phone = document.getElementById('phone-no');
const profile = document.getElementById('profile-pic');
const pswd = document.getElementById('password');
const btn = document.getElementById('btn');
const message = document.getElementById('info');
const close = document.getElementsByClassName('close')[0];

const displayMsg = (errors) => {
  errors.forEach((error) => {
    message.style.display = 'block';
    document.querySelector('.msg').innerHTML = `${error}`;
  });
};

close.onclick = () => {
  message.style.display = 'none';
};

signUp.addEventListener('submit', (e) => {
  e.preventDefault();
  const fName = firstName.value;
  const oName = otherName.value;
  const mail = email.value;
  const phoneNo = phone.value;
  const profilePic = profile.value;
  const password = pswd.value;

  fetch('https://politico-page.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      'fisrtname': fName,
      'othername': oName,
      'email': mail,
      'phonenumber': phoneNo,
      'passporturl': profilePic,
      'password': password,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.status == 201) {
        localStorage.setItem('token', data[1]);
        window.location.assign('home.html');
      } else if (data.errors) {
        const obj = data.errors;
        const errors = Object.values(obj);
        displayMsg(errors);
      } else {
        message.style.display = 'block';
        document.querySelector('.msg').innerHTML = data.message;
      }
    })
    .catch((err) => {
      if (err) {
        message.style.display = 'block';
        return document.querySelector('.msg').innerHTML = 'Check your connection and try again.';
      }
    });
});
