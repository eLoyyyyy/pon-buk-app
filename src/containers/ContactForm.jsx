import React from 'react';
import { connect } from 'react-redux';
import { fetchContact, addContact, editContact } from '../actions';
import ContactForm from '../ui/ContactForm.jsx';

import test from '../sampleData.json';

const mapStateToProps = (state, ownProps) => {
  return {
    type: ownProps.route.name,
    contact: (ownProps.route.name === 'edit') ? state.active : null
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
          // console.log('on submit: ', JSON.stringify(value));
          dispatch(
            editContact( value.cn_id, value.name, value.contact_number )
          );
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
