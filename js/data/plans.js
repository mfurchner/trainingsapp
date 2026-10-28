import { TRAINING_PLAN } from "./training-plan.js";
import { WORKOUTS } from "./workouts.js";
import { EXERCISES } from "./exercises.js";
import { WARMUP } from "./warmup.js";
import { STRETCHING } from "./stretching.js";
import {
    ARM_FOCUS_TRAINING_PLAN
} from "./arm-focus-training-plan.js";
import { ARM_FOCUS_WORKOUTS } from "./arm-focus-workouts.js";
import { ARM_FOCUS_EXERCISES } from "./arm-focus-exercises.js";
import { ARM_FOCUS_WARMUP } from "./arm-focus-warmup.js";
import { ARM_FOCUS_STRETCHING } from "./arm-focus-stretching.js";

export const DEFAULT_PLAN_ID = "four-week-full-body";

export const PLANS = [
    {
        id: DEFAULT_PLAN_ID,
        name: "4-Wochen-Ganzkörperplan",
        description: "Drei Ganzkörpertrainings pro Woche.",
        trainingPlan: TRAINING_PLAN,
        workouts: WORKOUTS,
        exercises: EXERCISES,
        warmup: WARMUP,
        stretching: STRETCHING
    },
    {
        id: "four-week-arm-focus",
        name: "4-Wochen-Armfokus",
        description: "Drei armorientierte Ganzkörpertrainings pro Woche.",
        trainingPlan: ARM_FOCUS_TRAINING_PLAN,
        workouts: ARM_FOCUS_WORKOUTS,
        exercises: ARM_FOCUS_EXERCISES,
        warmup: ARM_FOCUS_WARMUP,
        stretching: ARM_FOCUS_STRETCHING
    }
];

export function getPlan(planId) {

    return PLANS.find(plan => plan.id === planId) || null;

}
