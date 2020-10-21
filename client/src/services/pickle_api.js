import axios from 'axios'

class PickleApi {

  constructor() {
    this.client = self.axios_client();
  }

  signIn() {
    data = { email: 'zaraazan@gmail.com', password: 'pickle1' }
    this.client.post('/auth/sign_in')
  }

  getPools() {
    this.client.get('/pools');
  }

  axios_client() {
    return axios.create({
      baseURL: `http://localhost:3001`
    });
  }  

}

export default PickleApi;
