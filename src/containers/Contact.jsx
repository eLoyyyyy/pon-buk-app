import React from 'react';
import Contact from '../ui/Contact.jsx';
import { connect } from 'react-redux';
import { deleteContact } from '../actions';
import { browserHistory } from 'react-router';

import test from '../sampleData.json';

const mapStateToProps = (state, ownProps) => {
  return {
    contact: state.active
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete(value) {
      // console.log('on delete: ', value);
      dispatch( deleteContact( value) );
      browserHistory.push('/contact');
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

/* export default ({ params }) =>
  <Contact contact={ test.contacts.find( contact => contact.cn_id === params.id) } />;*/
