export function validationBox(title) {
  let allValidationBox = document.querySelectorAll(".validationBox");
  allValidationBox.forEach((element) => {
    element.remove();
  });
  const validationElement = document.createElement("div");
  validationElement.classList.add("validationBox");
  const validationImage = document.createElement("img");
  validationImage.src = "../assets/error.svg";
  validationElement.textContent = title;
  validationElement.appendChild(validationImage);
  return validationElement;
}
