export function nextBtn(event) {
  const nextBtn = document.createElement("button");
  nextBtn.setAttribute("Id", "nextBtn");
  nextBtn.textContent = "Next";

  nextBtn.addEventListener("click", () => {
    if (event) {
      event();
    }
  });

  return nextBtn;
}
