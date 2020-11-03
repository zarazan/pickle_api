import axios from 'axios'

class PickleApi {

  constructor() {
    this.client = this.axios_client();
  }

  getBets(pool_id, params) {
    const options = {method: 'get', url: `/pools/${pool_id}/bets`, data: params}
    return this.sendRequest(options);
  }

  createBet(data) {
    const options = {method: 'post', url: '/bets', data: data}
    return this.sendRequest(options)
  }

  getEntries(pool_id, params) {
    const options = {method: 'get', url: `/pools/${pool_id}/entries`, data: params}
    return this.sendRequest(options);
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

  signIn(email, password) {
    const data = {email: email, password: password }
    const options = {method: 'post', url: '/auth/sign_in', data: data}
    return this.client.request(options)
      .then(response => {
        this.setSessionData(response['headers']);
        return response.data.data;
      });
  }

  sendRequest(options) {
    options = { ...options, headers: this.getAuthHeaders() };
    return this.client.request(options)
    .then(response => {
      return response.data;
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
      baseURL: 'http://localhost:3001'
    });
  }

}

export default new PickleApi();
