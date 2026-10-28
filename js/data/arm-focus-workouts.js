export const ARM_FOCUS_WORKOUTS = {

    A: {
        id: "A",
        name: "Arme A",
        description: "Bizeps, Trizeps und Rücken mit hohem Wiederholungsumfang.",
        exercises: [
            { exercise: "dumbbellCurl", sets: 4, reps: 20, rest: 45 },
            { exercise: "overheadTricepsExtension", sets: 4, reps: 18, rest: 45 },
            { exercise: "dumbbellRow", sets: 3, reps: 20, rest: 60 },
            { exercise: "plank", sets: 3, duration: 35, rest: 45 }
        ]
    },

    B: {
        id: "B",
        name: "Arme B",
        description: "Unterarme, Trizeps und drückende Oberkörpermuskulatur.",
        exercises: [
            { exercise: "hammerCurl", sets: 4, reps: 20, rest: 45 },
            { exercise: "closeGripKneePushup", sets: 3, reps: 14, rest: 60 },
            { exercise: "dumbbellFloorPress", sets: 3, reps: 20, rest: 60 },
            { exercise: "bodyweightSquat", sets: 3, reps: 20, rest: 45 }
        ]
    },

    C: {
        id: "C",
        name: "Arme C",
        description: "Trizeps, Unterarme und Schulterstabilität.",
        exercises: [
            { exercise: "reverseCurl", sets: 4, reps: 18, rest: 45 },
            { exercise: "tricepsKickback", sets: 4, reps: 18, rest: 45 },
            { exercise: "lateralRaise", sets: 3, reps: 15, rest: 60 },
            { exercise: "dumbbellRow", sets: 3, reps: 20, rest: 60 }
        ]
    }

};
