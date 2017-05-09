import C from './constants';
import initialState from './initialState.json';
import storeFactory from './store/index';
import { fetchContact } from './actions';

const store = storeFactory();

store.dispatch(
  fetchContact('4141')
);
