import fetch from 'isomorphic-fetch';
import C from './constants';
import { browserHistory } from 'react-router';

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



export const fetchContact = id => (dispatch) => {
  fetch(`http://localhost:3000/api/users/${id}`)
    .then(res => res.json())
    .then((response) => {
      dispatch({
        type: C.FETCH_CONTACT,
        payload: response.contact
      });
      browserHistory.push(`/contact/${response.contact.cn_id}`);
    }).catch( (error) => {
      dispatch(
        addError(error.message)
      );
    });
};

export const addContact = ( name, contactNumber ) => (dispatch) => {
  fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      contact_number: contactNumber
    })
  })
  .then(res => res.json())
  .then((response) => {
    dispatch({
      type: C.ADD_CONTACT,
      payload: {
        cn_id: response.newId,
        name,
        contact_number: contactNumber
      }
    });
    return fetch(`http://localhost:3000/api/users/${response.newId}`);
  })
  .then(res => res.json())
  .then((response) => {
    dispatch({
      type: C.FETCH_CONTACT,
      payload: response.contact
    });
    browserHistory.push(`/contact/${response.contact.cn_id}`);
  })
  .catch( (error) => {
    dispatch(
      addError(error.message)
    );
  });
};

export const editContact = ( id, name, contactNumber ) => (dispatch) => {
  fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      contact_number: contactNumber
    })
  })
  .then(res => res.json())
  .then((response) => {
    dispatch({
      type: C.REMOVE_CONTACT,
      payload: id
    });
    dispatch({
      type: C.ADD_CONTACT,
      payload: {
        cn_id: id,
        name,
        contact_number: contactNumber
      }
    });
    return fetch(`http://localhost:3000/api/users/${id}`);
  })
  .then(res => res.json())
  .then((response) => {
    dispatch({
      type: C.FETCH_CONTACT,
      payload: response.contact
    });
    browserHistory.push(`/contact/${response.contact.cn_id}`);
  })
  .catch( (error) => {
    dispatch(
      addError(error.message)
    );
  });
};

export const deleteContact = id => (dispatch) => {
  fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then((response) => {
      dispatch({
        type: C.REMOVE_CONTACT,
        payload: id
      });
    })
    .catch( (error) => {
      dispatch(
        addError(error.message)
      );
    });
};
