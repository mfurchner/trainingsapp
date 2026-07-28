import { WORKOUTS } from "../data/workouts.js";
import { EXERCISES } from "../data/exercises.js";
import { showView } from "../router.js";
import { getSession, nextSet, nextExercise } from "../session.js";
import { completeWorkout } from "../training-storage.js";
import { addHistoryEntry } from "../history-storage.js";

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

    const currentExercise = workout.exercises[session.exerciseIndex];

    const exercise = EXERCISES[currentExercise.exercise];

    const totalExercises = workout.exercises.length;

    const currentExerciseNumber = session.exerciseIndex + 1;

    // Gesamtzahl aller Sätze im Workout
    const totalSets = workout.exercises.reduce(
        (sum, exercise) => sum + exercise.sets,
        0
    );

    // Bereits abgeschlossene Sätze
    const completedSets =
        workout.exercises
            .slice(0, session.exerciseIndex)
            .reduce((sum, exercise) => sum + exercise.sets, 0)
        + (session.set - 1);

    const progress = Math.round(
        (completedSets / totalSets) * 100
    );

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
                    Übung ${currentExerciseNumber} von ${totalExercises}
                </p>

                <h3>${exercise.name}</h3>

                <p>Satz ${session.set} von ${currentExercise.sets}</p>

                <p>
                    ${
                        currentExercise.reps
                            ? `${currentExercise.reps} Wiederholungen`
                            : `${currentExercise.duration} Sekunden`
                    }
                </p>

                <button class="primary-button" id="next-set-button">
                    ${
                        currentExercise.duration && session.status === "exercise"
                            ? "▶ Timer starten"
                            : session.set < currentExercise.sets
                                ? "Satz abgeschlossen"
                                : session.exerciseIndex < workout.exercises.length - 1
                                    ? "Satz abgeschlossen → Weiter zur nächsten Übung"
                                    : "Training abschließen 🎉"
                    }
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

    button.addEventListener("click", () => {

        const session = getSession();

        const workout = WORKOUTS[session.workoutId];

        const exercise = workout.exercises[session.exerciseIndex];

        if (session.set < exercise.sets) {

            nextSet();

        } else if (session.exerciseIndex < workout.exercises.length - 1) {

            nextExercise();

        } else {

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

            completeWorkout(session.week, session.day);

            showView("trainingFinished");

            return;

        }

        showView("trainingSession");

    });

}