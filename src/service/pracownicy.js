import RestObject from './rest-object';

class Pracownicy extends RestObject {
  constructor({ id, ...rest }) {
    super();
    this.id = id;
    Object.assign(this, rest);
  }
}

Pracownicy.URL = 'pracownicy/pracownik/';

export default Pracownicy;