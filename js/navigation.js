import { dashboardView } from "./views/dashboard.js";
import { trainingView } from "./views/training.js";
import { timerView } from "./views/timer.js";
import { statisticsView } from "./views/statistics.js";
import { settingsView } from "./views/settings.js";

export const NAVIGATION = {

    dashboard: {
        id: "dashboard",
        title: "Dashboard",
        icon: "🏠",
        render: dashboardView
    },

    training: {
        id: "training",
        title: "Training",
        icon: "🏋️",
        render: trainingView
    },

    timer: {
        id: "timer",
        title: "Timer",
        icon: "⏱️",
        render: timerView
    },

    statistics: {
        id: "statistics",
        title: "Statistik",
        icon: "📊",
        render: statisticsView
    },

    settings: {
        id: "settings",
        title: "Einstellungen",
        icon: "⚙️",
        render: settingsView
    }

};