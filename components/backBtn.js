export function backBtn(event) {
  const backBtn = document.createElement("button");
  backBtn.setAttribute("Id", "backBtn");
  backBtn.textContent = "Back";

  backBtn.addEventListener("click", () => {
    if (event) {
          let parameter;
          if ("initProgress" == event.name) {
            parameter = false;
          }
          event(parameter);
    }
  });

  return backBtn;
}
