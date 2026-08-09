import {
    DEFAULT_SIGNAL_TONE_VOLUME,
    getSignalToneVolume
} from "./settings-storage.js";

const DEFAULT_TONE_GAIN = 0.12;

let audioContext = null;

export function prepareFeedback() {

    const context = getAudioContext();

    if (
        !context ||
        context.state === "closed" ||
        context.state === "running"
    ) {
        return;
    }

    if (context.state === "suspended") {
        context.resume().catch(() => {});
    }

    unlockAudioContext(context);

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
    const volume = getSignalToneVolume();

    if (!context || context.state !== "running" || volume === 0) {
        return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const startTime = context.currentTime;
    const toneGain =
        DEFAULT_TONE_GAIN * volume / DEFAULT_SIGNAL_TONE_VOLUME;

    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(toneGain, startTime);
    gain.gain.exponentialRampToValueAtTime(
        toneGain * 0.01 / DEFAULT_TONE_GAIN,
        startTime + 0.2
    );

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.2);

}

function unlockAudioContext(context) {

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    gain.gain.value = 0;

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.01);

}

function vibrate(pattern) {

    if (!("vibrate" in navigator)) {
        return;
    }

    navigator.vibrate(pattern);

}
