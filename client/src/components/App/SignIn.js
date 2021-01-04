import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../../contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';
import pickleApi from '../../services/pickle_api';

import { ReactComponent as Logo } from '../../icons/pickle.svg';

const SignIn = () => {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  // REVIEW: Do we need the isLoading state?
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [loginInfo, setLoginInfo] = useContext(UserContext);

  const invalidInputs = !userEmail || !userPassword;

  return (
  	<LoginWrapper className='c-login'>
		<Banner className='l-row-flex'>
			<Logo className='c-login__logo' style={{ height: '20px', width: '20px'}}/>
			<h3 className='c-login__brand-name'>pickle skin</h3>
		</Banner>

		<PageHeading>Sign In</PageHeading>

		<LoginForm className='login-form l-column-flex' onSubmit={handleLogin}>
			<div className='l-column-flex l-column-flex__item'>
				<label htmlFor='email'>EMAIL ADDRESS</label>
				<input 
					type='email' 
					name='email' 
					value={userEmail} 
					placeholder='name@mail.com' 
					onChange={e => setUserEmail(e.target.value)}
				/>
			</div>
			<div className='l-column-flex l-column-flex__item'>
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
				className='c-login__submit'
				type='submit'
				disabled={invalidInputs ? true : false}
			>
				Sign In
			</SignInButton>
		</LoginForm>
		<LoginFooter className='l-column-flex'>
			<h3 className='c-login__error-message'>{errorMessage}</h3>
			<h3 className='c-login__sign-up'>Need an account? <Link to={'/sign-up'}>Sign up here</Link></h3>
			<Link to={'/forgot-password'} className='c-login__forgot-password'>Forgot Password?</Link>
		</LoginFooter>
	</LoginWrapper>
  );

	/** handleLogin: sets component state and loggs the user in. */
	function handleLogin(e) {
		e.preventDefault();
		setLoginInfo({
			user: {},
			isLoading: true,
			isLoggedIn: false,
		});
		setErrorMessage('');
		pickleApi.signIn(userEmail, userPassword)
			.then(data => {
				setLoginInfo({
					user: data,
					isLoading: false,
					isLoggedIn: true,
        		});
				window.heap.identify(data.email);
				history.push('/');
			})
			.catch(error => {
				setErrorMessage(error.toString());
				setLoginInfo({
					user: {},
					isLoading: false,
					isLoggedIn: false,
        		});
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

const LoginForm = styled.form`
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

const LoginFooter = styled.div`
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
