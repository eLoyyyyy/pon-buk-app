import React from 'react';
import Contact from '../ui/Contact.jsx';

import test from '../sampleData.json';

export default ({ params }) =>
  <Contact contact={ test.contacts.find( contact => contact.cn_id === params.id) } />;
