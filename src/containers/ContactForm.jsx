import React from 'react';
import { connect } from 'react-redux';
import { fetchContact, addContact } from '../actions';
import ContactForm from '../ui/ContactForm.jsx';

import test from '../sampleData.json';

const mapStateToProps = (state, ownProps) => {
  return {
    type: ownProps.route.name,
    contact: state.active
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onContact(value) {
      switch (value.type) {
        case 'add':
          dispatch(
            addContact( value.name, value.contact_number )
          );
          break;
        case 'edit':
          console.log('on submit: ', JSON.stringify(value));
          break;
        default:
          console.log('idk wtf to do with this.');
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

/* export default ({ route, contact, params }) =>
  <ContactForm onContact={value => console.log('on submit: ', JSON.stringify(value))}
                type={route.name}
                contact={ test.contacts.find( contact => contact.cn_id === params.id) } />;*/
