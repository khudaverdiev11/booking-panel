const steps = [
  {
    id: 1,
    order: 1,
    stepTitle: "Select Staff",
    name: "Staff",
    page: "selectStaff",
  },
  {
    id: 2,
    order: 2,
    stepTitle: "Select Service",
    name: "Service",
    page: "selectService",
  },
  {
    id: 3,
    order: 3,
    stepTitle: "Select Date & Time",
    name: "Date & time",
    page: "selectDate",
  },
  {
    id: 4,
    order: 4,
    stepTitle: "Confirm details",
    name: "Confirmation",
    page: "confirm",
  },
];

export function progress(page, isNext) {
  const progressDiv = document.createElement("div");
  progressDiv.classList.add("progress");
  let currentPage = steps[0];

  if (page != null) {
    let selectedPage = steps.find((obj) => {
      return obj.page == page;
    });
    if (isNext) {
      currentPage = steps.find((obj) => {
        return obj.order > selectedPage.order;
      });
    } else {
      currentPage = steps.find((obj) => {
        return selectedPage.order - obj.order == 1;
      });
    }
  }
  if (!currentPage) {
    currentPage = steps[0];
  }
  let allSteps = steps.map((step) => {
    const stepDiv = document.createElement("div");
    stepDiv.setAttribute("id", step.id);
    stepDiv.classList.add("step");
    stepDiv.textContent = step.name;
    const roundDiv = document.createElement("div");
    roundDiv.classList.add("round");

    if (step.id === currentPage.id) {
      roundDiv.classList.add("active");
      stepDiv.classList.add("active");
      roundDiv.textContent = step.order;
    } else if (currentPage.order > step.order) {
      const doneImg = document.createElement("img");
      doneImg.src = "../assets/done.svg";
      stepDiv.classList.add("done");
      roundDiv.appendChild(doneImg);
    } else {
      roundDiv.textContent = step.order;
    }

    stepDiv.appendChild(roundDiv);
    return stepDiv;
  });

  allSteps.forEach((step) => {
    progressDiv.appendChild(step);
  });

  return { progressBody: progressDiv, currentPage: currentPage.page };
}
