import React, { useState, useContext } from 'react';
import history from '../history';
import pickleApi from '../services/pickle_api';
import { UserContext } from '../contexts/UserContext';

const SignIn = props => {

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useContext(UserContext);

  return (
    <div>
      <h2>Sign In</h2>
      <h3>{errorMessage}</h3>
      <form onSubmit={handleLogin}>
        <input 
            type="email" 
            name="email" 
            value={userEmail} 
            placeholder="name@mail.com" 
            onChange={e => setUserEmail(e.target.value)}
        />
        <input 
            type="password" 
            name="password" 
            value={userPassword} 
            placeholder="Password" 
            onChange={e => setUserPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  )

  function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
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

}

export default SignIn;
