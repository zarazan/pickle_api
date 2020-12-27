const type = {
    SEED_POOL: 'SEED_POOL',
    UPDATE_BET_COUNT: 'UPDATE_BET_COUNT',
    SET_BANKROLL: 'SET_BANKROLL',
    PLACE_WAGER: 'PLACE_WAGER',
};

const INITIAL_STATE = {
    poolId: null,
    bank: 0,
    bankroll: 0,
    betCount: 0,
};

function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case type.SEED_POOL:
            return { 
                ...state,
                poolId: action.poolId,
                bank: action.bank,
            };
        case type.UPDATE_BET_COUNT:
            return {
                ...state,
                betCount: action.bets,
            };
        case type.SET_BANKROLL:
            return { 
                ...state,
                poolId: action.poolId,
                bank: action.bank,
            };
        case type.PLACE_WAGER:
            return {
                ...state,
                bank: state.bank - action.wager,
                betCount: state.betCount + 1,
            }
        default:
            return state
    }
};

export { INITIAL_STATE, type, reducer };