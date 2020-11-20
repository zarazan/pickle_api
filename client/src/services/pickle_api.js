import axios from 'axios'
import { useHistory } from 'react-router-dom';

class PickleApi {

  constructor() {
    this.client = this.axios_client();
  }

  getAdminFixtures(pool_id) {
    const options = {method: 'get', url: `admin/pools/${pool_id}/fixtures`}
    return this.sendRequest(options); 
  }

  saveAdminFixtures(fixtures) {
    const options = {method: 'patch', url: 'admin/fixtures', data: {fixtures: fixtures}}
    return this.sendRequest(options);
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

  getAuth() {
    const options = {method: 'get', url: '/user'}
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

  signOut() {
    sessionStorage.setItem('access-token', "");
    sessionStorage.setItem('client', "");
    sessionStorage.setItem('uid', "");
  }

  sendRequest(options) {
    options.url = '/api' + options.url;
    options = { ...options, headers: this.getAuthHeaders() };
    return this.client.request(options)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if(error.response && error.response.status === 401) {
        const history = useHistory();
        history.push('/sign-in');
      } else {
        throw error;
      }
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

  hasSessionInfo() {
    return !!sessionStorage.getItem('access-token') &&
      !!sessionStorage.getItem('client') &&
      !!sessionStorage.getItem('uid');
  }

  axios_client() {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://pickle-skin.herokuapp.com' : 'http://localhost:3001'
    return axios.create({
      baseURL: baseUrl
    });
  }

}

export default new PickleApi();
