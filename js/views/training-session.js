import { WORKOUTS } from "../data/workouts.js";
import { EXERCISES } from "../data/exercises.js";
import { showView } from "../router.js";

import {
    getSession,
    getStatus,
    setStatus,
    nextSet,
    nextExercise,
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

    const workout = WORKOUTS[session.workoutId];

    const currentExercise =
        workout.exercises[session.exerciseIndex];

    const exercise =
        EXERCISES[currentExercise.exercise];

    const totalExercises =
        workout.exercises.length;

    const currentExerciseNumber =
        session.exerciseIndex + 1;

    const totalSets =
        workout.exercises.reduce(

            (sum, exercise) => sum + exercise.sets,

            0

        );

    const completedSets =

        workout.exercises
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

    let exerciseInfo =
        currentExercise.reps
            ? `${currentExercise.reps} Wiederholungen`
            : `${currentExercise.duration} Sekunden`;

    if (getStatus() === STATUS.REST) {

        exerciseInfo = `
            <div class="timer-display">
                ${getRemainingSeconds()}
            </div>
        `;

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
            workout.exercises.length - 1
        ) {

            buttonText =
                "Satz abgeschlossen → Weiter zur nächsten Übung";

        } else {

            buttonText =
                "Training abschließen 🎉";

        }

    }



    return `

        <div class="page">

            <div class="card">

                <h2>${workout.name}</h2>

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


                <button
                    class="primary-button"
                    id="next-set-button"
                    ${buttonDisabled ? "disabled" : ""}>

                    ${buttonText}

                </button>

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

    const workout = WORKOUTS[session.workoutId];

    const currentExercise =
        workout.exercises[session.exerciseIndex];


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

    const workout = WORKOUTS[session.workoutId];

    const currentExercise =
        workout.exercises[session.exerciseIndex];



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
        workout.exercises.length - 1
    ) {

        nextExercise();

        showView("trainingSession");

        return;

    }

    finishTraining();

}



async function finishTraining() {

    const session = getSession();

    const duration = Math.floor(

        (Date.now() - session.startedAt.getTime()) / 1000

    );



    addHistoryEntry({

        workoutId: session.workoutId,

        week: session.week,
        day: session.day,

        startedAt: session.startedAt,

        finishedAt: new Date(),

        duration

    });



    completeWorkout(

        session.week,
        session.day

    );

    finishSession();

    releaseWakeLock();

    showView("trainingFinished");

}

function completeRest() {

    stopTimer();

    nextSet();

    setStatus(STATUS.EXERCISE);

    showView("trainingSession");

}
