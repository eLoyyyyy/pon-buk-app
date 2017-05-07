import fetch from 'isomorphic-fetch';
import C from './constants';

export function addContact( cnId, name, contactNumber ) {
  return {
    type: C.ADD_CONTACT,
    payload: { cn_id: cnId + 1, name, contact_number: contactNumber }
  };
}

export const removeContact = contactID => ({
  type: C.REMOVE_CONTACT,
  payload: contactID
});

export const addError = error => ({
  type: C.ADD_ERROR,
  payload: error
});

export const clearError = index => ({
  type: C.CLEAR_ERROR,
  payload: index
});

export const changeSuggestions = suggestions => ({
  type: C.CHANGE_SUGGESTIONS,
  payload: suggestions
});

export const clearSuggestions = () => ({
  type: C.CLEAR_SUGGESTIONS
});

export const randomGoals = () => (dispatch, getState) => {
  if ( !getState().contactNames.fetching ) {
    dispatch({
      type: C.FETCHING_CONTACTS
    });

    setTimeout(() => {
      dispatch({
        type: C.CANCEL_FETCHING
      });
    }, 1500);
  }
};

/* to use thunks, the action functions will have another function which
I can get dispatch method and getState */

export const suggestContactNames = value => (dispatch) => {
  dispatch({
    type: C.FETCHING_CONTACTS
  });
  fetch(`http://localhost:3000/api/users/search/${value}`)
    .then(res => res.json())
    .then((suggestions) => {
      dispatch({
        type: C.CHANGE_SUGGESTIONS,
        payload: suggestions
      });
      console.log(suggestions);
    }).catch( (error) => {
      dispatch(
        addError(error.message)
      );
      dispatch({
        type: C.CANCEL_FETCHING
      });
    });

};

export const loadContacts = () => (dispatch) => {
  fetch('http://localhost:3000/api/users')
    .then(res => res.json())
    .then((response) => {
      dispatch({
        type: C.LOAD_CONTACTS,
        payload: response.contacts
      });
    }).catch( (error) => {
      dispatch(
        addError(error.message)
      );
    });
};
