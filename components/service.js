export function service(
  event,
  imagePath,
  serviceId,
  selectedServiceId,
  serviceName,
  serviceDescription,
  price
) {
  const serviceElement = document.createElement("label");
  serviceElement.classList.add("serviceElement");
  serviceElement.setAttribute("id", serviceId);

  const radiobutton = document.createElement("input");
  radiobutton.setAttribute("type", "radio");
  radiobutton.classList.add("radioInput");

  if (serviceId == selectedServiceId) {
    serviceElement.classList.add("selected");
    radiobutton.setAttribute("checked", true);
  }

  radiobutton.setAttribute("value", serviceId);
  radiobutton.setAttribute("name", "service");

  serviceElement.appendChild(radiobutton);

  const photoDiv = document.createElement("div");
  photoDiv.classList.add("photo");

  const image = document.createElement("img");
  image.src = imagePath;
  image.alt = serviceName;
  photoDiv.appendChild(image);
  serviceElement.appendChild(photoDiv);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info");
  infoDiv.classList.add("infoService");
  const nameText = document.createElement("p");
  nameText.classList.add("nameService");
  nameText.textContent = `${serviceName}`;

  const textDiv = document.createElement("div");
  textDiv.classList.add("textDiv");
  infoDiv.appendChild(textDiv);

  const priceDiv = document.createElement("div");
  priceDiv.classList.add("priceDiv");
  priceDiv.textContent = `${price}$`;
  infoDiv.appendChild(priceDiv);

  textDiv.appendChild(nameText);

  const description = document.createElement("p");
  description.classList.add("serviceDescription");
  description.textContent = `${serviceDescription}`;
  textDiv.appendChild(description);
  serviceElement.appendChild(infoDiv);

  //EventListeners
  radiobutton.addEventListener("change", (e) => {
    const serviceElements = document.querySelectorAll(".serviceElement");

    serviceElements.forEach((element) => {
      element.classList.remove("selected");
    });

    if (radiobutton.checked) {
      serviceElement.classList.add("selected");
      console.log(radiobutton.checked);
    }
  });

  serviceElement.addEventListener("click", () => {
    if (event) {
      let parameter;
      if (event.name == "initProgress") {
        parameter = true;
      }
      event(parameter);
    }
  });

  return serviceElement;
}
