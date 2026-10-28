import { getStoredSession } from "../session.js";
import { showView } from "../router.js";
import {
    getActivePlan,
    getAvailablePlans,
    setActivePlan
} from "../training-storage.js";

export function trainingPlansView() {

    const activePlanId = getActivePlan();
    const plans = getAvailablePlans();
    const hasActiveSession = Boolean(getStoredSession());

    return `
        <div class="page">

            <div class="card">

                <h2>Trainingspläne</h2>

                <p>
                    Hier siehst du den aktuell ausgewählten Plan.
                </p>

                ${hasActiveSession ? `
                    <p class="subtitle">
                        Während eines laufenden Trainings kann der Plan nicht geändert werden.
                    </p>
                ` : ""}

            </div>

            ${plans.map(plan => `
                <div class="card">

                    <h3>${plan.name}</h3>

                    <p>${plan.description}</p>

                    ${plan.id === activePlanId ? `
                        <p><strong>Aktueller Trainingsplan</strong></p>
                    ` : `
                        <button
                            class="primary-button select-plan-button"
                            data-plan="${plan.id}"
                            ${hasActiveSession ? "disabled" : ""}>
                            Diesen Plan auswählen
                        </button>
                    `}

                </div>
            `).join("")}

        </div>
    `;

}

export function initTrainingPlansView() {

    document.querySelectorAll(".select-plan-button").forEach(button => {

        button.addEventListener("click", () => {

            if (!setActivePlan(button.dataset.plan)) {
                return;
            }

            showView("trainingPlans");

        });

    });

}
