export function formatTime(date: Date | string): string {
    return new Date(date).toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}