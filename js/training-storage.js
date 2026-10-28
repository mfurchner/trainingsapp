import { load, save } from "./storage.js";
import {
    DEFAULT_PLAN_ID,
    PLANS,
    getPlan
} from "./data/plans.js";

const ACTIVE_PLAN_STORAGE_KEY = "active-training-plan";
const LEGACY_STORAGE_KEY = "training-plan";
const STORAGE_KEY_PREFIX = "training-plan-";

export function getActivePlan() {

    const planId = load(ACTIVE_PLAN_STORAGE_KEY);

    if (getPlan(planId)) {
        return planId;
    }

    save(ACTIVE_PLAN_STORAGE_KEY, DEFAULT_PLAN_ID);

    return DEFAULT_PLAN_ID;

}

export function setActivePlan(planId) {

    if (!getPlan(planId)) {
        return false;
    }

    save(ACTIVE_PLAN_STORAGE_KEY, planId);

    return true;

}

export function getActivePlanDefinition() {

    return getPlan(getActivePlan());

}

export function getAvailablePlans() {

    return PLANS;

}

export function loadTrainingPlan(planId = getActivePlan()) {

    const plan = getPlan(planId);

    if (!plan) {
        return null;
    }

    const storageKey = getStorageKey(planId);

    const storedPlan = load(storageKey);

    if (storedPlan) {
        return storedPlan;
    }

    const legacyPlan = planId === DEFAULT_PLAN_ID
        ? load(LEGACY_STORAGE_KEY)
        : null;

    const initialPlan = legacyPlan || structuredClone(plan.trainingPlan);

    save(storageKey, initialPlan);

    return initialPlan;

}

export function saveTrainingPlan(plan, planId = getActivePlan()) {

    save(getStorageKey(planId), plan);

}

export function resetTrainingPlan(planId = getActivePlan()) {

    const plan = getPlan(planId);

    if (!plan) {
        return;
    }

    saveTrainingPlan(structuredClone(plan.trainingPlan), planId);

}

export function completeWorkout(planId, weekNumber, dayNumber) {

    const plan = loadTrainingPlan(planId);

    if (!plan) {
        return;
    }

    const week = plan.find(w => w.week === weekNumber);

    if (!week) {
        return;
    }

    const day = week.days.find(d => d.day === dayNumber);

    if (!day) {
        return;
    }

    day.completed = true;

    saveTrainingPlan(plan, planId);

}

export function isPlanCompleted(planId) {

    const plan = loadTrainingPlan(planId);

    if (!plan) {
        return false;
    }

    return plan.every(week =>
        week.days
            .filter(day => day.workout)
            .every(day => day.completed)
    );

}

function getStorageKey(planId) {

    return `${STORAGE_KEY_PREFIX}${planId}`;

}
