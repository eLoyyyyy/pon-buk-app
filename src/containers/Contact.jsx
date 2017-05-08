import React from 'react';
import Contact from '../ui/Contact.jsx';
import { connect } from 'react-redux';

import test from '../sampleData.json';

const mapStateToProps = (state, ownProps) => {
  console.log(state.contacts);
  return {
    contacts: state.contacts.find( contact => contact.cn_id === ownProps.params.id)
  };
};

export default connect(mapStateToProps)(Contact);

/* export default ({ params }) =>
  <Contact contact={ test.contacts.find( contact => contact.cn_id === params.id) } />;*/
