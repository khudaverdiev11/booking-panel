export function popup(message) {

  const overlay = document.createElement("div");
  overlay.classList.add("active")
  overlay.classList.add("overlay")

  const popupBox = document.createElement("div");
  popupBox.classList.add("popupBox");

  const popupHeader = document.createElement("div");
  popupHeader.classList.add("popupHeader");

  const popupButton = document.createElement("button");
  popupButton.classList.add("popupButton");
  popupButton.textContent = "X";

  popupButton.addEventListener("click", () => {
    let popupBackground = document.querySelectorAll('.overlay');
    popupBackground.forEach(element => {
      element.remove();
    });
  });

  const popupContent = document.createElement("div");
  popupContent.classList.add("popupContent");
  popupContent.textContent = message;



  popupBox.appendChild(popupHeader);
  popupHeader.appendChild(popupButton);
  popupBox.appendChild(popupContent);
  overlay.appendChild(popupBox)
  return overlay;
}
