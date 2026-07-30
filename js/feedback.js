let audioContext = null;

export function prepareFeedback() {

    const context = getAudioContext();

    if (!context || context.state !== "suspended") {
        return;
    }

    context.resume().catch(() => {});

}

export function notifyExerciseFinished() {

    playTone(880);

    vibrate([120, 80, 120]);

}

export function notifyRestFinished() {

    playTone(660);

    vibrate([200]);

}

function getAudioContext() {

    if (audioContext) {
        return audioContext;
    }

    const AudioContext =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) {
        return null;
    }

    audioContext = new AudioContext();

    return audioContext;

}

function playTone(frequency) {

    const context = getAudioContext();

    if (!context || context.state !== "running") {
        return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const startTime = context.currentTime;

    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.12, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.2);

}

function vibrate(pattern) {

    if (!("vibrate" in navigator)) {
        return;
    }

    navigator.vibrate(pattern);

}
