export function header(title) {
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("pageHeader");
  const headerTitle = document.createElement("p");
  headerTitle.textContent = title;
  const divider = document.createElement("hr");
  divider.classList.add("solid");
  headerDiv.appendChild(headerTitle);
  headerDiv.appendChild(divider);
  return headerDiv;
}
