let session = null;

const STORAGE_KEY = "training-session";

const VALID_STATUSES = [
    "exercise",
    "timer",
    "rest"
];

export const PHASE = {

    WARMUP: "warmup",

    WORKOUT: "workout",

    STRETCHING: "stretching"

};

const VALID_PHASES = Object.values(PHASE);

export function startSession(week, day, workoutId) {

    session = {
        week,
        day,
        workoutId,

        exerciseIndex: 0,
        set: 1,

        status: "exercise",

        phase: PHASE.WARMUP,

        startedAt: new Date(),

        workoutStartedAt: null,

        finished: false
    };

    saveSession();

}

export function getSession() {
    return session;
}

export function getPhase() {

    if (!session) {
        return null;
    }

    return session.phase || PHASE.WORKOUT;

}

export function getStoredSession() {

    const storedSession = readStoredSession();

    if (!isValidSession(storedSession)) {
        removeStoredSession();

        return null;
    }

    return storedSession;

}

export function restoreSession() {

    const storedSession = getStoredSession();

    if (!storedSession) {
        return false;
    }

    session = {
        ...storedSession,
        startedAt: new Date(storedSession.startedAt),
        workoutStartedAt: storedSession.workoutStartedAt
            ? new Date(storedSession.workoutStartedAt)
            : null,
        phase: storedSession.phase || PHASE.WORKOUT,
        status: "exercise"
    };

    saveSession();

    return true;

}

export function setStatus(status) {

    if (!session) {
        return;
    }

    session.status = status;

    saveSession();

}

export function getStatus() {

    if (!session) {
        return null;
    }

    return session.status;

}

export function nextSet() {

    if (!session) {
        return false;
    }

    session.set++;
    session.status = "exercise";

    saveSession();

    return true;

}

export function nextExercise() {

    if (!session) {
        return false;
    }

    session.exerciseIndex++;
    session.set = 1;
    session.status = "exercise";

    saveSession();

    return true;

}

export function startWorkout() {

    setPhase(PHASE.WORKOUT);

    session.workoutStartedAt = new Date();

    saveSession();

}

export function startStretching() {

    setPhase(PHASE.STRETCHING);

}

export function finishSession() {

    if (!session) {
        return;
    }

    session.finished = true;

    removeStoredSession();

}

export function clearSession() {

    session = null;

    removeStoredSession();

}

function saveSession() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(session)
    );

}

function setPhase(phase) {

    if (!session) {
        return;
    }

    session.phase = phase;
    session.exerciseIndex = 0;
    session.set = 1;
    session.status = "exercise";

    saveSession();

}

function readStoredSession() {

    const storedSession = localStorage.getItem(STORAGE_KEY);

    if (!storedSession) {
        return null;
    }

    try {
        return JSON.parse(storedSession);
    } catch {
        return null;
    }

}

function isValidSession(storedSession) {

    return Boolean(
        storedSession &&
        Number.isInteger(storedSession.week) &&
        Number.isInteger(storedSession.day) &&
        typeof storedSession.workoutId === "string" &&
        Number.isInteger(storedSession.exerciseIndex) &&
        storedSession.exerciseIndex >= 0 &&
        Number.isInteger(storedSession.set) &&
        storedSession.set >= 1 &&
        VALID_STATUSES.includes(storedSession.status) &&
        (!storedSession.phase || VALID_PHASES.includes(storedSession.phase)) &&
        storedSession.finished === false &&
        typeof storedSession.startedAt === "string" &&
        !Number.isNaN(Date.parse(storedSession.startedAt)) &&
        (
            storedSession.workoutStartedAt === undefined ||
            storedSession.workoutStartedAt === null ||
            (
                typeof storedSession.workoutStartedAt === "string" &&
                !Number.isNaN(Date.parse(storedSession.workoutStartedAt))
            )
        )
    );

}

function removeStoredSession() {

    localStorage.removeItem(STORAGE_KEY);

}
