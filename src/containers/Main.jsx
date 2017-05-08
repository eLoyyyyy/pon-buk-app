import React from 'react';
import { connect } from 'react-redux';
import { loadContacts } from '../actions';

import Main from '../ui/Main.jsx';

const mapDispatchToProps = (dispatch) => {
  return {
    loadContacts() {
      dispatch(
        loadContacts()
      );
    }
  };
};

export default connect(null, mapDispatchToProps)(Main);
