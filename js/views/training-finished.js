import { getSession, clearSession } from "../session.js";
import { showView } from "../router.js";

export function trainingFinishedView() {

    const session = getSession();

    let duration = "--:--";

    if (session?.startedAt) {

        const durationMs = Date.now() - session.startedAt.getTime();

        const totalSeconds = Math.floor(durationMs / 1000);

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        duration =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    }

    return `
        <div class="page">

            <div class="card">

                <h2>🎉 Training geschafft!</h2>

                <p>
                    Super gemacht!
                </p>

                <p class="training-duration">
                    ⏱ Trainingsdauer<br>
                    <strong>${duration}</strong>
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