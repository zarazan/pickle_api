import React, { useState } from 'react';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';
import pickleApi from '../../services/pickle_api';

import { ReactComponent as Logo } from '../../icons/pickle.svg';

const ForgotPassword = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [displaySuccess, toggleDisplaySuccess] = useState(false);

    return (
        <ForgotPasswordWrapper className='c-forgot-password'>
            <Banner className='l-row-flex'>
			    <Logo className='c-login__logo' style={{ height: '20px', width: '20px'}}/>
			    <h3 className='c-login__brand-name'>pickle skin</h3>
		    </Banner>

            <PageHeading>{!displaySuccess ? 'Forgot your password?' : 'Check your mail'}</PageHeading>

            {!displaySuccess
                ?
                    <ResetWrapper className='forgot-password-form l-column-flex' >
                        <div className='l-column-flex l-column-flex__item'>
                            <label htmlFor='email'>EMAIL ADDRESS</label>
                            <input
                                className='c-forgot-password__email'
                                data-testid='forgot-password-email'
                                type='email' 
                                name='email' 
                                value={email} 
                                placeholder='name@mail.com' 
                                onChange={e => handleInputChange(e)}
                            />
                        </div>
                        <ResetButton
                            className='c-forgot-password__submit'
                            disabled={!email || email === ''}
                            onClick={() => handlePasswordReset()}
                        >
                            Send
                        </ResetButton>
                    </ResetWrapper>
                :
                    <SuccessMessage className='success-message l-column-flex'>
                        <h3 className='forgot-password__text'>{'Please check your inbox and click in the received link to reset your password.'}</h3>
                        <LoginButton 
                            className='forgot-password__back-to-login'
                            onClick={() => history.push('/sign-in')}
                        >
                            Back to Sign-in
                        </LoginButton>
                    </SuccessMessage>
            }
        </ForgotPasswordWrapper>
    )

    /** handleInputChange: Sets input value to state. */
    function handleInputChange(e) {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
    }

    /** handlePasswordReset: Sends a reset password email. */
    function handlePasswordReset() {
        setErrorMessage('');        

        // TODO: send reset link
        // pickleApi.sendPasswordReset(email)
        //     .then(data => {
        //         setEmail('');
                    toggleDisplaySuccess(!displaySuccess);
        //     })
        //     .catch(error => {
        //         setErrorMessage(error.toString());
        //     })
    }
}

export default ForgotPassword;

const ForgotPasswordWrapper = styled.div`
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

const ResetWrapper = styled.form`
    align-items: center;
    flex-flow: column nowrap;
    width: 100%;

    & > div.l-column-flex__item {
		align-items: stretch;

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

const ResetButton = styled.button`
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