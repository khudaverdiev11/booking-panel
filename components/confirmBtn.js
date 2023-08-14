export function confirmBtn(event) {
    const confirmBtn = document.createElement("button");
    confirmBtn.setAttribute("Id", "confirmBtn");
    confirmBtn.textContent = "Confirm booking";
  
    confirmBtn.addEventListener("click", () => {
      if (event) {
        event();
      }
    });
  
    return confirmBtn;
  }
  