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

  signIn() {
    var data = {email: 'zarazan@gmail.com', password: 'pickle1' }
    var options = {
      method: 'post',
      url: '/auth/sign_in',
      data: data
    }
    this.client.request(options)
      .then(response => {
        this.setSessionData(response['headers']);
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
    var headers = {}
    headers['access-token'] = sessionStorage.getItem('access-token');
    headers['client'] = sessionStorage.getItem('client');
    headers['uid'] = sessionStorage.getItem('uid');
    return headers;
  }

  getPools() {
    this.client.get('/pools')
      .then(response => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
  }

  axios_client() {
    const headers = this.getAuthHeaders();
    return axios.create({
      baseURL: 'http://localhost:3001',
      headers: headers
    });
  }

}

export default PickleApi;
