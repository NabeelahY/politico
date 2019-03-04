function search() {
  const input = document.getElementById('search');
  const row = document.getElementsByTagName('tr');
  const filter = input.value.toLowerCase();

  for (let i = 0; i < row.length; i++) {
    const data = row[i].getElementsByTagName('td')[1];
    if (data) {
      const result = data.textContent || data.innerText;
      if (result.toLowerCase().indexOf(filter) > -1) {
        row[i].style.display = '';
      } else {
        row[i].style.display = 'none';
      }
    }
  }
}
document.querySelector('#search').addEventListener('keyup', search, false);
