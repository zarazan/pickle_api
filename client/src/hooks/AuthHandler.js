import { useState, useEffect } from 'react';
import pickleApi from '../services/pickle_api';
import history from '../history';

function useAuthHandler(user, setUser) {

  const [isLoading, setIsLoading] = useState(true);

  function loadUser() {
    pickleApi.getAuth()
      .then(data => {
        setUser(data);
        setIsLoading(false);
      }).catch(error => {
        history.push('/sign-in');
      })
  }

  function loadUserOrRedirect() {
    console.log('loading or redirecting user');
    if(Object.keys(user).length !== 0) {
      setIsLoading(false);
      return;
    }
    if(pickleApi.hasSessionInfo()) {
      loadUser();
    } else {
      history.push('/sign-in');
    }
  }

  useEffect(() => loadUserOrRedirect(), []);

  return isLoading;
}

export default useAuthHandler;
