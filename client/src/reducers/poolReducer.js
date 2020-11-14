const type = {
    SET_POOL_ID: 'SET_POOL_ID',
    SET_BANKROLL: 'SET_BANKROLL',
    PLACE_WAGER: 'PLACE_WAGER',
};

const INITIAL_STATE = {
    poolId: null,
    bankroll: null,
};

function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case type.SET_POOL_ID:
            return { ...state, poolId: action.data };
        case type.SET_BANKROLL:
            return { ...state, bankroll: action.data };
        case type.PLACE_WAGER:
            let newRoll = parseFloat(state.bankroll);
            newRoll -= parseFloat(action.data);
            return { ...state, bankroll: newRoll };
        default:
            return state
    }
};

export { INITIAL_STATE, type, reducer };