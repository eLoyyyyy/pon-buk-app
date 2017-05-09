import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { loadContacts } from '../actions';
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

const localStorageLoad = store => next => (action) => {
  const { type } = action;
  if (type === 'INIT') {
    try {
      const storedState = JSON.parse(
        localStorage.getItem('pon-buk-app')
      );

      if (storedState) {
        /* store.dispatch({
          type: 'RESET_STATE',
          payload: storedState
        });*/
        store.dispatch( loadContacts() );
      }
      return;
    } catch (e) {
    // Unable to load or parse stored state, proceed as usual
    }
  }

  next(action);
};

const localStorageDump = store => next => (action) => {
  const state = store.getState();

  console.log(state);
  localStorage.setItem('pon-buk-app', JSON.stringify(state));
  next(action);
};

export default (initialState = {}) =>
  applyMiddleware(localStorageLoad, thunk, localStorageDump, logger)(createStore)(singleReducer, initialState);

// export default createStore(singleReducer, applyMiddleware(thunk, logger));
