export function formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}
export function formatRelative(date: Date | string): string {
    const now = new Date();
    const d = new Date(date);
    const diffMs = now.getTime() - d.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    if (diffHours < 1) return "less than 1h ago";
    if (diffHours < 24) return `${diffHours}h ago`;

    if (diffDays === 1) return "yesterday";
    return `${diffDays} days ago`;
}