

export const timeCalc = (data) => {
    const date = new Date(data)
    const utcString = date.toISOString();
    const month = new Date(utcString).getUTCMonth() + 1;
    const dateValue = new Date(utcString).getUTCDate();
    const year = new Date(utcString).getUTCFullYear();
    return (`${year}/${month}/${dateValue}`);
}