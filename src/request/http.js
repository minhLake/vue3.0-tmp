/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from "axios";
import router from "@/router";
import urls from "./urls.js";

// 创建axios实例
let instance = axios.create({
  timeout: 1000 * 12
});

// 设置post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// 判断token是否失效
const checkToken = () => {
  let expired_time = localStorage.getItem("expired_time") || "";
  let key = false;
  if (expired_time) {
    let nowTime = new Date();
    let eprTime = new Date(expired_time);
    key = nowTime.getTime() > eprTime.getTime();
  }
  return key;
};
let isRefreshToken = false; //防止同一时间段多次刷新

/*存储请求的数组*/
let refreshSubscribers = [];

/*将所有的请求都push到数组中,其实数组是[function(token){}, function(token){},...]*/
const subscribeTokenRefresh = cb => {
  refreshSubscribers.push(cb);
};

/*数组中的请求得到新的token之后自执行，用新的token去请求数据*/
const onRrefreshed = token => {
  refreshSubscribers.map(cb => cb(token));
};

//刷新token
const refreshToken = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(urls.refresh, {
        params: {
          token: localStorage.getItem("token")
        },
        headers: {
          authorization: localStorage.getItem("token")
        } //设置header信息
      })
      .then(res => {
        if (res.data.code == 3000) {
          // 重新存储token和失效时间
          localStorage.setItem("token", res.data.data.authorization);
          localStorage.setItem("expired_time", res.data.data.expired_time);
          resolve();
        } else {
          if (res.data.code == 2001) {
            //未认证
            toLogin();
          }
          reject();
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  // 清除用户登录信息
  window.localStorage.clear();
  router.replace({
    name: "login"
  });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    case 403:
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    case 404:
      break;
    default:
      console.log(other);
      break;
  }
};

//请求拦截器
instance.interceptors.request.use(req => {
  // 登录状态
  let isLogin = localStorage.getItem("isLogin");
  let token = localStorage.getItem("token") || "";
  req.headers.common["authorization"] = token;
  let isExpired = checkToken();
  if (isLogin && isExpired) {
    //已登录的话判断是否token是否过期
    if (!isRefreshToken) {
      //是否正在刷新
      isRefreshToken = true;
      refreshToken()
        .then(() => {
          // 重新设置token
          let token = localStorage.getItem("token") || "";

          onRrefreshed(token);
          refreshSubscribers = [];
        })
        .catch(() => {
          //请求失败的话重新登陆
          refreshSubscribers = [];
          toLogin();
        })
        .finally(() => {
          isRefreshToken = false;
        });
    }
    /*将请求挂起 callback回调函数执行 等待token刷新完成return promise对象*/
    let retry = new Promise(resolve => {
      subscribeTokenRefresh(token => {
        req.headers.common["authorization"] = token;
        resolve(req);
      });
    });

    return retry;
  } else {
    // return req;
    return Promise.resolve(req);
  }
});

// 响应拦截器
instance.interceptors.response.use(
  res => {
    if (res.status === 200) {
      //和后台约定的状态码
      if (res.data.code == 200) {
        return Promise.resolve(res);
      } else if (res.data.code == 2006) {
        toLogin();
      } else {
        return Promise.reject(res);
      }
    } else {
      return Promise.reject(res);
    }
  },
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      return Promise.reject(`{ status: -1, message: "断网了", data: null }`);
    }
  }
);

export default instance;
