export const WORKOUTS = {

    A: {
        id: "A",
        name: "Ganzkörper A",
        description: "Schwerpunkt Beine, Brust und Rücken mit Kurzhanteln",

        exercises: [
            {
                exercise: "squat",
                sets: 3,
                reps: 20,
                rest: 60
            },
            {
                exercise: "pushup",
                sets: 3,
                reps: 12,
                rest: 60
            },
            {
                exercise: "row",
                sets: 3,
                reps: 20,
                rest: 60
            },
            {
                exercise: "plank",
                sets: 3,
                duration: 40,
                rest: 45
            }
        ]
    },

    B: {
        id: "B",
        name: "Ganzkörper B",
        description: "Schwerpunkt Beine, Schultern und Core mit Kurzhanteln",

        exercises: [
            {
                exercise: "lunge",
                sets: 4,
                reps: 12,
                rest: 60
            },
            {
                exercise: "shoulderPress",
                sets: 3,
                reps: 18,
                rest: 60
            },
            {
                exercise: "lateralRaise",
                sets: 3,
                reps: 15,
                rest: 60
            },
            {
                exercise: "sidePlank",
                sets: 4,
                duration: 30,
                rest: 45
            }
        ]
    },

    C: {
        id: "C",
        name: "Ganzkörper C",
        description: "Schwerpunkt Gesäß, Oberkörper und Stabilität",

        exercises: [
            {
                exercise: "gluteBridge",
                sets: 3,
                reps: 25,
                rest: 60
            },
            {
                exercise: "inclinePushup",
                sets: 3,
                reps: 15,
                rest: 60
            },
            {
                exercise: "row",
                sets: 3,
                reps: 20,
                rest: 60
            },
            {
                exercise: "deadBug",
                sets: 4,
                reps: 12,
                rest: 45
            }
        ]
    }

};
