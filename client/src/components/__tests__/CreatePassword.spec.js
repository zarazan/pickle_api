import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, screen, fireEvent } from '../../utilities/testUtilities';

import CreatePassword from '../Register/CreatePassword';

describe('<ForgotPassword /> spec', () => {

    it('loads and renders correctly', async () => {
        render(
            <MemoryRouter initialEntries={['/create-password']}>
                <CreatePassword />
            </MemoryRouter>
        )

        expect(screen.getByRole('heading', { name: 'Create new password'})).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Reset Password'})).toBeDisabled()
    })

    it('allows for user reset password submission with email', async () => {
        render(
            <MemoryRouter initialEntries={['/create-password']}>
                <CreatePassword />
            </MemoryRouter>
        )

        const mockData = {
            passwordOne: 'abc123',
            passwordTwo: 'abc123',
        }

        const passwordOneInput = screen.getByTestId('create-password-one');
        const passwordTwoInput = screen.getByTestId('create-password-two');

        expect(screen.getByRole('button', { name: 'Reset Password'})).toBeDisabled()

        fireEvent.change(passwordOneInput, { target: { value: mockData.passwordOne } })
        expect(passwordOneInput.value).toBe('abc123')

        fireEvent.change(passwordTwoInput, { target: { value: mockData.passwordTwo } })
        expect(passwordTwoInput.value).toBe('abc123')

        expect(screen.getByRole('button', { name: 'Reset Password'})).not.toBeDisabled()
    })

    it.todo('displays success message after password reset')
    it.todo('contains proper link for routing back to sign in page')
    it.todo('sends POST /passwordreset request')
    it.todo('responds to POST /passwordreset request with email sent')
    it.todo('responds to POST /passwordreset request with invalid email')
})