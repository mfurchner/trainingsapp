import { APP } from "./config.js";
import { NAVIGATION } from "./navigation.js";

export function initUI() {

    renderHeader(APP.name);

    renderTabbar();

}

export function setHeader(title) {

    document.getElementById("app-header").innerHTML = `

        <h1>${title}</h1>

        <p class="subtitle">

            ${APP.name}

        </p>

    `;

}

function renderHeader(title) {

    setHeader(title);

}

function renderTabbar() {

    const html = Object.values(NAVIGATION)
    .filter(view => view.showInTabbar)
    .map((view, index) => `

        <button
            class="tab-button ${index === 0 ? "active" : ""}"
            data-view="${view.id}">

            <span class="tab-icon">
                ${view.icon}
            </span>

            <span class="tab-label">
                ${view.title}
            </span>

        </button>

    `).join("");

    document.getElementById("tabbar").innerHTML = html;

}