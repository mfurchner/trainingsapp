export function initUI() {

    renderHeader();
    renderDashboard();
    renderTabbar();

}

export function renderDashboard() {

    const content = document.getElementById("content");

    content.innerHTML = `

        <div class="card">

            <div class="title">
                Willkommen 👋
            </div>

            <p>
                TrainingsApp Version 1.0
            </p>

            <br>

            <p>
                Das Dashboard wird in den nächsten Sprints erweitert.
            </p>

        </div>

    `;

}

function renderHeader() {

    document.getElementById("app-header").innerHTML = `

        <h1>TrainingsApp</h1>

        <p class="subtitle">

            Dein persönlicher Trainingsbegleiter

        </p>

    `;

}

function renderTabbar() {

    document.getElementById("tabbar").innerHTML = `

        <button class="tab-button active" data-view="dashboard">
            Dashboard
        </button>

        <button class="tab-button" data-view="training">
            Training
        </button>

        <button class="tab-button" data-view="timer">
            Timer
        </button>

        <button class="tab-button" data-view="statistics">
            Statistik
        </button>

        <button class="tab-button" data-view="settings">
            Einstellungen
        </button>

    `;

}