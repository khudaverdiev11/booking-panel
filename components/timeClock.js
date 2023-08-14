export function timeClock(date, timeArray) {
  let timeboxes = document.querySelectorAll(".timeClockBox");
  timeboxes.forEach((element) => {
    element.remove();
  });

  const timeClockBox = document.createElement("div");
  timeClockBox.classList.add("timeClockBox");

  const timeClockHeader = document.createElement("div");
  timeClockHeader.classList.add("timeClockHeader");
  timeClockHeader.textContent = "Time";
  timeClockBox.appendChild(timeClockHeader);

  const dayOfReserve = document.createElement("div");
  dayOfReserve.classList.add("dayOfReserve");
  dayOfReserve.textContent = date;

  const divider = document.createElement("hr");
  divider.classList.add("solid");
  dayOfReserve.appendChild(divider);

  timeClockBox.appendChild(dayOfReserve);
  const timeBoxes = document.createElement("div");
  timeBoxes.classList.add("timeBoxes");
  timeClockBox.appendChild(timeBoxes);

  if (timeArray) {
    timeArray.forEach((time) => {
      const timeBoxItem = document.createElement("label");
      timeBoxItem.classList.add("timeBoxItem");
      timeBoxItem.textContent = `${time.start_time} ${time.end_time}`;

      const radiobutton = document.createElement("input");
      radiobutton.setAttribute("type", "radio");
      radiobutton.classList.add("radioInput");
      radiobutton.setAttribute("value", `${time.start_time}-${time.end_time}`);
      radiobutton.setAttribute("name", "time");

      if (date) {
        let selectedTime = localStorage.getItem('time');
        if (selectedTime == radiobutton.value) {
          timeBoxItem.classList.add("timeSelected");
          radiobutton.setAttribute("checked", true);
        }
      }

      radiobutton.addEventListener("change", (e) => {
        const timeitems = document.querySelectorAll(".timeBoxItem");

        timeitems.forEach((element) => {
          element.classList.remove("timeSelected");
        });
        if (radiobutton.checked) {
          localStorage.setItem('time', radiobutton.value);
          timeBoxItem.classList.add("timeSelected");
        }
      });

      timeBoxItem.appendChild(radiobutton);
      timeBoxes.appendChild(timeBoxItem);
    });
  }

  return timeClockBox;
}
