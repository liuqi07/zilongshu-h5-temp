import axios from 'axios';
import Qs from 'qs';
import { Toast } from 'antd-mobile'
import { urlConfig } from 'libs/config';

//axios实例，包含默认配置
const instance = axios.create({
  baseURL: urlConfig.baseUrl,
  withCredentials: true
});

//接口请求成功的回调
const success = (res, resolve, reject) => {
  // 成功
  if (res.data.code === 1) {
    resolve(res.data);
  }
  // 失败
  else if(res.data.code === 2) {
    reject(res.data)
    Toast.info(res.data.msg, 4, ()=>{}, true)
  }
  // 登陆过期，清空token、cokie
  else if (res.data.code === 3) {
    reject('登录失效，请重新登录');
    Toast.info('登录失效，请重新登录', 3, ()=>{
      const { pathname, hash } = window.location
      // window.location.href = `/wechat/static/pwdlogin?redirct=${pathname}`
      window.location.href = `#/pwdlogin?redirct=${hash}` // hash路由
    }, true)
  }
  else {
    reject(res.data);
  }
}

//接口请求失败的回调
const failure = (err, reject) => {
  reject(err);
}

export default {
  get: (url, params = {}, config = {}) => {
    const data = {};
    for (let attr in params) {
      if (!(params[attr] && typeof params[attr] === 'object')) {
        data[`${attr}`] = params[attr];
      }
    }
    return new Promise((resolve, reject) => {
      instance
      .get(url, { params: data, ...config })
      .then(res => success(res, resolve, reject))
      .catch(err => failure(err, reject));
    });
  },
  getNoFb: (url, params = {}, config = {}) => {
    const data = {};
    for (let attr in params) {
      if (!(params[attr] && typeof params[attr] === 'object')) {
        data[`${attr}`] = params[attr];
      }
    }
    return new Promise((resolve, reject) => {
      instance
      .get(url, { params: data, ...config })
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },
  post: (url, params = {}, config = {}) => {
    let data = {};
    for (let attr in params) {
      data[`${attr}`] = params[attr];
    }
    data = Qs.stringify(data);
    return new Promise((resolve, reject) => {
      instance
      .post(url, data, config)
      .then(res => success(res, resolve, reject))
      .catch(err => failure(err, reject));
    });
  },
  json: (url, params = {}, config = {}) => {
    let data = { param: params };
    return new Promise((resolve, reject) => {
      instance
      .post(url, data, config)
      .then(res => success(res, resolve, reject))
      .catch(err => failure(err, reject));
    });
  },
  upload: (url, params = {}, config = {}) => {
    let data = params;
    return new Promise((resolve, reject) => {
      instance
      .post(url, data, config)
      .then(res => success(res, resolve, reject))
      .catch(err => failure(err, reject));
    });
  }
}
