import { clearSession } from "../session.js";
import { showView } from "../router.js";

export function trainingFinishedView() {

    return `
        <div class="page">

            <div class="card">

                <h2>🎉 Training geschafft!</h2>

                <p>
                    Super gemacht!
                </p>

                <button
                    class="primary-button"
                    id="back-to-training">
                    Zurück zum Trainingsplan
                </button>

            </div>

        </div>
    `;

}

export function initTrainingFinishedView() {

    const button = document.getElementById("back-to-training");

    if (!button) {
        return;
    }

    button.addEventListener("click", () => {

        clearSession();

        showView("training");

    });

}