import axios from 'axios'

// import PickleApi from '../services/pickle_api';
// useEffect(() => {
//   var api = new PickleApi();
//   api.signIn();
//   api.getPools();
// });

class PickleApi {

  constructor() {
    this.client = this.axios_client();
  }

  getPools() {
    return this.client.get('/pools')
      .then(response => {
        return response['data']
      }, (error) => {
        console.log(error);
        return [];
      });
  }

  createPool(data) {
    const options = {
      method: 'post',
      url: '/pools',
      data: data
    }
    return this.client.request(options)
    .then(response => {
      return response['data']
    }, (error) => {
      console.log(error);
    })
  }

  signIn() {
    const data = {email: 'zarazan@gmail.com', password: 'pickle1' }
    const options = {
      method: 'post',
      url: '/auth/sign_in',
      data: data
    }
    return this.client.request(options)
      .then(response => {
        this.setSessionData(response['headers']);
        return response['data'];
      }, (error) => {
        console.log(error);
      });
  }

  setSessionData(headers) {
    sessionStorage.setItem('access-token', headers['access-token']);
    sessionStorage.setItem('client', headers['client']);
    sessionStorage.setItem('uid', headers['uid']);
  }

  getAuthHeaders() {
    let headers = {}
    headers['access-token'] = sessionStorage.getItem('access-token');
    headers['client'] = sessionStorage.getItem('client');
    headers['uid'] = sessionStorage.getItem('uid');
    return headers;
  }

  signedIn() {
    return !!sessionStorage.getItem('access-token');
  }

  axios_client() {
    return axios.create({
      baseURL: 'http://localhost:3001',
      headers: this.getAuthHeaders()
    });
  }

}

export default PickleApi;
