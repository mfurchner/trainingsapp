let wakeLock = null;

export async function requestWakeLock() {

    if (!("wakeLock" in navigator)) {
        return;
    }

    try {

        wakeLock = await navigator.wakeLock.request("screen");

    } catch (error) {

        console.warn("Wake Lock konnte nicht aktiviert werden.", error);

    }

}

export async function releaseWakeLock() {

    if (!wakeLock) {
        return;
    }

    try {

        await wakeLock.release();

    } catch (error) {

        console.warn("Wake Lock konnte nicht freigegeben werden.", error);

    }

    wakeLock = null;

}