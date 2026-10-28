import {
    getActivePlanDefinition,
    loadTrainingPlan
} from "../training-storage.js";
import { DEFAULT_PLAN_ID, getPlan } from "../data/plans.js";
import {
    PHASE,
    startSession,
    getStoredSession,
    restoreSession,
    clearSession
} from "../session.js";
import { showView } from "../router.js";
import {
    requestWakeLock
} from "../wake-lock.js";

export function trainingView() {

    const activePlan = getActivePlanDefinition();

    const trainingPlan = loadTrainingPlan(activePlan.id);

    let storedSession = getStoredSession();

    const storedPlan = storedSession
        ? getPlan(storedSession.planId || DEFAULT_PLAN_ID)
        : null;

    let storedWorkout = storedPlan
        ? storedPlan.workouts[storedSession.workoutId]
        : null;

    let storedExercises = storedSession && storedWorkout
        ? getSessionExercises(storedSession, storedPlan, storedWorkout)
        : null;

    let storedExercise = storedWorkout
        ? storedExercises[storedSession.exerciseIndex]
        : null;

    let exercise = storedSession && storedExercise
        ? getSessionExerciseData(storedSession, storedPlan, storedExercise)
        : null;

    if (
        storedSession &&
        (!storedWorkout || !storedExercise || !exercise ||
            storedSession.set > storedExercise.sets)
    ) {
        clearSession();

        storedSession = null;
        storedWorkout = null;
        storedExercises = null;
        storedExercise = null;
        exercise = null;
    }

    let html = `
        <div class="page">
            <h2>${activePlan.name}</h2>
            <p>${activePlan.description}</p>
    `;

    if (storedSession) {

        html += `
            <section class="card">
                <h3>Laufendes Training</h3>

                <p>
                    <strong>${storedWorkout.name}</strong><br>
                    ${getSessionPhaseTitle(storedSession)}<br>
                    ${exercise.name}<br>
                    Satz ${storedSession.set}
                    von ${storedExercise.sets}
                </p>

                <button
                    class="primary-button"
                    id="continue-training-button">
                    Training fortsetzen
                </button>
            </section>
        `;

    }

    trainingPlan.forEach(week => {

        html += `
            <section class="card">
                <h3>${week.title}</h3>
        `;

        week.days.forEach(day => {

            if (!day.workout) {

                html += `
                    <div class="training-day rest-day">
                        <strong>${day.weekday}</strong><br>
                        😴 Ruhetag
                    </div>
                `;

                return;
            }

            const workout = activePlan.workouts[day.workout];

            html += `
                <div class="training-day">

                    <button
                        class="accordion-toggle"
                        data-workout="${week.week}-${day.day}"
                    >
                        <div>

                        <strong>
                            ${day.weekday}
                            ${day.completed ? " ✅" : ""}
                        </strong><br>

                        🏋️ ${workout.name}<br>

                        <small>${workout.description}</small>

                        </div>

                        <span class="accordion-icon">▶</span>

                    </button>

                    <div
                        class="accordion-content"
                        id="workout-${week.week}-${day.day}"
                    >

                        <ul class="exercise-list">
            `;

            workout.exercises.forEach(item => {

                const exercise = activePlan.exercises[item.exercise];

                html += `
                    <li>
                        <strong>${exercise.name}</strong><br>
                        ${item.sets} Sätze ×
                        ${item.reps ? `${item.reps} Wiederholungen` : `${item.duration} Sekunden`}
                    </li>
                `;
            });

            html += `
                </ul>

                <button
                    class="primary-button start-workout"
                    data-week="${week.week}"
                    data-day="${day.day}"
                    data-workout="${day.workout}"
                    data-plan="${activePlan.id}">
                    Training starten
                </button>

                </div>

                </div>
            `;

        });

        html += `
            </section>
        `;

    });

    html += `
        </div>
    `;

    return html;
}

function getSessionExercises(session, plan, workout) {

    const phase = session.phase || PHASE.WORKOUT;

    if (phase === PHASE.WARMUP) {
        return plan.warmup;
    }

    if (phase === PHASE.STRETCHING) {
        return plan.stretching;
    }

    return workout.exercises;

}

function getSessionExerciseData(session, plan, exercise) {

    if ((session.phase || PHASE.WORKOUT) === PHASE.WORKOUT) {
        return plan.exercises[exercise.exercise];
    }

    return exercise;

}

function getSessionPhaseTitle(session) {

    if (session.phase === PHASE.WARMUP) {
        return "🔥 Aufwärmen";
    }

    if (session.phase === PHASE.STRETCHING) {
        return "🧘 Dehnen";
    }

    return "🏋️ Workout";

}

export async function initTrainingView() {

    const continueButton = document.getElementById(
        "continue-training-button"
    );

    if (continueButton) {

        continueButton.addEventListener("click", () => {

            if (!restoreSession()) {
                showView("training");

                return;
            }

            showView("trainingSession");

        });

    }

    const buttons = document.querySelectorAll(".accordion-toggle");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.workout;

            const content = document.getElementById(`workout-${id}`);
            
            const icon = button.querySelector(".accordion-icon");

            const isOpen = content.classList.contains("open");

            document
                .querySelectorAll(".accordion-content")
                .forEach(c => c.classList.remove("open"));

            document
                .querySelectorAll(".accordion-icon")
                .forEach(i => i.classList.remove("open"));

            if (!isOpen) {

                content.classList.add("open");

                icon.classList.add("open");
            }

        });

    });

    document.querySelectorAll(".start-workout").forEach(button => {

    button.addEventListener("click", async() => {

        startSession(
            Number(button.dataset.week),
            Number(button.dataset.day),
            button.dataset.workout,
            button.dataset.plan
        );

        requestWakeLock();

        showView("trainingSession");

    });

});

}
