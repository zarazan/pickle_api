import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import pickleApi from '../services/pickle_api';
import { UserContext } from '../contexts/UserContext';

const SignIn = props => {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('zarazan@gmail.com');
  const [userPassword, setUserPassword] = useState('pickle1');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [user, setUser] = useContext(UserContext);

  return user.name ? renderSignOut() : renderSignIn()

  function renderSignIn() {
    return(
      <div>
        <h2>Sign In</h2>
        <h3>{errorMessage}</h3>
        <form onSubmit={handleLogin}>
          <input 
              type='email' 
              name='email' 
              value={userEmail} 
              placeholder='name@mail.com' 
              onChange={e => setUserEmail(e.target.value)}
          />
          <input 
              type='password' 
              name='password' 
              value={userPassword} 
              placeholder='Password' 
              onChange={e => setUserPassword(e.target.value)}
          />
          <input type='submit' name='Sign In' />
        </form>
      </div>
    )
  }

  function renderSignOut() {
    return (
      <>
        <button onClick={handleSignOut}>Sign Out</button>
        <button onClick={() => history.push('/')}>Dashboard</button>
      </>
    )
  }

  function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    pickleApi.signIn(userEmail, userPassword)
      .then(data => {
        console.log(data);
        setIsLoading(false);
        setUser(data);
        history.push('/');
      })
      .catch(error => {
        setErrorMessage(error.toString());
      })
  }

  function handleSignOut(e) {
    setUser({});
    pickleApi.signOut();
  }

}

export default SignIn;
