import axios from 'axios';
import Qs from 'qs';
import store from '@/store';

axios.defaults.paramsSerializer = params => Qs.stringify(params, { arrayFormat: 'repeat' });

class Http {
  constructor() {
    this.http = axios.create(this.getConfig());
    this.http.interceptors.response.use(response => response, this.$handleError.bind(this));
  }

  fetch(method, url, params) {
    return this.http[method](url, params);
  }

  getConfig() {
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      baseURL: 'http://127.0.0.1:8001/api/v1/',
    };
  }
  $handleError(error) {
    let msg = [];

    function flatten(target, opts) {
      opts = opts || {};

      let delimiter = opts.delimiter || '.';

      function step(object, prev) {
        Object.keys(object).forEach(function(key) {
          let value = object[key];
          let isArray = Array.isArray(value);
          let type = Object.prototype.toString.call(value);
          let isObject = type === '[object Object]';

          let newKey = prev
            ? prev + delimiter + key
            : key;

          if (!isArray && isObject && Object.keys(value).length) {
            return step(value, newKey);
          }

          if (isArray) {
            Array.prototype.push.apply(msg, value);
          } else {
            msg.push(value);
          }
        });
      }

      step(target);
    }
    if (!(error.response === 'undefinied' && error.response.data ==='undefinied')) {
      if (error.response.status === 400 || error.response.status === 404 || error.response.status === 403) {
        flatten(error.response.data);
      } else if (error.response.status === 401) {
        msg.push('Zostałeś wylogowany po okresie bezczynności.');
      }
    }

    if (!msg.length) {
      msg.push('Wystąpił nieoczekiwany błąd.');
    }

    store.commit('showMessage', { message: msg.join('\n'), color: 'error' });

    throw error;
  }
}

export default Http;
