let timeout = null;

let remainingSeconds = 0;

let endTime = null;

export function startTimer(seconds, onTick, onFinished) {

    stopTimer();

    endTime = Date.now() + (seconds * 1000);

    updateTimer(onTick, onFinished);

}

function updateTimer(onTick, onFinished) {

    remainingSeconds = Math.max(

        0,

        Math.ceil((endTime - Date.now()) / 1000)

    );

    if (onTick) {
        onTick(remainingSeconds);
    }

    if (remainingSeconds === 0) {

        stopTimer();

        if (onFinished) {
            onFinished();
        }

        return;

    }

    timeout = setTimeout(() => {

        updateTimer(onTick, onFinished);

    }, 1000);

}

export function stopTimer() {

    if (timeout) {

        clearTimeout(timeout);

        timeout = null;

    }

    endTime = null;

}

export function getRemainingSeconds() {

    return remainingSeconds;

}

export function isTimerRunning() {

    return timeout !== null;

}
