import React from 'react';
import ContactList from '../ui/ContactList.jsx';
import test from '../sampleData.json';

export default () =>
  <ContactList contacts={test.contacts} />;
