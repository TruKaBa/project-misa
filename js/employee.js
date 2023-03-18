// * Su kien cho form
const btnAddFrom = document.querySelector("#form-detail");
btnAddFrom.addEventListener("click", function (e) {
  document.querySelector(".popup").style.display = "block";
});

const btnCloseForm = document.querySelector(".popup-button-close");
btnCloseForm.addEventListener("click", function (e) {
  document.querySelector(".popup").style.display = "none";
});

