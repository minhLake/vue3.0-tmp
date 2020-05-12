import axios from "./http";
import base from "./urls";

//登录
export const login = params => {
  return axios.get(`${base.signIn}`, params);
};
