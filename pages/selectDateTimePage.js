import { header } from "../components/header.js";
import { timeClock } from "../components/timeClock.js";
import flatpickr from "../components/flatpickr.js";
import { backBtn } from "../components/backBtn.js";
import { nextBtn } from "../components/nextBtn.js";
import { validationBox } from "../components/validationBox.js";

const date = ["2023-08-15", "2023-08-20", "2023-08-25"];
const time = [
  {
    start_time: "09:00",
    end_time: "09:30",
  },
  {
    start_time: "09:30",
    end_time: "10:00",
  },
  {
    start_time: "10:30",
    end_time: "11:00",
  },
];


function validateRadioButtons() {
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="time"]'
  );
  let result = false;
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      result = true;
    }
  });
  return result;
}


export function selectDateTimePage(event) {
  const pageBody = document.createElement("div");

  const headerComponent = header("Select Date & Time");
  pageBody.appendChild(headerComponent);

  const dateAndTime = document.createElement("div");
  dateAndTime.classList.add("dateContainer");
  pageBody.appendChild(dateAndTime);

  const dateCalendarBox = document.createElement("div");
  dateCalendarBox.setAttribute("id", "dateCalendarBox");
  dateAndTime.appendChild(dateCalendarBox);
  let selectedDate = localStorage.getItem('date');
  if (selectedDate) {
    dateAndTime.appendChild(timeClock(selectedDate, time));
  }
  const calendar = flatpickr(dateCalendarBox, {
    inline: true,
    enable: date,
    defaultDate: selectedDate,
    onChange: function (selectedDates, dateStr, instance) {
      if (dateStr != selectedDate) {
        selectedDate = dateStr;
        localStorage.removeItem('time');
        dateAndTime.appendChild(timeClock(selectedDate, time));
        localStorage.setItem('date', selectedDate);
      }
    },
  });
  if (!selectedDate) {
    const timePicker = timeClock("Select Date");
    dateAndTime.appendChild(timePicker);
  }

  const actions = document.createElement("div");
  actions.classList.add("actions");

  function validateAndNavigate() {
    let result = validateRadioButtons();
    if (result && selectedDate) {
      if (event) {
        let parameter;
        if ("initProgress" == event.name) {
          parameter = true;
        }
        event(parameter);
      }
    } else {
      actions.appendChild(validationBox("Select date & time !"));
    }
  }

  actions.appendChild(backBtn(event));
  actions.appendChild(nextBtn(validateAndNavigate));

  pageBody.appendChild(actions);

  return pageBody;
}
