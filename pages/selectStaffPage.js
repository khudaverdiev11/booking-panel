import { staff } from "../components/staff.js";
import { nextBtn } from "../components/nextBtn.js";
import { validationBox } from "../components/validationBox.js";
import { header } from "../components/header.js";

const allStaff = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@egmail.com",
    image: "./assets/staff/staff-1.svg",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@egmail.com",
    image: "/assets/staff/staff-2.svg",
  },
];



function validateRadioButtons() {
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="staff"]'
  );
  let result = null;
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      result = radioButton.value;
    }
  });
  return result;
}

export function selectStaffPage(event) {
  const pageBody = document.createElement("div");
  pageBody.classList.add("staffBody");

  const headerComponent = header("Select Staff");
  pageBody.appendChild(headerComponent);

  const staffElement = document.createElement("div");
  staffElement.classList.add("elements");

  const actions = document.createElement("div");
  actions.classList.add("actions");

  function saveData(data) {
    if (event) {
      let parameter;
      if ("initProgress" == event.name) {
        parameter = true;
      }
      localStorage.setItem('staff', JSON.stringify(data));
      event(parameter);
    }
  }


  function validateAndNavigate() {
    let result = validateRadioButtons();
    if (result != null) {
      let selectedStaff = allStaff.find(obj => obj.id == result)
      saveData(selectedStaff)
    } else {
      actions.appendChild(validationBox("Select staff!"));
    }
  }

  actions.appendChild(nextBtn(validateAndNavigate));

  const storedStaff = localStorage.getItem('staff');
  const parsedStaff = JSON.parse(storedStaff);

  allStaff.forEach((member) => {
    const staffMember = staff(
      validateAndNavigate,
      member.image,
      parsedStaff?.id,
      member.id,
      member.name,
      member.email
    );

    staffElement.appendChild(staffMember);
  });



  pageBody.appendChild(staffElement);
  pageBody.appendChild(actions);
  return pageBody;
}
