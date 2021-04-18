import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function formCorrection(idStr) {
  
  const email = document.getElementById(idStr);
  console.log("EMAIL:", email);

  email.addEventListener("keyup", eventHandler);

  function eventHandler(e) {
    const regex = /\s/g;

    email.value = email.value.replace(regex, "").toLowerCase();
  }
}
function checkFormErrors(emailStr, passwordStr) {
  const email = document.getElementById(emailStr);
  const emailText = email.value;
  const password = document.getElementById(passwordStr);
  const passwordText = password.value;

  if (!emailText) {
    console.log("Style should be red");
    email.style.borderColor = "red";
  }
  if (!passwordText) {
    password.style.borderColor = "red";
  }
}

export {formCorrection, checkFormErrors};
