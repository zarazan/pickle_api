import { useEffect } from 'react';
import pickleApi from '../services/pickle_api';
import { useHistory } from 'react-router-dom';

function useAuthHandler(loginInfo, setLoginInfo) {
  const history = useHistory();

  function loadUser() {
    pickleApi.getAuth()
      .then(data => {
        setLoginInfo({
          user: data,
          isLoading: false,
          isLoggedIn: true,
        });
        window.heap.identify(data.email);
      }).catch(error => {
        history.push('/sign-in');
      })
  }

  function loadUserOrRedirect() {
    if(loginInfo.isLoggedIn) { return }
    if(pickleApi.hasSessionInfo()) {
      loadUser();
    } else {
      history.push('/sign-in');
    }
  }

  useEffect(() => loadUserOrRedirect(), []);
}

export default useAuthHandler;
