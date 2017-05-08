import React from 'react';
import ContactForm from '../ui/ContactForm.jsx';

import test from '../sampleData.json';

export default ({ route, contact, params }) =>
  <ContactForm onNewContact={value => console.log('on submit: ', JSON.stringify(value))}
                type={route.name}
                contact={ test.contacts.find( contact => contact.cn_id === params.id) } />;
