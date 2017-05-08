import { combineReducers } from 'redux';
import C from '../constants';

export const contact = (state = null, action) => {
  switch (action.type) {
    case C.ADD_CONTACT:
      return action.payload;
    default:
      return state;
  }
};

export const active = (state = null, action) => {
  switch (action.type) {
    case C.FETCH_CONTACT:
      return action.payload;
    default:
      return state;
  }
};

export const errors = (state = [], action) => {
  switch (action.type) {
    case C.ADD_ERROR:
      return [
        ...state,
        action.payload
      ];
    case C.CLEAR_ERROR:
      return state.filter((message, i) => i !== action.payload);
    default:
      return state;
  }
};

export const contacts = (state = [], action) => {

  switch (action.type) {
    case C.ADD_CONTACT:
      return ( state.some(contact => contact.cn_id === action.payload.cn_id) === true ) ? state : [
        ...state,
        contact(null, action)
      ];
    case C.LOAD_CONTACTS:
      return [...state].concat(...action.payload.map(contact =>
        contacts(state, { type: C.ADD_CONTACT, payload: contact })
      ));
    case C.REMOVE_CONTACT:
      return state.filter(contact => contact.cn_id !== action.payload);
    default:
      return state;
  }
};

export const fetching = (state = false, action) => {
  switch (action.type) {
    case C.FETCHING_CONTACTS:
      return true;
    case C.CANCEL_FETCHING:
      return false;
    case C.CHANGE_SUGGESTIONS:
      return false;
    default:
      return state;
  }
};

export const suggestions = (state = [], action) => {
  switch (action.type) {
    case C.CLEAR_SUGGESTIONS:
      return [];
    case C.CHANGE_SUGGESTIONS:
      return action.payload;
    default:
      return state;
  }
};

const singleReducer = combineReducers({
  active,
  contacts,
  errors,
  contactNames: combineReducers({
    fetching,
    suggestions
  })
});

export default singleReducer;
