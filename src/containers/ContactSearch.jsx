import React from 'react';
import { connect } from 'react-redux';
import ContactSearch from '../ui/ContactSearch.jsx';
import { suggestContactNames, fetchContact } from '../actions';

const mapStateToProps = (state) => {
  return {
    suggestions: state.contactNames.suggestions,
    fetching: state.contactNames.fetching
  };
};

const mapDispatchToProps = dispatch =>
({
  onChange(value) {
    dispatch(
      suggestContactNames(value)
    );
  },
  navigateTo(value) {
    dispatch(
      fetchContact(value)
    );
    // console.log(value);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactSearch);

/* export default () =>
  <ContactSearch suggestions={suggestions}
                  fetching={false}
                  onChange={value => console.log('todo: suggest', value)} />;*/
