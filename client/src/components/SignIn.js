import React, { useState } from 'react';

const SignIn = props => {

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <div>
      <h2>Sign In</h2>
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
    console.log(userEmail);
    console.log(userPassword);
  }

}

export default SignIn;
