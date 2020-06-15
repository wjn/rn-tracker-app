import { NavigationActions } from 'react-navigation';
/**
 * let means we want to be able to reassign a variable at a later time.
 */
let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

/**
 *
 * @param {App.js routes} routeName
 * @param {info for the Screen Shown} params
 *
 * The react navigator has a context api that we invoke to change the state of the
 * navigation context. Here the var `navigator` has been passed in from App.js. We
 * can call navigate outside of components now if `navigate` is imported by name
 * from this file.
 */

export const navigate = (routeName, params) => {
  // React navigator has an API that we'll engage.
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};
