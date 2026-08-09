let wakeLock = null;

let shouldKeepWakeLock = false;

export async function requestWakeLock() {

    shouldKeepWakeLock = true;

    if (!("wakeLock" in navigator) || wakeLock) {
        return;
    }

    try {

        const sentinel = await navigator.wakeLock.request("screen");

        if (!shouldKeepWakeLock) {

            await sentinel.release();

            return;

        }

        wakeLock = sentinel;

        wakeLock.addEventListener("release", () => {

            if (wakeLock === sentinel) {
                wakeLock = null;
            }

        });

    } catch (error) {

        console.warn("Wake Lock konnte nicht aktiviert werden.", error);

    }

}

export async function releaseWakeLock() {

    shouldKeepWakeLock = false;

    if (!wakeLock) {
        return;
    }

    const activeWakeLock = wakeLock;

    wakeLock = null;

    try {

        await activeWakeLock.release();

    } catch (error) {

        console.warn("Wake Lock konnte nicht freigegeben werden.", error);

    }

}

if (typeof document !== "undefined") {

    document.addEventListener("visibilitychange", () => {

        if (
            document.visibilityState !== "visible" ||
            !shouldKeepWakeLock
        ) {
            return;
        }

        requestWakeLock();

    });

}
