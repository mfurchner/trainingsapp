let session = null;

export function startSession(week, day, workoutId) {

    session = {
        week,
        day,
        workoutId,

        exerciseIndex: 0,
        set: 1,

        startedAt: new Date(),

        finished: false
    };

}

export function getSession() {
    return session;
}

export function nextSet() {

    if (!session) {
        return false;
    }

    session.set++;

    return true;

}

export function nextExercise() {

    if (!session) {
        return false;
    }

    session.exerciseIndex++;
    session.set = 1;

    return true;

}

export function clearSession() {
    session = null;
}