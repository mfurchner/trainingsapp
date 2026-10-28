import { DEFAULT_PLAN_ID, getPlan } from "../data/plans.js";
import { showView } from "../router.js";

import {
    PHASE,
    getSession,
    getPhase,
    getStatus,
    setStatus,
    nextSet,
    nextExercise,
    startWorkout,
    startStretching,
    clearSession,
    finishSession
} from "../session.js";

import { completeWorkout } from "../training-storage.js";
import { addHistoryEntry } from "../history-storage.js";

import {
    startTimer,
    stopTimer,
    getRemainingSeconds
} from "../timer.js";

import {
    requestWakeLock,
    releaseWakeLock
} from "../wake-lock.js";

import {
    prepareFeedback,
    notifyExerciseFinished,
    notifyRestFinished
} from "../feedback.js";

const STATUS = {

    EXERCISE: "exercise",

    TIMER: "timer",

    REST: "rest",

    FINISHED: "finished"

};

export function trainingSessionView() {

    const session = getSession();

    if (!session) {

        return `
            <div class="page">
                <div class="card">
                    <h2>Kein aktives Training</h2>
                    <p>Starte ein Training über den Trainingsplan.</p>
                </div>
            </div>
        `;

    }

    const plan = getPlan(session.planId || DEFAULT_PLAN_ID);

    const workout = plan.workouts[session.workoutId];

    const phase = getPhase();

    const phaseExercises = getPhaseExercises(phase, plan, workout);

    const currentExercise =
        phaseExercises[session.exerciseIndex];

    const exercise =
        getExerciseData(phase, plan, currentExercise);

    const totalExercises =
        phaseExercises.length;

    const currentExerciseNumber =
        session.exerciseIndex + 1;

    const totalSets =
        phaseExercises.reduce(

            (sum, exercise) => sum + exercise.sets,

            0

        );

    const completedSets =

        phaseExercises
            .slice(0, session.exerciseIndex)
            .reduce(

                (sum, exercise) => sum + exercise.sets,

                0

            )

        + (session.set - 1);

    const progress = Math.round(

        (completedSets / totalSets) * 100

    );


    /*
    * --------------------------------------------------------
    * Buttonzustand bestimmen
    * --------------------------------------------------------
    */

    let buttonText = "";
    let buttonDisabled = false;

    let exerciseInfo = getExerciseInfo(currentExercise);
    let nextExerciseInfo = "";

    if (getStatus() === STATUS.REST) {

        exerciseInfo = `
            <div>
                <p>Pause</p>
                <div class="timer-display">
                    ${getRemainingSeconds()}
                </div>
            </div>
        `;

        if (
            session.set === currentExercise.sets &&
            session.exerciseIndex < phaseExercises.length - 1
        ) {

            const nextWorkoutExercise =
                phaseExercises[session.exerciseIndex + 1];

            const nextExerciseData =
                getExerciseData(phase, plan, nextWorkoutExercise);

            nextExerciseInfo = `
                <div>
                    <p>Nächste Übung</p>
                    <h3>${nextExerciseData.name}</h3>
                    <p>
                        ${nextWorkoutExercise.sets} Sätze ×
                        ${getExerciseInfo(nextWorkoutExercise)}
                    </p>
                </div>
            `;

        }

        buttonText = "▶ Weiter trainieren";
        buttonDisabled = false;

    }
    else if (currentExercise.duration) {

        switch (getStatus()) {

            case STATUS.EXERCISE:

                buttonText = "▶ Timer starten";
                break;

            case STATUS.TIMER:

                exerciseInfo = `
                    <div class="timer-display">
                        ${getRemainingSeconds()}
                    </div>
                `;

                buttonText = "⏱ Timer läuft...";
                buttonDisabled = true;
                break;

            case STATUS.FINISHED:

                exerciseInfo = `
                    <div class="timer-display">
                        0
                    </div>
                `;

                buttonText = "✔ Satz abschließen";
                break;

            default:

                buttonText = "▶ Timer starten";

        }

    }
    else {

        if (session.set < currentExercise.sets) {

            buttonText = "Satz abgeschlossen";

        } else if (
            session.exerciseIndex <
            phaseExercises.length - 1
        ) {

            buttonText = currentExercise.rest
                ? "Satz abgeschlossen → Pause"
                : "Satz abgeschlossen → Weiter zur nächsten Übung";

        } else {

            if (phase === PHASE.WARMUP) {

                buttonText = "Aufwärmen abschließen";

            } else if (phase === PHASE.WORKOUT) {

                buttonText = "Workout abschließen → Dehnen";

            } else {

                buttonText = "Training abschließen 🎉";

            }

        }

    }



    return `

        <div class="page">

            <div class="card">

                <h2 class="${phase === PHASE.WORKOUT ? "" : "training-phase"}">
                    ${phase === PHASE.WORKOUT ? workout.name : getPhaseTitle(phase)}
                </h2>

                <div class="progress-container">

                    <div
                        class="progress-bar"
                        style="width:${progress}%">
                    </div>

                </div>

                <p class="progress-text">

                    Übung ${currentExerciseNumber}
                    von ${totalExercises}

                </p>

                <h3>${exercise.name}</h3>

                <p>${exercise.description}</p>

                <p>

                    Satz ${session.set}
                    von ${currentExercise.sets}

                </p>

                <div class="exercise-info">

                    ${exerciseInfo}

                </div>

                ${nextExerciseInfo}


                <button
                    class="primary-button"
                    id="next-set-button"
                    ${buttonDisabled ? "disabled" : ""}>

                    ${buttonText}

                </button>

                ${phase === PHASE.WORKOUT ? "" : `
                    <button
                        class="secondary-button"
                        id="skip-phase-button">
                        Überspringen
                    </button>
                `}

                <button
                    class="secondary-button"
                    id="cancel-training-button">

                    Training abbrechen

                </button>

            </div>

        </div>

    `;

}

export function initTrainingSessionView() {

    const button = document.getElementById("next-set-button");

    if (!button) {
        return;
    }

    button.addEventListener("click", handleButtonClick);

    const cancelButton = document.getElementById("cancel-training-button");

    if (!cancelButton) {
        return;
    }

    cancelButton.addEventListener("click", handleCancelTraining);

    const skipButton = document.getElementById("skip-phase-button");

    if (skipButton) {

        skipButton.addEventListener("click", handleSkipPhase);

    }

}

function handleSkipPhase() {

    stopTimer();

    if (getPhase() === PHASE.WARMUP) {

        startWorkout();

        showView("trainingSession");

        return;

    }

    if (getPhase() === PHASE.STRETCHING) {

        finishTraining();

    }

}

async function handleCancelTraining() {

    const shouldCancel = window.confirm(
        "Möchtest du das Training wirklich abbrechen?"
    );

    if (!shouldCancel) {
        return;
    }

    stopTimer();

    clearSession();

    await releaseWakeLock();

    showView("training");

}


function handleButtonClick() {

    const session = getSession();
 
    if (!session) {
        return;
    }

    prepareFeedback();

    const plan = getPlan(session.planId || DEFAULT_PLAN_ID);

    const workout = plan.workouts[session.workoutId];

    const phase = getPhase();

    const currentExercise =
        getPhaseExercises(phase, plan, workout)[session.exerciseIndex];


        if (getStatus() === STATUS.REST) {

            completeRest();

            return;

        }    
    /*
     * --------------------------------------------------
     * Zeitübung
     * --------------------------------------------------
     */

    if (currentExercise.duration) {

        switch (getStatus()) {

            case STATUS.EXERCISE:

                startExerciseTimer(currentExercise.duration);

                return;

            case STATUS.TIMER:

                return;

            case STATUS.FINISHED:

                completeCurrentSet();

                return;

        }

    }



    /*
     * --------------------------------------------------
     * Kraftübung
     * --------------------------------------------------
     */

    completeCurrentSet();

}



function startExerciseTimer(seconds) {

    setStatus(STATUS.TIMER);

    showView("trainingSession");

    startTimer(

        seconds,

        () => {

            showView("trainingSession");

        },

        () => {

            notifyExerciseFinished();

            setStatus(STATUS.FINISHED);

            showView("trainingSession");

        }

    );

}



function startRestTimer(seconds) {

    setStatus(STATUS.REST);

    showView("trainingSession");

    startTimer(

        seconds,

        () => {

            showView("trainingSession");

        },

        () => {

            notifyRestFinished();

            completeRest();

        }

    );

}



function completeCurrentSet() {

    stopTimer();

    setStatus(STATUS.EXERCISE);

    const session = getSession();

    const plan = getPlan(session.planId || DEFAULT_PLAN_ID);

    const workout = plan.workouts[session.workoutId];

    const phase = getPhase();

    const currentExercise =
        getPhaseExercises(phase, plan, workout)[session.exerciseIndex];



    if (session.set < currentExercise.sets) {

        if (currentExercise.rest) {

            startRestTimer(currentExercise.rest);

            return;

        }

        nextSet();

        showView("trainingSession");

        return;

    }

    if (
        session.exerciseIndex <
        getPhaseExercises(phase, plan, workout).length - 1
    ) {

        if (currentExercise.rest) {

            startRestTimer(currentExercise.rest);

            return;

        }

        nextExercise();

        showView("trainingSession");

        return;

    }

    if (phase === PHASE.WARMUP) {

        startWorkout();

        showView("trainingSession");

        return;

    }

    if (phase === PHASE.WORKOUT) {

        finishWorkout();

        return;

    }

    finishTraining();

}

function finishWorkout() {

    const session = getSession();

    const duration = Math.floor(

        (
            Date.now() -
            (session.workoutStartedAt || session.startedAt).getTime()
        ) / 1000

    );



    addHistoryEntry({

        planId: session.planId || DEFAULT_PLAN_ID,
        workoutId: session.workoutId,

        week: session.week,
        day: session.day,

        startedAt: session.workoutStartedAt || session.startedAt,

        finishedAt: new Date(),

        duration

    });



    completeWorkout(

        session.planId || DEFAULT_PLAN_ID,
        session.week,
        session.day

    );

    startStretching();

    showView("trainingSession");

}

function finishTraining() {

    finishSession();

    releaseWakeLock();

    showView("trainingFinished");

}

function completeRest() {

    stopTimer();

    const session = getSession();

    const plan = getPlan(session.planId || DEFAULT_PLAN_ID);

    const workout = plan.workouts[session.workoutId];

    const phase = getPhase();

    const currentExercise =
        getPhaseExercises(phase, plan, workout)[session.exerciseIndex];

    if (
        session.set === currentExercise.sets &&
        session.exerciseIndex < getPhaseExercises(phase, plan, workout).length - 1
    ) {

        nextExercise();

    } else {

        nextSet();

    }

    setStatus(STATUS.EXERCISE);

    showView("trainingSession");

}

function getExerciseInfo(exercise) {

    if (exercise.reps) {
        return `${exercise.reps} Wiederholungen`;
    }

    return `${exercise.duration} Sekunden`;

}

function getPhaseExercises(phase, plan, workout) {

    if (phase === PHASE.WARMUP) {
        return plan.warmup;
    }

    if (phase === PHASE.STRETCHING) {
        return plan.stretching;
    }

    return workout.exercises;

}

function getExerciseData(phase, plan, exercise) {

    if (phase === PHASE.WORKOUT) {
        return plan.exercises[exercise.exercise];
    }

    return exercise;

}

function getPhaseTitle(phase) {

    if (phase === PHASE.WARMUP) {
        return "🔥 Aufwärmen";
    }

    return "🧘 Dehnen";

}
