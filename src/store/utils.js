function objectHandler(setter) {
    return {
      get(obj, prop) {
        if (! (prop in obj)) {
          setter({ prop, value: undefined });
        }
        return obj[prop];
      },
      set(obj, prop, value) {
        setter({ prop, value });
        return true;
      }
    };
  }
  
  export { objectHandler };
  