import RestObject from './rest-object';

class Sektor extends RestObject {
  constructor({ id, ...rest }) {
    super();
    this.id = id;
    Object.assign(this, rest);
  }
}

Sektor.URL = 'parki/sektor/';

export default Sektor;