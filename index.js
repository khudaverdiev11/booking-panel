import { mainPage } from "./pages/mainPage.js";

//Clear localStorage on started
localStorage.clear();

//MainSection Init
const mainSection = document.getElementById("mainSection");
mainSection.appendChild(mainPage());
