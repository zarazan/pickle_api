const decToAmerican = (value) => {
    if (value >= 2.00) {
        return ((value - 1) * 100).toFixed(0);
    } else {
        return ((-100) / (value - 1)).toFixed(0);
    }
};

const zuluToStringFormat = (date) => {
    let d = new Date(date);
    return `${d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).replace(',', '')} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}`
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const calculatePayout = (wager, odds) => {
    let multiplier = Math.abs(odds) / 100;
    return odds < 0 
        ? parseFloat(wager + wager / multiplier) 
        : parseFloat(wager + wager * multiplier);
};

export {
    decToAmerican,
    zuluToStringFormat,
    currencyFormatter,
    calculatePayout,
};