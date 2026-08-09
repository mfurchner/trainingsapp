import { VERSION } from "../version.js";
import { resetTrainingPlan } from "../training-storage.js";
import { clearHistory } from "../history-storage.js";
import { clearSession } from "../session.js";
import { showView } from "../router.js";
import { stopTimer } from "../timer.js";
import { releaseWakeLock } from "../wake-lock.js";
import { playSignalTonePreview } from "../feedback.js";
import {
    getSignalToneVolume,
    setSignalToneVolume
} from "../settings-storage.js";

export function settingsView() {

    const signalToneVolume = getSignalToneVolume();

    return `
        <div class="card">

            <div class="title">
                Einstellungen
            </div>

            <p>
                Hier kannst du die App konfigurieren.
            </p>

            <div class="title">
                Signalton
            </div>

            <label for="signal-tone-volume">
                Lautstärke: <span id="signal-tone-volume-value">
                    ${signalToneVolume} %
                </span>
            </label>

            <input
                type="range"
                id="signal-tone-volume"
                min="0"
                max="100"
                value="${signalToneVolume}">

            <div class="title">
                Daten
            </div>

            <button
                class="secondary-button"
                id="reset-training-progress">
                Trainingsfortschritt zurücksetzen
            </button>

            <button
                class="secondary-button"
                id="reset-training-history">
                Trainingshistorie zurücksetzen
            </button>

            <button
                class="danger-button"
                id="clear-all-data">
                Alle Daten löschen
            </button>

            <p class="subtitle">
                Version ${VERSION}
            </p>

        </div>
    `;

}

export function initSettingsView() {

    const signalToneVolume = document.getElementById(
        "signal-tone-volume"
    );

    const signalToneVolumeValue = document.getElementById(
        "signal-tone-volume-value"
    );

    if (signalToneVolume && signalToneVolumeValue) {

        signalToneVolume.addEventListener("input", () => {

            const volume = signalToneVolume.value;

            setSignalToneVolume(volume);

            signalToneVolumeValue.textContent = `${volume} %`;

        });

        signalToneVolume.addEventListener("change", () => {

            playSignalTonePreview();

        });

    }

    const progressButton = document.getElementById(
        "reset-training-progress"
    );

    if (progressButton) {

        progressButton.addEventListener("click", () => {

            const shouldReset = window.confirm(
                "Möchtest du den Trainingsfortschritt wirklich zurücksetzen?"
            );

            if (!shouldReset) {
                return;
            }

            resetTrainingPlan();

            showView("settings");

        });

    }

    const historyButton = document.getElementById(
        "reset-training-history"
    );

    if (historyButton) {

        historyButton.addEventListener("click", () => {

            const shouldReset = window.confirm(
                "Möchtest du die Trainingshistorie wirklich zurücksetzen?"
            );

            if (!shouldReset) {
                return;
            }

            clearHistory();

            showView("settings");

        });

    }

    const clearAllButton = document.getElementById("clear-all-data");

    if (!clearAllButton) {
        return;
    }

    clearAllButton.addEventListener("click", async () => {

        const shouldClear = window.confirm(
            "Alle Anwendungsdaten werden gelöscht:\n\n" +
            "- Trainingsfortschritt\n" +
            "- Trainingshistorie\n" +
            "- Laufende Session\n" +
            "- Einstellungen\n\n" +
            "Möchtest du fortfahren?"
        );

        if (!shouldClear) {
            return;
        }

        stopTimer();

        clearSession();

        localStorage.clear();

        await releaseWakeLock();

        showView("dashboard");

    });

}
