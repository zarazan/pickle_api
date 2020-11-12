import { useState, useEffect } from 'react';
import pickleApi from '../services/pickle_api';
import { NavLink, useHistory } from 'react-router-dom';

function useAuthHandler(user, setUser) {

  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

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
    if(Object.keys(user).length !== 0) {
      setIsLoading(false);
      return;
    }
    if(pickleApi.hasSessionInfo()) {
      loadUser();
    } else {
      console.log('pushing sign-in');
      history.push('/sign-in');
    }
  }

  useEffect(() => loadUserOrRedirect(), []);

  return isLoading;
}

export default useAuthHandler;
