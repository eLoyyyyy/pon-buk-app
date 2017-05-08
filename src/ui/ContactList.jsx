import React, { Component } from 'react';
import ContactListNav from './ContactListNav.jsx';

class ContactList extends Component {

  render() {
    const { contacts } = this.props;

    return (
      <div>
        <ContactListNav />
        <div className="list-group">
          {contacts.map(contact =>
            <a href={`/contact/${contact.cn_id}`} key={contact.cn_id} className="list-group-item">{contact.name}</a>
          )}
        </div>
      </div>
    );
  }
}

export default ContactList;
