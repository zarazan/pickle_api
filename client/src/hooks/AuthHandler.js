import { useEffect } from 'react';
import pickleApi from '../services/pickle_api';
import { useHistory } from 'react-router-dom';

function useAuthHandler(loginInfo, setLoginInfo) {
  const history = useHistory();

  function redirectToSignIn() {
    setLoginInfo({
      user: {},
      isLoading: false,
      isLoggedIn: false,
    });
    history.push('/sign-in');
  }

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
        redirectToSignIn();
      })
  }

  function loadUserOrRedirect() {
    if(loginInfo.isLoggedIn) { return }
    if(pickleApi.hasSessionInfo()) {
      loadUser();
    } else {
      redirectToSignIn();
    }
  }

  useEffect(() => loadUserOrRedirect(), []);
}

export default useAuthHandler;
