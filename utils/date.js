//https://chat.openai.com/share/3fe3fb19-d6ff-4646-8995-b3f91fefb723 : how to extract first 10 char from ISOstring date
export function getFormattedDate(date) {
    
    return date.toISOString().slice(0, 10);
}

export function getRecentDays(date, days) {

    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);

}