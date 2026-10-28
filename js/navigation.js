import { dashboardView } from "./views/dashboard.js";
import { trainingView } from "./views/training.js";
import { statisticsView } from "./views/statistics.js";
import { settingsView } from "./views/settings.js";
import { trainingSessionView } from "./views/training-session.js";
import { trainingFinishedView } from "./views/training-finished.js";
import { planSelectionView } from "./views/plan-selection.js";
import { trainingPlansView } from "./views/training-plans.js";

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

    trainingPlans: {
        id: "trainingPlans",
        title: "Trainingsplan",
        icon: "🗂️",
        showInTabbar: true,
        render: trainingPlansView
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

    planSelection: {
        id: "planSelection",
        title: "Trainingsplan wählen",
        icon: "🏋️",
        showInTabbar: false,
        render: planSelectionView
    },

    statistics: {
        id: "statistics",
        title: "Statistik",
        icon: "📊",
        showInTabbar: true,
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
