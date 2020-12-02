import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import pickleApi from '../services/pickle_api';
import useAuthHandler from '../hooks/AuthHandler';

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
		<h2>Sign In</h2>
		<LoginForm className='login-form' onSubmit={handleLogin}>
			<div className='input-option'>
			<label htmlFor='email'>Email Address</label>
				<input 
					type='email' 
					name='email' 
					value={userEmail} 
					placeholder='name@mail.com' 
					onChange={e => setUserEmail(e.target.value)}
				/>
			</div>
			<div className='input-option'>
				<label htmlFor='email'>Password</label>
				<input 
					type='password' 
					name='password' 
					value={userPassword} 
					placeholder='Password' 
					onChange={e => setUserPassword(e.target.value)}
				/>
			</div>
			<button
				className='form-submit'
				type='submit'
				disabled={invalidInputs ? true : false}
			>
				Sign In
			</button>
		</LoginForm>
		<h3>{errorMessage}</h3>
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
			console.log('auth');
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
		}

		& input {
			margin-bottom: 1.5rem;
		}
	}

	& button {
		width: 100%;
	}
`;