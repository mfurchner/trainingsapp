import { getSession, clearSession } from "../session.js";
import { showView } from "../router.js";
import { isPlanCompleted } from "../training-storage.js";
import { DEFAULT_PLAN_ID } from "../data/plans.js";

export function trainingFinishedView() {

    const session = getSession();
    const planCompleted = isPlanCompleted(
        session?.planId || DEFAULT_PLAN_ID
    );

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

                ${planCompleted ? `
                    <p>
                        Dein Trainingsplan ist abgeschlossen.
                    </p>

                    <button
                        class="primary-button"
                        id="select-next-plan">
                        Nächsten Trainingsplan wählen
                    </button>
                ` : ""}

                ${planCompleted ? "" : `
                    <button
                        class="primary-button"
                        id="back-to-training">
                        Zurück zum Trainingsplan
                    </button>
                `}

            </div>

        </div>
    `;

}

export function initTrainingFinishedView() {

    const selectPlanButton = document.getElementById("select-next-plan");

    if (selectPlanButton) {

        selectPlanButton.addEventListener("click", () => {

            showView("planSelection");

        });

    }

    const button = document.getElementById("back-to-training");

    if (!button) {
        return;
    }

    button.addEventListener("click", () => {

        clearSession();

        showView("training");

    });

}
