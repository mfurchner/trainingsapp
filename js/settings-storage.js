import { load, save } from "./storage.js";

const STORAGE_KEY = "settings";

export const DEFAULT_SIGNAL_TONE_VOLUME = 65;

export function getSignalToneVolume() {

    const settings = getSettings();

    return normalizeSignalToneVolume(settings.signalToneVolume);

}

export function setSignalToneVolume(volume) {

    const settings = getSettings();

    save(STORAGE_KEY, {
        ...settings,
        signalToneVolume: normalizeSignalToneVolume(volume)
    });

}

function getSettings() {

    const settings = load(STORAGE_KEY);

    if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
        return {};
    }

    return settings;

}

function normalizeSignalToneVolume(volume) {

    const parsedVolume = Number(volume);

    if (!Number.isFinite(parsedVolume)) {
        return DEFAULT_SIGNAL_TONE_VOLUME;
    }

    return Math.min(100, Math.max(0, Math.round(parsedVolume)));

}
