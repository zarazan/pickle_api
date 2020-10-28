import axios from 'axios'

class PickleApi {

  constructor() {
    this.client = this.axios_client();
  }

  getFixtures(pool_id, params) {
    const options = {method: 'get', url: `/pools/${pool_id}/fixtures`, data: params}
    return this.sendRequest(options);
  }

  getPools() {
    const options = {method: 'get', url: '/pools'}
    return this.sendRequest(options);
  }

  createPool(data) {
    const options = {method: 'post', url: '/pools', data: data}
    return this.sendRequest(options);
  }

  signIn() {
    const data = {email: 'zarazan@gmail.com', password: 'pickle1' }
    const options = {method: 'post', url: '/auth/sign_in', data: data}
    return this.client.request(options)
      .then(response => {
        this.setSessionData(response['headers']);
        return response['data'];
      }, (error) => {
        console.log(error);
      });
  }

  sendRequest(options) {
    return this.client.request(options)
    .then(response => {
      return response['data']
    }, (error) => {
      console.log(error)
      return error
    })
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
