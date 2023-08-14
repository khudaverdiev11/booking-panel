export function staff(event, imagePath, selectedStaffId, staffId, staffName, staffEmail) {
  const staffElement = document.createElement("label");
  staffElement.classList.add("staffElement");

  const radiobutton = document.createElement("input");
  radiobutton.setAttribute("type", "radio");
  radiobutton.classList.add("radioInput");
  if (staffId == selectedStaffId) {
    staffElement.classList.add("selected");
    radiobutton.setAttribute("checked", true);
  }
  radiobutton.setAttribute("value", staffId);
  radiobutton.setAttribute("name", "staff");

  staffElement.appendChild(radiobutton);

  const photoDiv = document.createElement("div");
  photoDiv.classList.add("photo");

  const image = document.createElement("img");
  image.src = imagePath;
  image.alt = staffName;
  photoDiv.appendChild(image);
  staffElement.appendChild(photoDiv);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info");
  const nameText = document.createElement("p");
  nameText.classList.add("nameStaff");
  nameText.textContent = `${staffName}`;
  infoDiv.appendChild(nameText);

  const emailText = document.createElement("p");
  emailText.classList.add("emailStaff");
  emailText.textContent = `${staffEmail}`;
  infoDiv.appendChild(emailText);
  staffElement.appendChild(infoDiv);

  //EventListeners
  radiobutton.addEventListener("change", (e) => {
    const staffElements = document.querySelectorAll(".staffElement");

    staffElements.forEach((element) => {
      element.classList.remove("selected");
    });

    if (radiobutton.checked) {
      staffElement.classList.add("selected");
    }
  });

  staffElement.addEventListener("click", () => {
    if (event) {
      event();
    }
  });

  return staffElement;
}
