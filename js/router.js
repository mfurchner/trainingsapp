import { NAVIGATION } from "./navigation.js";
import { setHeader } from "./ui.js";
import { initTrainingView } from "./views/training.js";
import { initTrainingSessionView } from "./views/training-session.js";
import { initTrainingFinishedView } from "./views/training-finished.js";
import { initTimerView } from "./views/timer.js";
import { initSettingsView } from "./views/settings.js";

export function initRouter() {

    const buttons = document.querySelectorAll(".tab-button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            setActiveButton(button);

            showView(button.dataset.view);

        });

    });

    showView("dashboard");

}

function setActiveButton(activeButton) {

    document.querySelectorAll(".tab-button").forEach(button => {

        button.classList.remove("active");

    });

    activeButton.classList.add("active");

}

export function showView(viewId) {

    const view = NAVIGATION[viewId];

    if (!view) {
        return;
    }

    document.getElementById("content").innerHTML = view.render();

    setHeader(view.title);

    const header = document.getElementById("app-header");
    const tabbar = document.getElementById("tabbar");

    if (
        viewId === "trainingSession" ||
        viewId === "trainingFinished"
    ) {

        header.style.display = "none";
        tabbar.style.display = "none";

    } else {

        header.style.display = "";
        tabbar.style.display = "";

    }

    if (viewId === "trainingSession") {
        initTrainingSessionView();
    }

    if (viewId === "trainingFinished") {
        initTrainingFinishedView();
    }

    if (viewId === "training") {
        initTrainingView();
    }

    if (viewId === "trainingFinished") {
        initTrainingFinishedView();
    }

    if (viewId === "timer") {
        initTimerView();
    }

    if (viewId === "settings") {
        initSettingsView();
    }
}
