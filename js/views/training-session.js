import { WORKOUTS } from "../data/workouts.js";
import { EXERCISES } from "../data/exercises.js";
import { showView } from "../router.js";

import {
    getSession,
    getStatus,
    setStatus,
    nextSet,
    nextExercise
} from "../session.js";

import { completeWorkout } from "../training-storage.js";
import { addHistoryEntry } from "../history-storage.js";

import {
    startTimer,
    stopTimer
} from "../timer.js";


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

    if (currentExercise.duration) {

        switch (getStatus()) {

            case "exercise":

                buttonText = "▶ Timer starten";

                break;

            case "timer":

                buttonText = "⏱ Timer läuft...";
                buttonDisabled = true;

                break;

            case "finished":

                buttonText = "✔ Satz abschließen";

                break;

            default:

                buttonText = "▶ Timer starten";

        }

    } else {

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

                <p>

                    Satz ${session.set}
                    von ${currentExercise.sets}

                </p>

                <p>

                    ${

                        currentExercise.reps

                            ? `${currentExercise.reps} Wiederholungen`

                            : `${currentExercise.duration} Sekunden`

                    }

                </p>

                <button
                    class="primary-button"
                    id="next-set-button"
                    ${buttonDisabled ? "disabled" : ""}>

                    ${buttonText}

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

}



function handleButtonClick() {

    const session = getSession();

    if (!session) {
        return;
    }

    const workout = WORKOUTS[session.workoutId];

    const currentExercise =
        workout.exercises[session.exerciseIndex];



    /*
     * --------------------------------------------------
     * Zeitübung
     * --------------------------------------------------
     */

    if (currentExercise.duration) {

        switch (getStatus()) {

            case "exercise":

                startExerciseTimer(currentExercise.duration);

                return;

            case "timer":

                return;

            case "finished":

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

    setStatus("timer");

    showView("trainingSession");

    startTimer(

        seconds,

        () => {

            // Countdown-Anzeige folgt im nächsten Sprint

        },

        () => {

            setStatus("finished");

            showView("trainingSession");

        }

    );

}



function completeCurrentSet() {

    stopTimer();

    setStatus("exercise");

    const session = getSession();

    const workout = WORKOUTS[session.workoutId];

    const currentExercise =
        workout.exercises[session.exerciseIndex];



    if (session.set < currentExercise.sets) {

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



function finishTraining() {

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



    showView("trainingFinished");

}