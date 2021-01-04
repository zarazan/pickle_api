import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

const lightTheme = {}; // TODO: Replace this with a true theme provider.

const TestProviders = ({ children }) => {
    return (
        <ThemeProvider theme={lightTheme}>
            {children}
        </ThemeProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: TestProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };