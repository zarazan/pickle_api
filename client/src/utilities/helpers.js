function decToAmerican(value) {
    let odd;
    if (value >= 2.00) {
        return ((value - 1) * 100).toFixed(0);
    } else {
        return ((-100) / (value - 1)).toFixed(0);
    }
}

export default decToAmerican;