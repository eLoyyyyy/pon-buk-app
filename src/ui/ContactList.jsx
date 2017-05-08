import React, { Component } from 'react';
import ContactListNav from './ContactListNav.jsx';

class ContactList extends Component {

  render() {
    const { contacts, navigateTo = f => f } = this.props;

    return (
      <div>
        <ContactListNav />
        <div className="list-group">
          {contacts.map(contact =>
            <a onClick={() => navigateTo(contact.cn_id)} key={contact.cn_id} className="list-group-item">{contact.name}</a>
          )}
        </div>
      </div>
    );
  }
}

export default ContactList;
