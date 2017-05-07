import React from 'react';
import { connect } from 'react-redux';
import ContactSearch from '../ui/ContactSearch.jsx';
import { suggestContactNames } from '../actions';

const suggestions = [
  {
    cn_id: '8-7000',
    name: 'Jabbee'
  },
  {
    cn_id: '8-6236',
    name: 'McDo'
  }
];

const mapStateToProps = (state) => {
  return {
    suggestions: state.contactNames.suggestions,
    fetching: state.contactNames.fetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange(value) {
      dispatch(
        suggestContactNames(value)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactSearch);

/* export default () =>
  <ContactSearch suggestions={suggestions}
                  fetching={false}
                  onChange={value => console.log('todo: suggest', value)} />;*/
