document.getElementById("offices").addEventListener("change", function() {
	if(this.value === "president"){
		document.getElementById("president").style.display = "block";
	}else if (this.value === "governor") {
		document.getElementById("governor").style.display = "block";
	}else {
		document.getElementById("president").style.display = "none";
		document.getElementById("governor").style.display = "none";
	}
});