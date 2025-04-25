export const formatMinutesTime = (time) => {
    const hours = Math.floor(time / 60);
    if (hours === 0) {
        return `${time} min`;
    }else {
        const minutes = time % 60;
        return `${hours} h ${minutes} min`;
    }
};