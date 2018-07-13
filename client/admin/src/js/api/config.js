import axios from "axios"
import { Notification } from 'element-ui';
import qs from "qs"

window.axios = axios;
window.qs = qs;

if(process.env.NODE_ENV === 'development'){
  axios.defaults.baseURL = 'http://192.168.1.112:8076/api';
}else{
  axios.defaults.baseURL = '/api'
}

axios.interceptors.request.use(config => {
  return config;
});


axios.interceptors.response.use(res => {
  // 后面是匹配没有遵循code data 格式的
  let data = res.data.data || res.data;
  let message = res.message || res.data.message;

  // 遵循 code data 的需要200才能对，不遵循的直接放过
  if (res.data.status || res.data.code===undefined) {
    return data;
  } else {
    Notification({
      message,
      type: 'error'
    })
    return Promise.reject(data);
  }
}, res => {
  res = res.response;
  // 后面是匹配没有遵循code data 格式的
  let data = res.data.data || res.data;
  let message = res.message || res.data.message;
  Notification({
    message,
    type: 'error'
  })
  return Promise.reject(res.data);
});
