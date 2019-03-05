import React from 'react';

const contexts = {};

export const createContext = (key, defaultValue = {}) => {
  if (!key) return;
  if (contexts[key]) {
    return contexts[key];
  } else {
    const context = React.createContext(defaultValue);
    contexts[key] = context;
    return context;
  }
}

export const withContext = key => Component => {
  return (props) => {
    const { Consumer } = createContext(key);
    return (
      <Consumer>
        {context => <Component {...props} context={context} />}
      </Consumer>
    )
  }
}

export default createContext;
