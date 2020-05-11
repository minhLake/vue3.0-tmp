import axios from './http';
import { base } from './urls';

//登录
const login = (params) => { return axios.post(`${base.signIn}`, params) };

export default {
  login
}