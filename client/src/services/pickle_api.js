import axios from 'axios'
import { useHistory } from 'react-router-dom';

class PickleApi {

  constructor() {
    this.client = this.axios_client();
  }

  getAdminFixtures(pool_id) {
    const options = {method: 'get', url: `/admin/pools/${pool_id}/fixtures`}
    return this.sendRequest(options); 
  }

  saveAdminFixtures(fixtures) {
    const options = {method: 'patch', url: '/admin/fixtures', data: {fixtures: fixtures}}
    return this.sendRequest(options);
  }

  getBets(pool_id, params) {
    const options = {method: 'get', url: `/pools/${pool_id}/bets`, params: params}
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

  enterPool(pool_id) {
    const options = {method: 'post', url: `/pools/${pool_id}/enter_pool`}
    return this.sendRequest(options);
  }

  getAuth() {
    const options = {method: 'get', url: '/user'}
    return this.sendRequest(options);
  }

  updatePassword(password, passwordConfirmation) {
    const data = {password: password, password_confirmation: passwordConfirmation}
    const options = {method: 'patch', url: '/auth/password', data: data, authRoute: true}
    return this.sendRequest(options);
  }

  createUser(email, name, password, passwordConfirmation) {
    const data = {
      email: email,
      name: name,
      password: password,
      password_confirmation: passwordConfirmation,
      confirm_success_url: ''
    }
    const options = {method: 'post', url: '/auth', data: data, authRoute: true}
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
    localStorage.setItem('access-token', "");
    localStorage.setItem('client', "");
    localStorage.setItem('uid', "");
  }

  sendRequest(options) {
    if(!options.authRoute) { options.url = '/api' + options.url }
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
    localStorage.setItem('access-token', headers['access-token']);
    localStorage.setItem('client', headers['client']);
    localStorage.setItem('uid', headers['uid']);
  }

  getAuthHeaders() {
    let headers = {}
    headers['access-token'] = localStorage.getItem('access-token');
    headers['client'] = localStorage.getItem('client');
    headers['uid'] = localStorage.getItem('uid');
    return headers;
  }

  hasSessionInfo() {
    return !!localStorage.getItem('access-token') &&
      !!localStorage.getItem('client') &&
      !!localStorage.getItem('uid');
  }

  axios_client() {
    var config = {}
    if (process.env.NODE_ENV == 'development') {
      config = { baseURL: 'http://localhost:3001' }
    }
    return axios.create(config);
  }

}

export default new PickleApi();
