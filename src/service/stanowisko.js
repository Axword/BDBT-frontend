import RestObject from './rest-object';

class Stanowisko extends RestObject {
  constructor({ id, ...rest }) {
    super();
    this.id = id;
    Object.assign(this, rest);
  }
}

Stanowisko.URL = 'pracownicy/stanowisko/';

export default Stanowisko;