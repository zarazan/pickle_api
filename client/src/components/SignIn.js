import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import pickleApi from '../services/pickle_api';
import useAuthHandler from '../hooks/AuthHandler';

import { ReactComponent as Logo } from '../icons/pickle.svg';

const SignIn = () => {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [user, setUser] = useContext(UserContext);
  const isLoadingUser = useAuthHandler(user, setUser);
  const invalidInputs = !userEmail || !userPassword;

  return (
  	<LoginWrapper className='login'>
		<Banner className='brand-banner'>
			<LogoIcon />
			<h3>pickle skin</h3>
		</Banner>
		<Heading2>Sign In</Heading2>
		<LoginForm className='login-form' onSubmit={handleLogin}>
			<div className='input-option'>
			<label htmlFor='email'>EMAIL ADDRESS</label>
				<input 
					type='email' 
					name='email' 
					value={userEmail} 
					placeholder='name@mail.com' 
					onChange={e => setUserEmail(e.target.value)}
				/>
			</div>
			<div className='input-option'>
				<label htmlFor='email'>PASSWORD</label>
				<input 
					type='password' 
					name='password' 
					value={userPassword} 
					placeholder='Password' 
					onChange={e => setUserPassword(e.target.value)}
				/>
			</div>
			<SignInButton
				className='form-submit'
				type='submit'
				disabled={invalidInputs ? true : false}
			>
				Sign In
			</SignInButton>
		</LoginForm>
		<h3>{errorMessage}</h3>
		<div className='forgot-password'>
			<ForgotPasswordLink href='' >Forgot Password?</ForgotPasswordLink>
		</div>
	</LoginWrapper>
  );

	/** handleLogin: sets component state and loggs the user in. */
	function handleLogin(e) {
	e.preventDefault();
	setIsLoading(true);
	setErrorMessage('');
	pickleApi.signIn(userEmail, userPassword)
		.then(data => {
			setIsLoading(false);
			setUser(data);
			// add heap identity
			window.heap.identify(data.email);
			history.push('/');
		})
		.catch(error => {
			setErrorMessage(error.toString());
		});
	};
};

export default SignIn;

const LoginWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 2rem;

  & > div[class='forgot-password'] {
	display: flex;
	justify-content: center;
}
`;

const Banner = styled.div`
	display: flex;
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

const LogoIcon = styled(Logo)`
    height: 1.5rem;
    width: 1.5rem;
`;

const Heading2 = styled.h2`
	font-family: 'Poppins', sans-serif;
	margin-bottom: 2rem;
`;

const LoginForm = styled.form`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	flex-flow: column nowrap;
	width: 100%;

	& div[class='input-option'] {
		width: 100%;
		display: flex;
		flex-flow: column nowrap;
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

const SignInButton = styled.button`
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

const ForgotPasswordLink = styled.a`
	font-family: 'Inter', 'Sans Serif';
    font-size: .8125rem;
	color: #379559;
	text-decoration: none;
`;