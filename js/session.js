let session = null;

export function startSession(week, day, workoutId) {

    session = {
        week,
        day,
        workoutId,

        exerciseIndex: 0,
        set: 1,

        status: "exercise",

        startedAt: new Date(),

        finished: false
    };

}

export function getSession() {
    return session;
}

export function setStatus(status) {

    if (!session) {
        return;
    }

    session.status = status;

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

    return true;

}

export function nextExercise() {

    if (!session) {
        return false;
    }

    session.exerciseIndex++;
    session.set = 1;
    session.status = "exercise";

    return true;

}

export function clearSession() {
    session = null;
}