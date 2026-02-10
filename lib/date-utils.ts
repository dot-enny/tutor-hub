/**
 * Utility functions for consistent date/time formatting across SSR and client
 */

/**
 * Format time in a consistent way that avoids hydration mismatches.
 * Uses 24-hour format with locale for better SSR/client consistency.
 */
export function formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');

    return `${displayHours}:${displayMinutes} ${ampm}`;
}

/**
 * Format date in a consistent way that avoids hydration mismatches.
 */
export function formatDate(date: Date, formatStr: string): string {
    // For simple date formatting that doesn't involve time,
    // we can use standard formatting
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (formatStr === 'MMM d, yyyy') {
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }

    // Fallback for other formats (can be extended as needed)
    return date.toLocaleDateString();
}
