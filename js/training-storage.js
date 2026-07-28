import { load, save } from "./storage.js";
import { TRAINING_PLAN } from "./data/training-plan.js";

const STORAGE_KEY = "training-plan";

export function loadTrainingPlan() {

    const storedPlan = load(STORAGE_KEY);

    if (storedPlan) {
        return storedPlan;
    }

    const initialPlan = structuredClone(TRAINING_PLAN);

    save(STORAGE_KEY, initialPlan);

    return initialPlan;

}

export function saveTrainingPlan(plan) {

    save(STORAGE_KEY, plan);

}

export function resetTrainingPlan() {

    save(STORAGE_KEY, structuredClone(TRAINING_PLAN));

}

export function completeWorkout(weekNumber, dayNumber) {

    const plan = loadTrainingPlan();

    const week = plan.find(w => w.week === weekNumber);

    if (!week) {
        return;
    }

    const day = week.days.find(d => d.day === dayNumber);

    console.log("Gefundener Tag:", day);

    if (!day) {
        return;
    }

    day.completed = true;

    saveTrainingPlan(plan);
;
}