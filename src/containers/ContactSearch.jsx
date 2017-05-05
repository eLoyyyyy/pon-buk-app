import React from 'react';
import ContactSearch from '../ui/ContactSearch.jsx';

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

export default () =>
  <ContactSearch suggestions={suggestions}
                  fetching={false}
                  onChange={() => console.log('todo: suggest')} />;
