import React, { useState } from 'react';

const UserContext = React.createContext([{}, () => {}]);

const UserProvider = (props) => {

  const [loginInfo, setLoginInfo] = useState({
    user: {},
    isLoading: true,
    isLoggedIn: false,
  });

  return (
    <UserContext.Provider value={[loginInfo, setLoginInfo]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };
