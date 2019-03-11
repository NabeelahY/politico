const logout = document.getElementById('logout');

function userLogout() {
  if (localStorage.length > 0) {
    localStorage.clear();
  }
  window.location.assign('./index.html');
}

logout.addEventListener('click', userLogout);
