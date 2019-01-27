function search() {
	let input = document.getElementById("search");
	let table = document.getElementById("political-party");
	let row = document.getElementsByTagName("tr");
	let filter = input.value.toLowerCase()
	

	for (let i = 0; i < row.length; i++) {
		let data = row[i].getElementsByTagName("td")[1];
		let data1 = row[i].getElementsByTagName("td")[2];
		if(data || data1){
			let result = data.textContent || data.innerText;
			let result1 = data1.textContent || data1.innerText;
			if (result.toLowerCase().indexOf(filter) > -1 || result1.toLowerCase().indexOf(filter) > -1 ){
				row[i].style.display = "";
			}else {
				row[i].style.display = "none";
			}
		}
	}
}
document.querySelector("#search").addEventListener("keyup", search, false);

