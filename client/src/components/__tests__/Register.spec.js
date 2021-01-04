import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, screen, fireEvent, waitFor } from '../../utilities/testUtilities';

import Register from '../Register/Register';

describe('<Register /> spec', () => {

    it('loads correctly and renders form elements', async () => {
        render(
            <MemoryRouter initialEntries={['/sign-up']}>
                <Register />
            </MemoryRouter>
        )

        expect(screen.getByRole('heading', { name: 'Register'})).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Create Account'})).toBeDisabled()
    })

    it('allows for user registration submisison with valid inputs', async () => {
        render(
            <MemoryRouter initialEntries={['/sign-up']}>
                <Register />
            </MemoryRouter>
        )

        const mockData = {
            email: 'larry.david@gmail.com',
            password: 'abc123',
            confirmPassword: 'abc123',
        }

        const emailInput = screen.getByTestId('register-email');
        const passwordOneInput = screen.getByTestId('register-password-one');
        const passwordTwoInput = screen.getByTestId('register-password-two');

        expect(screen.getByRole('button', { name: 'Create Account'})).toBeDisabled()

        fireEvent.change(emailInput, { target: { value: mockData.email } })
        expect(emailInput.value).toBe('larry.david@gmail.com')

        fireEvent.change(passwordOneInput, { target: { value: mockData.password } })
        expect(passwordOneInput.value).toBe('abc123')

        fireEvent.change(passwordTwoInput, { target: { value: mockData.confirmPassword } })
        expect(passwordTwoInput.value).toBe('abc123')

        expect(screen.getByRole('button', { name: 'Create Account'})).not.toBeDisabled()
    })

    it('prohibits user registration submisison with invalid inputs', async () => {
        render(
            <MemoryRouter initialEntries={['/sign-up']}>
                <Register />
            </MemoryRouter>
        )
        
        const mockData = {
            email: 'larry.david@gmail.com',
            password: 'abc123',
            confirmPassword: 'abc12',
        }

        const emailInput = screen.getByTestId('register-email');
        const passwordOneInput = screen.getByTestId('register-password-one');
        const passwordTwoInput = screen.getByTestId('register-password-two');

        expect(screen.getByRole('button', { name: 'Create Account'})).toBeDisabled()

        fireEvent.change(emailInput, { target: { value: mockData.email } })
        expect(emailInput.value).toBe('larry.david@gmail.com')

        fireEvent.change(passwordOneInput, { target: { value: mockData.password } })
        expect(passwordOneInput.value).toBe('abc123')

        fireEvent.change(passwordTwoInput, { target: { value: mockData.confirmPassword } })
        expect(passwordTwoInput.value).toBe('abc12')

        expect(screen.getByRole('button', { name: 'Create Account'})).toBeDisabled()
    })

    it('contains proper link for routing back to sign in page', async () => {
        render(
            <MemoryRouter initialEntries={['/sign-up']}>
                <Register />
            </MemoryRouter>
        )

        const navItem = screen.getByTestId('register-sign-in')
        expect(screen.getByRole('heading', { name: 'Register'})).toBeInTheDocument()

        expect(navItem.href).toBe('http://localhost/sign-in')
    })

    it.todo('sends POST /users request')
    it.todo('responds to POST /users request with account created')
    it.todo('responds to POST /users request with account already exists')
})