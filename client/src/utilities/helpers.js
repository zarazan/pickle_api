const decToAmerican = (value) => {
    let odd;
    if (value >= 2.00) {
        return ((value - 1) * 100).toFixed(0);
    } else {
        return ((-100) / (value - 1)).toFixed(0);
    }
};

const zuluToStringFormat = (date) => {
        let d = new Date(date);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).replace(',', '');
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

export {
    decToAmerican,
    zuluToStringFormat,
    currencyFormatter,
};