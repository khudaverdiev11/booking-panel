import { selectStaffPage } from "./selectStaffPage.js";
import { progress } from "../components/progress.js";
import { selectServicePage } from "./selectServicePage.js";
import { selectDateTimePage } from "./selectDateTimePage.js";
import { confirmationPage } from "./confirmationPage.js";

export function mainPage() {
  const mainPageDiv = document.createElement("div");
  mainPageDiv.setAttribute("id", "mainPage");
  var progressContent = document.createElement("div");
  progressContent.classList.add("progressContent");

  var currentPage = { content: null, name: null };

  function initProgress(isNext) {
    let progressResult = progress(currentPage.name, isNext);
    currentPage.content = getPage(progressResult.currentPage);
    currentPage.name = progressResult.currentPage;
    progressContent.innerHTML = "";
    progressContent.appendChild(progressResult.progressBody);
    setPage();
    return progressResult;
  }

  function getPage(pageName) {
    switch (pageName) {
      case "selectStaff":
        return selectStaffPage(initProgress);
        break;

      case "selectService":
        return selectServicePage(initProgress);
        break;

      case "selectDate":
        return selectDateTimePage(initProgress);
        break;

      case "confirm":
        return confirmationPage(initProgress);
        break;

      default:
        return selectStaffPage(initProgress);
        break;
    }
  }

  function setPage() {
    if (pageContent) {
      pageContent.innerHTML = "";
      pageContent.appendChild(currentPage.content);
    }
  }

  var pageContent = document.createElement("div");
  pageContent.classList.add("pageContent");

  //Progress
  var progressComponent = initProgress();

  const pageBody = document.createElement("div");
  pageBody.classList.add("page");

  pageBody.appendChild(pageContent);
  mainPageDiv.appendChild(progressContent);
  mainPageDiv.appendChild(pageBody);

  return mainPageDiv;
}
