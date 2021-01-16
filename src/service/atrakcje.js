import RestObject from './rest-object';

class Sektor extends RestObject {
  constructor({ id, ...rest }) {
    super();
    this.id = id;
    Object.assign(this, rest);
  }
}

Sektor.URL = 'atrakcje/atrakcje/';

export default Sektor;