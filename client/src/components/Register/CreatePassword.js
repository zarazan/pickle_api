import React, { useState } from 'react';
import styled from 'styled-components';

import { Link, useHistory } from 'react-router-dom';
import pickleApi from '../../services/pickle_api';

import { ReactComponent as Logo } from '../../icons/pickle.svg';

const CreatePassword = () => {
    const history = useHistory();
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [displaySuccess, toggleDisplaySuccess] = useState(false);

    const passwordValid = passwordOne && passwordTwo && (passwordOne === passwordTwo);

    return (
        <CreatePasswordWrapper className='c-create-password'>
            <Banner className='l-row-flex'>
			    <Logo className='c-create-password__logo' style={{ height: '20px', width: '20px'}}/>
			    <h3 className='c-create-password__brand-name'>pickle skin</h3>
		    </Banner>

            <PageHeading>{!displaySuccess ? 'Create new password' : 'You\'re good to go!'}</PageHeading>

            {!displaySuccess
                ?
                    <>
                        <CreateWrapper className='reset-form l-column-flex'>
                            <div className='l-column-flex l-column-flex__item'>
                                <label htmlFor='password-one'>PASSWORD</label>
                                <input
                                    className='c-create-password__password-one'
                                    data-testid='create-password-one'
                                    type='password' 
                                    name='password-one' 
                                    value={passwordOne} 
                                    placeholder='Password' 
                                    onChange={e => setPasswordOne(e.target.value)}
                                />
                            </div>
                            <div className='l-column-flex l-column-flex__item'>
                                <label htmlFor='password-two'>CONFIRM PASSWORD</label>
                                <input
                                    className='c-create-password__password-two'
                                    data-testid='create-password-two'
                                    type='password' 
                                    name='password-two' 
                                    value={passwordTwo} 
                                    placeholder='Retype Password' 
                                    onChange={e => setPasswordTwo(e.target.value)}
                                />
                            </div>
                            <RegisterButton
                                className='c-create-password__submit'
                                disabled={!passwordValid}
                                onClick={() => handlePasswordReset()}
                            >
                                Reset Password
                            </RegisterButton>
                        </CreateWrapper>
                    </>
                :
                    <SuccessMessage>
                        <h3 className='c-create-password__text'>{'Your password has been reset. You may now log in wth your new password.'}</h3>
                        <LoginButton 
                            className='c-create-password__back-to-login'
                            onClick={() => history.push('/sign-in')}
                        >
                            Back to Sign-in
                        </LoginButton>
                    </SuccessMessage>
            }

        </CreatePasswordWrapper>
    )

    /** handlePasswordReset: Attempts to create a new password for the user. */
    function handlePasswordReset() {
        setErrorMessage('');
        pickleApi.updatePassword(passwordOne, passwordTwo)
            .then(data => {
                setPasswordOne('');
                setPasswordTwo('');
                toggleDisplaySuccess(true);
            })
            .catch(error => {
                setErrorMessage(error.toString());
            })
    }
}

export default CreatePassword;

const CreatePasswordWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 2rem;

    & div.l-grid {
        display: grid;
    }

    & div[class~='l-column-flex'] {
        display: flex;
        flex-flow: column nowrap;
    }

    & div[class~='l-row-flex'] {
        display: flex;
        flex-flow: row nowrap;
    }
`;

const Banner = styled.div`
    align-items: center;
    margin-bottom: 4rem;

    & svg {
        margin-right: 1rem;
    }

    & h3 {
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        margin: 0;
    }
`;

const PageHeading = styled.h2`
    font-family: 'Poppins', sans-serif;
    margin-bottom: 2rem;
`;

const CreateWrapper = styled.div`
    align-items: center;
    flex-flow: column nowrap;
    width: 100%;

    & > div.l-column-flex__item {
        align-items: stretch;
        width: 100%;

		& label {
			margin-bottom: 0.5rem;
			font-family: 'Poppins', sans-serif;
			font-size: .75rem;
			letter-spacing: 0.1rem;
			color: #767b7f;
		}
	
		& input {
			margin-bottom: 1.5rem;
			font-family: 'Inter', sans-serif;
			font-size: 0.825rem;
			padding: 0.7rem 0.5rem;
			background: none;
			border: 1px solid grey;
			border-radius: 0.2rem;
		}
    }
`;

const RegisterButton = styled.button`
    box-sizing: border-box;
    margin-top: 1.25rem;
    padding: 1rem 0 1rem;
    width: 100%;
    background: #8fd6a9;
    border: none;
    border-radius: 0.2rem;
    outline: none;
    font-family: 'Inter', 'Sans Serif';
    font-size: .8125rem;
    color: white;

    &:disabled {
        background: lightgrey;
    }
`;

const LoginButton = styled.button`
    box-sizing: border-box;
    margin-top: 1.25rem;
    padding: 1rem 0 1rem;
    width: 100%;
    background: #8fd6a9;
    border: none;
    border-radius: 0.2rem;
    outline: none;
    font-family: 'Inter', 'Sans Serif';
    font-size: .8125rem;
    color: white;

    &:disabled {
        background: lightgrey;
    }
`;

const RegistrationFooter = styled.div`
    align-items: center;

    font-family: 'Inter', 'Sans Serif';
    font-size: .8125rem;
    color: #000000;

    & a {
        &:link {
            color: #379559;
            text-decoration: none;
        }

        &:visited {
            color: #379559;
            text-decoration: none;
        }

        &:hover, :active {
            color: #1c4a2d;
            text-decoration: none;
        }
    }
`;

const SuccessMessage = styled.div`
    align-items: center;

    & h3 {
        text-align: center;
        font-family: 'Inter', 'Sans Serif';
        font-size: .8125rem;
        color: #767b7f;
        font-weight: 300;
    }
`;