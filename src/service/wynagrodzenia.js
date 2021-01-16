import RestObject from './rest-object';

class Wynagrodzenia extends RestObject {
  constructor({ id, ...rest }) {
    super();
    this.id = id;
    Object.assign(this, rest);
  }
}

Wynagrodzenia.URL = 'pracownicy/wynagrodzenie/';

export default Wynagrodzenia;