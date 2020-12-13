const { calculatePayout } = require('./helpers');

/** calculatePayout */
test('returns expected payout for a negative odd', () => {
    expect(calculatePayout(100, 350)).toEqual(450);
});

test('returns expected payout for a negative odd', () => {
    expect(calculatePayout(100, -250)).toEqual(140);
});