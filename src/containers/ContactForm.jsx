import React from 'react';
import ContactForm from '../ui/ContactForm.jsx';

import test from '../sampleData.json';

const handleChange = key => (e) => {
  const state = {};
  state[key] = e.target.value;
  console.log(state);
};

export default ({ route, contact, params }) =>
  <ContactForm onChange={handleChange}
                type={route.name}
                contact={ test.contacts.find( contact => contact.cn_id === params.id) } />;
