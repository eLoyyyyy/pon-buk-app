import React from 'react';
import ContactList from '../ui/ContactList.jsx';
import test from '../sampleData.json';
import { connect } from 'react-redux';
import { fetchContact } from '../actions';

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigateTo(value) {
      dispatch(
        fetchContact(value)
      );
      // console.log(value);
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(ContactList);

export default Container;
// <ContactList contacts={test.contacts} />;
