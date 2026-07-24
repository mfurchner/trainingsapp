import { initUI } from "./ui.js";
import { initRouter } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {

    registerServiceWorker();

    initUI();
    initRouter();

});

function registerServiceWorker() {

    if ("serviceWorker" in navigator) {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => console.log("✓ Service Worker registriert"))
            .catch(console.error);

    }

}