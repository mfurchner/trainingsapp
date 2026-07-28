import {
    startTimer,
    stopTimer,
    isTimerRunning
} from "../timer.js";

export function timerView() {

    return `
        <div class="page">

            <div class="card">

                <h2>⏱ Timer</h2>

                <p id="timer-display">
                    01:00
                </p>

                <button
                    id="start-timer"
                    class="primary-button">
                    Timer starten
                </button>

                <button
                    id="stop-timer"
                    class="secondary-button">
                    Stop
                </button>

            </div>

        </div>
    `;

}

export function initTimerView() {

    const display = document.getElementById("timer-display");
    const startButton = document.getElementById("start-timer");
    const stopButton = document.getElementById("stop-timer");

    if (!display) {
        return;
    }

    function updateDisplay(seconds) {

        const minutes = Math.floor(seconds / 60);
        const restSeconds = seconds % 60;

        display.textContent =
            `${String(minutes).padStart(2, "0")}:${String(restSeconds).padStart(2, "0")}`;

    }

    startButton.addEventListener("click", () => {

        if (isTimerRunning()) {
            return;
        }

        startTimer(
            60,
            updateDisplay,
            () => {
                display.textContent = "✅ Fertig!";
            }
        );

    });

    stopButton.addEventListener("click", () => {

        stopTimer();

        updateDisplay(60);

    });

}