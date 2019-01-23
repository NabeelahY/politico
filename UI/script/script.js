document.getElementById("option").addEventListener("change", function() {
	if(this.value === "Lagos"){
		document.getElementById("lagos-state").style.display = "block";
	}else {
		document.getElementById("lagos-state").style.display = "none";
	}
});