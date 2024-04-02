
export function TimeFormat(timeVal){
    const currentTime = new Date().getTime();
    const commentDate = new Date(timeVal).getTime();
    const calcTime = currentTime - commentDate;
    const seconds = Math.floor(calcTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    let time;
    if (days > 0) {
        time = days + ' day' + (days > 1 ? 's' : '') + ' ago';
    } else if (hours > 0) {
        time = hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
    } else if (minutes > 0) {
        time = minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ago';
    } else {
        time = '< 1 min ago';
    }
    return time;
}
