import { dashboardView } from "./views/dashboard.js";
import { trainingView } from "./views/training.js";
import { timerView } from "./views/timer.js";
import { statisticsView } from "./views/statistics.js";
import { settingsView } from "./views/settings.js";
import { trainingSessionView } from "./views/training-session.js";
import { trainingFinishedView } from "./views/training-finished.js";

export const NAVIGATION = {

    dashboard: {
        id: "dashboard",
        title: "Dashboard",
        icon: "🏠",
        showInTabbar: true,
        render: dashboardView
    },

    training: {
        id: "training",
        title: "Training",
        icon: "🏋️",
        showInTabbar: true,
        render: trainingView
    },

    trainingSession: {
        id: "trainingSession",
        title: "Training",
        icon: "🏋️",
        showInTabbar: false,
        render: trainingSessionView
    },

    trainingFinished: {
        id: "trainingFinished",
        title: "Training abgeschlossen",
        icon: "🎉",
        showInTabbar: false,
        render: trainingFinishedView
    },

    timer: {
        id: "timer",
        title: "Timer",
        icon: "⏱️",
        showInTabbar: true,
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
        showInTabbar: true,
        render: settingsView
    }

};