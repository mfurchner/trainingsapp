import { getHistory } from "../history-storage.js";

export function statisticsView() {

    const history = getHistory();

    const trainingCount = history.length;

    const totalSeconds = history.reduce(
        (sum, training) => sum + training.duration,
        0
    );

    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const averageSeconds =
        trainingCount > 0
            ? Math.floor(totalSeconds / trainingCount)
            : 0;

    const averageMinutes = Math.floor(averageSeconds / 60);
    const averageRestSeconds = averageSeconds % 60;

    let lastTraining = "Noch kein Training";

    if (trainingCount > 0) {

        const date = new Date(history[0].finishedAt);

        lastTraining = date.toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

    }

    return `
        <div class="page">

            <div class="card">

                <div class="title">
                    📊 Statistik
                </div>

                <p>
                    <strong>Absolvierte Trainings</strong><br>
                    ${trainingCount}
                </p>

                <p>
                    <strong>Gesamte Trainingszeit</strong><br>
                    ${hours} h ${minutes} min
                </p>

                <p>
                    <strong>Durchschnittliche Trainingsdauer</strong><br>
                    ${String(averageMinutes).padStart(2, "0")}:${String(averageRestSeconds).padStart(2, "0")}
                </p>

                <p>
                    <strong>Letztes Training</strong><br>
                    ${lastTraining}
                </p>

            </div>

        </div>
    `;

}