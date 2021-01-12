import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, screen, fireEvent } from '../../utilities/testUtilities';

import ForgotPassword from '../Register/ForgotPassword';

describe('<ForgotPassword /> spec', () => {

    it('loads and renders correctly', async () => {
        render(
            <MemoryRouter initialEntries={['/forgot-password']}>
                <ForgotPassword />
            </MemoryRouter>
        )

        expect(screen.getByRole('heading', { name: 'Forgot your password?'})).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Send'})).toBeDisabled()
    })

    it('allows for user reset password submission with email', async () => {
        render(
            <MemoryRouter initialEntries={['/forgot-password']}>
                <ForgotPassword />
            </MemoryRouter>
        )

        const mockData = {
            email: 'larry.david@gmail.com',
        }

        const emailInput = screen.getByTestId('forgot-password-email');

        expect(screen.getByRole('button', { name: 'Send'})).toBeDisabled()

        fireEvent.change(emailInput, { target: { value: mockData.email } })
        expect(emailInput.value).toBe('larry.david@gmail.com')

        expect(screen.getByRole('button', { name: 'Send'})).not.toBeDisabled()
    })

    it.todo('displays success message after password reset send')
    it.todo('contains proper link for routing back to sign in page')
    it.todo('sends POST /passwordreset request')
    it.todo('responds to POST /passwordreset request with email sent')
    it.todo('responds to POST /passwordreset request with invalid email')
})