import { backBtn } from "../components/backBtn.js";
import { nextBtn } from "../components/nextBtn.js";
import { service } from "../components/service.js";
import { validationBox } from "../components/validationBox.js";
import { header } from "../components/header.js";

const services = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "./assets/service/service-1.svg",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "./assets/service/service-2.svg",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
];

function validateRadioButtons() {
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="service"]'
  );
  let result = null;
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      result = radioButton.value;
    }
  });
  return result;
}

export function selectServicePage(event) {
  const pageBody = document.createElement("div");
  pageBody.classList.add("serviceBody");

  const headerComponent = header("Select Service");
  pageBody.appendChild(headerComponent);

  const serviceElement = document.createElement("div");
  serviceElement.classList.add("elements");

  const storedService = localStorage.getItem('service');
  const parsedService = JSON.parse(storedService);

  services.forEach((member) => {
    const serviceMember = service(
      validateAndNavigate,
      member.image,
      member.id,
      parsedService?.id,
      member.name,
      member.duration,
      member.price
    );

    serviceElement.appendChild(serviceMember);
  });

  const actions = document.createElement("div");
  actions.classList.add("actions");

  actions.appendChild(backBtn(event));

  function saveData(data) {
    if (event) {
      let parameter;
      if ("initProgress" == event.name) {
        parameter = true;
      }
      localStorage.setItem('service', JSON.stringify(data));
      event(parameter);
    }
  }

  function validateAndNavigate() {
    let result = validateRadioButtons();
    if (result != null) {
      let selectedService = services.find(obj => obj.id == result)
      saveData(selectedService)
    } else {
      actions.appendChild(validationBox("Select service !"));
    }
  }

  actions.appendChild(nextBtn(validateAndNavigate));
  pageBody.appendChild(serviceElement);
  pageBody.appendChild(actions);
  return pageBody;
}
