import { VERSION } from "../version.js";

export function settingsView() {

    return `
        <div class="card">

            <div class="title">
                Einstellungen
            </div>

            <p>
                Hier kannst du die App konfigurieren.
            </p>

            <p class="subtitle">
                Version ${VERSION}
            </p>

        </div>
    `;

}
