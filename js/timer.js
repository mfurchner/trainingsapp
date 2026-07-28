let interval = null;

let remainingSeconds = 0;

export function startTimer(seconds, onTick, onFinished) {

    stopTimer();

    remainingSeconds = seconds;

    if (onTick) {
        onTick(remainingSeconds);
    }

    interval = setInterval(() => {

        remainingSeconds--;

        if (onTick) {
            onTick(remainingSeconds);
        }

        if (remainingSeconds <= 0) {

            stopTimer();

            if (onFinished) {
                onFinished();
            }

        }

    }, 1000);

}

export function stopTimer() {

    if (interval) {

        clearInterval(interval);

        interval = null;

    }

}

export function getRemainingSeconds() {

    return remainingSeconds;

}

export function isTimerRunning() {

    return interval !== null;

}