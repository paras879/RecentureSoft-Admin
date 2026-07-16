const istFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
});

const istDateFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    year: "numeric",
});

const istTimeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
});

export function formatDateIST(date) {
    const d = date ? new Date(date) : new Date();
    return istFormatter.format(d);
}

export function formatDateISTShort(date) {
    const d = date ? new Date(date) : new Date();
    return istDateFormatter.format(d);
}

export function formatDateISTTime(date) {
    const d = date ? new Date(date) : new Date();
    return istTimeFormatter.format(d);
}
