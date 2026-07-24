import { NAVIGATION } from "./navigation.js";
import { setHeader } from "./ui.js";
import { initTrainingView } from "./views/training.js";

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

function showView(viewId) {

    const view = NAVIGATION[viewId];

    if (!view) {
        return;
    }

    document.getElementById("content").innerHTML = view.render();

    setHeader(view.title);

    if (view.id === "training") {
        initTrainingView();
    }
}