// Get the modal
let delete_modal = document.getElementById('delete-modal');
let edit_modal = document.getElementById('edit-modal');
// Get the button that opens the modal
let delete_btn = document.querySelectorAll('button.delete');
let edit_btn = document.querySelectorAll('button.edit');

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
let span1 = document.getElementsByClassName("close")[1];
// When the user clicks the button, open the modal 

[...delete_btn].map(function(el){
	el.onclick = function() {
      delete_modal.style.display = "block";
  }
}); 

[...edit_btn].map(function(el){
	el.onclick = function() {
      edit_modal.style.display = "block";
  }
}); 

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  delete_modal.style.display = "none";
}
span1.onclick = function() {
  edit_modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == delete_modal || event.target == edit_modal) {
   delete_modal.style.display = "none";
   edit_modal.style.display = "none";
  }
}