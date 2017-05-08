import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import C from '../constants';
import singleReducer from './reducers';

/* const consoleMessages = store => next => (action) => {
  console.log(`dispatching action => ${action.type}`);
  const result = next(action);
  const { contacts, errors, contactNames } = store.getState();

  console.log(`
    contacts: ${JSON.stringify(contacts, null, 2)}
    fetching: ${contactNames.fetching}
    suggestions: ${JSON.stringify(contactNames.suggestions, null, 2)}
    errors: ${JSON.stringify(errors, null, 2)}
  `);
  return result;
};*/

export default (initialState = {}) =>
  applyMiddleware(thunk, logger)(createStore)(singleReducer, initialState);

// export default createStore(singleReducer, applyMiddleware(thunk, logger));
