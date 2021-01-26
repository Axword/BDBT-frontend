import router from '@/router';
import State from './state';
import Http from './http';

const LOGIN_URL = 'login/';

class Auth {
  static async login(username, password) {
    const http = new Http();
    try {
      const response = await http.fetch('post', LOGIN_URL, { username, password });
      State.setAccessToken(response.data.token);
      router.push({ name: 'Strona główna' }).catch(() => {});
      return response;
    } catch (err) {
      State.setAccessToken('');
      State.setRefreshToken('');
      State.setUserType(null);
      throw err;
    }
  }

  static async logout() {
    State.setAccessToken('');
    State.setPermissions(null);
    router.push({ name: 'Logowanie' }).catch(() => {});
  }
}

export default Auth;
