import React from 'react';
import ContactList from '../ui/ContactList.jsx';
import test from '../sampleData.json';
import { connect } from 'react-redux';
import { loadContacts } from '../actions';

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  };
};

const Container = connect(mapStateToProps)(ContactList);

export default Container;
// <ContactList contacts={test.contacts} />;
