import RestObject from './rest-object';

class Jezyki extends RestObject {
  constructor({ id, ...rest }) {
    super();
    this.id = id;
    Object.assign(this, rest);
  }
}

Jezyki.URL = 'jezyki/jezyki/';

export default Jezyki;