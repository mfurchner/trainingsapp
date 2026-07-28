const STORAGE_KEY = "trainingHistory";

export function getHistory() {

    const history = localStorage.getItem(STORAGE_KEY);

    if (!history) {
        return [];
    }

    return JSON.parse(history);

}

export function addHistoryEntry(entry) {

    const history = getHistory();

    history.unshift(entry);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history)
    );

}

export function clearHistory() {

    localStorage.removeItem(STORAGE_KEY);

}