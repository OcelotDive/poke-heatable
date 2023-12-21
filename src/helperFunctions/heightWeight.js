export const convertHeight = (height) => {
    return (height / 10 * 3.281).toFixed(1).toString().replaceAll('.', "'") + "``";
}

export const convertWeight = (weight) => {
    return (weight / 4.53).toFixed(1).toString();

}

