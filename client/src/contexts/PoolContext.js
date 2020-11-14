import React, { createContext, useContext, useReducer } from 'react';
import { reducer, INITIAL_STATE } from '../reducers/poolReducer';

const PoolStateContext = createContext(null);
const PoolDispatchContext = createContext(null);

function PoolProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    return (
        <PoolStateContext.Provider value={state}>
            <PoolDispatchContext.Provider value={dispatch}>
                {children}
            </PoolDispatchContext.Provider>
        </PoolStateContext.Provider>
    );
};

function usePoolState() {
    const context = useContext(PoolStateContext);
    if (context === undefined) {
        throw new Error('usePoolState must be used within a PoolProvider');
    }
    return context;
};

function usePoolDispatch() {
    const context = useContext(PoolDispatchContext);
    if (context === undefined) {
        throw new Error('usePoolDispatch must be used within a PoolProvider');
    }
    return context;
};

export { PoolProvider, usePoolState, usePoolDispatch };