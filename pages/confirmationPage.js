import { header } from "../components/header.js";
import { confirmBtn } from "../components/confirmBtn.js";
import { backBtn } from "../components/backBtn.js";
import { popup } from "../components/popup.js";


function formValidation() {
  let allFormInputs = document.querySelectorAll('.form-input')
  let result = true;
  allFormInputs.forEach(input => {
    if (input.value == '') {
      result = false;
    }
  });
  return result
}

export function confirmationPage(event) {
  const pageBody = document.createElement("div");
  pageBody.classList.add("confirmBody");

  const headerComponent = header("Confirm details");
  pageBody.appendChild(headerComponent);

  const confirmationBody = document.createElement("div");
  confirmationBody.classList.add("confirmationBody");

  pageBody.appendChild(confirmationBody);



  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");

  const form = document.createElement("form");
  form.id = "myForm";

  function createFormGroup(
    labelText,
    inputType,
    inputName,
    isRequired = false,
    isDisabled = false,
    value
  ) {
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = labelText;
    formGroup.appendChild(label);

    const input = document.createElement("input");
    input.classList.add('form-input')
    input.type = inputType;
    if (value) {
      input.setAttribute('value', value)
    }
    input.name = inputName;
    input.disabled = isDisabled;
    if (isRequired) {
      input.required = true;
    }
    formGroup.appendChild(input);

    return formGroup;
  }

  // Create separate divs for name and contact info

  const nameFormGroup = document.createElement("div");
  nameFormGroup.classList.add("form-group");
  nameFormGroup.classList.add("nameFormGroup");

  const contactFormGroup = document.createElement("div");
  contactFormGroup.classList.add("form-group");
  contactFormGroup.classList.add("contactFormGroup");

  const noteFormGroup = document.createElement("div");
  noteFormGroup.classList.add("noteFormGroup");

  const firstNameInput = createFormGroup("First Name", "text", "firstName");
  const lastNameInput = createFormGroup("Last Name", "text", "lastName");

  nameFormGroup.appendChild(firstNameInput);
  nameFormGroup.appendChild(lastNameInput);

  const emailInput = createFormGroup("E-mail", "email", "email");
  const phoneInput = createFormGroup("Phone", "tel", "phone");

  contactFormGroup.appendChild(emailInput);
  contactFormGroup.appendChild(phoneInput);

  const storedService = localStorage.getItem('service');
  const parsedService = JSON.parse(storedService);

  const storedStaff = localStorage.getItem('staff');
  const parsedStaff = JSON.parse(storedStaff);

  const staffInput = createFormGroup("Staff :", "text", "staff", true, false, parsedStaff?.name);
  const serviceInput = createFormGroup(
    "Service :",
    "text",
    "service",
    true,
    false,
    parsedService?.name
  );
  const storedDate = localStorage.getItem('date');
  const storedTime = localStorage.getItem('time');

  const dateInput = createFormGroup("Date :", "text", "date", true, false, (storedDate + ': ' + storedTime));
  const priceInput = createFormGroup("Price :", "text", "price", true, false, parsedService?.price + '$');

  noteFormGroup.appendChild(staffInput);
  noteFormGroup.appendChild(serviceInput);
  noteFormGroup.appendChild(dateInput);
  noteFormGroup.appendChild(priceInput);

  const formFields = document.createElement("div");
  formFields.classList.add("formFields");
  formFields.appendChild(nameFormGroup);
  formFields.appendChild(contactFormGroup);

  form.appendChild(formFields);

  form.appendChild(noteFormGroup);

  const actions = document.createElement("div");
  actions.classList.add("actions");

  form.appendChild(actions);

  formContainer.appendChild(form);

  confirmationBody.appendChild(formContainer);

  function formSubmit() {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let validationResult = formValidation();
      console.log(validationResult);
      if (!validationResult) {
        const popupComponent = popup("Please fill all fields!");
        pageBody.appendChild(popupComponent);
        return;
      }

      const formData = new FormData(form);

      const data = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        staff: formData.get("staff"),
        service: formData.get("service"),
        date: formData.get("date"),
        price: formData.get("price").replace('$', ''),
      };

      console.log("Form data:", data);

      localStorage.clear();
      if (event) {
        let parameter;
        if ("initProgress" == event.name) {
          parameter = true;
        }
        event(parameter);
      }
    });
  }
  actions.appendChild(backBtn(event));
  actions.appendChild(confirmBtn(formSubmit));

  return pageBody;
}
