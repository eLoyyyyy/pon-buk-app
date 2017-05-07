import C from './constants';
import initialState from './initialState.json';
import storeFactory from './store/index';
import { addContact, loadContacts } from './actions';

const store = storeFactory(initialState);

store.dispatch(
  loadContacts()
);
