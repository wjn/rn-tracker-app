import React, { useReducer } from 'react';

/**
 * Context/Providers take three things as arguments:
 *   1. a reducer
 *   2. actions object of functions to be called as dispatch
 *   3. defaultValues
 *
 * Also remember that `Providers` are passed up to the top layer of the app and
 * that `Context` is passed down to the children through the app so that they
 * have access to state that is managed through the parent.
 */
export default (reducer, actions, defaultValue) => {
  const Context = React.createContext;

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};
    for (let key in actions) {
      // look up each action passed in and call each one with the dispatch
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
