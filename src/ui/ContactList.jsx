import React from 'react';
import ContactListNav from '../ContactListNav.jsx';

const ContactList = ({ contacts }) =>
  <div>
    <ContactListNav />
    <div className="list-group">
      {contacts.map(contact =>
        <a href={`/contact/${contact.cn_id}`} key={contact.cn_id} className="list-group-item">{contact.name}</a>
      )}
    </div>
  </div>;

export default ContactList;
