import { clearSession } from "../session.js";
import { showView } from "../router.js";
import {
    getAvailablePlans,
    resetTrainingPlan,
    setActivePlan
} from "../training-storage.js";

export function planSelectionView() {

    const plans = getAvailablePlans();

    return `
        <div class="page">

            <div class="card">

                <h2>Trainingsplan wählen</h2>

                <p>
                    Wähle deinen Plan für den nächsten Durchlauf.
                </p>

            </div>

            ${plans.map(plan => `
                <div class="card">

                    <h3>${plan.name}</h3>

                    <p>${plan.description}</p>

                    <button
                        class="primary-button select-plan-button"
                        data-plan="${plan.id}">
                        Diesen Plan starten
                    </button>

                </div>
            `).join("")}

        </div>
    `;

}

export function initPlanSelectionView() {

    document.querySelectorAll(".select-plan-button").forEach(button => {

        button.addEventListener("click", () => {

            const planId = button.dataset.plan;

            if (!setActivePlan(planId)) {
                return;
            }

            resetTrainingPlan(planId);

            clearSession();

            showView("training");

        });

    });

}
