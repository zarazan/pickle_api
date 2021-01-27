const decToAmerican = (value) => {
    if (value >= 2.00) {
        return ((value - 1) * 100).toFixed(0);
    } else {
        return ((-100) / (value - 1)).toFixed(0);
    }
}

const zuluToStringFormat = (date) => {
    let d = new Date(date);
    return `${d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).replace(',', '')} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}`
}

const zuluToDateFormat = (date) => {
    let d = new Date(date);
    return `${d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).replace(',', '')}`
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

const calculatePayout = (wager, odds) => {
    let multiplier = Math.abs(odds) / 100;
    return odds < 0 
        ? parseFloat(wager + wager / multiplier) 
        : parseFloat(wager + wager * multiplier)
}

/** 
 * formatBetMetric: Returns a formatted string for a bet metric so we don't have to format in-component. 
 * @param {string} betType - The type of bet.
 * @param {string} metric - The odd metric.
 */
const formatBetMetric = (betType, metric) => {
    let formattedMetric;

    if (!betType) {
        throw 'No Bet Type Provided!';
    } else {
        // check for the odd's metric if it exists (some odds don't have metrics)
        if (metric) { 
            // check metric amount and format it for spread and money line
            if (betType === 'spread' || betType === 'money_line') {
                if (metric > 0) {
                    formattedMetric = `+${metric}`;
                } else {
                    formattedMetric = metric;
                }
            // format for over and under
            } else {
                if (betType === 'over') {
                    formattedMetric = `Over ${metric}`;
                } else {
                    formattedMetric = `Under ${metric}`
                }
            }
        // metric was null, return an empty string
        } else {
            formattedMetric = '';
        }
    }
    return formattedMetric
}

export {
    decToAmerican,
    zuluToStringFormat,
    zuluToDateFormat,
    currencyFormatter,
    calculatePayout,
    formatBetMetric,
}