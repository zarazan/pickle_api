import React from 'react'
import { PoolProvider } from './PoolContext';
import { UserProvider } from './UserContext';
import { BrowserRouter } from 'react-router-dom';

export default function AppProviders({ children }) {
    return (
        <BrowserRouter>
            <UserProvider>
                <PoolProvider>
                    {children}
                </PoolProvider>
            </UserProvider>
        </BrowserRouter>
    );
};
