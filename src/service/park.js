import RestObject from './rest-object';

class Park extends RestObject {
  constructor({ id, ...rest }) {
    super();
    this.id = id;
    Object.assign(this, rest);
  }
}

Park.URL = 'parku/park-rozrywki';

export default Park;