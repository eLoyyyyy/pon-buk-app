import React, { Component } from 'react';

class ContactForm extends Component {

  render() {
    let _name, _contact_number;

    const { onNewContact = f => f, type = null, contact = {} } = this.props;

    const typeTitle = (type) => {
      switch (type) {
        case 'add':
          return 'Add new';
        case 'edit':
          return 'Edit';
        default:
          return null;
      }
    };

    const onSubmit = (e) => {
      e.preventDefault();

      onNewContact({
        name: _name.value,
        contact_number: _contact_number.value
      });
    };

    return (
      <form onSubmit={onSubmit} >
        <div className="navbar navbar-default">
          <button type="submit" className="btn btn-nav">
            <i className="fa fa-check fa-fw">&nbsp;</i>
          </button>
          <span className="navbar-brand non-float">{(type === null) ? '' : `${typeTitle(type)} contact`}</span>
        </div>

        <div className="input-field">
          <i className="fa fa-user prefix">&nbsp;</i>
          <input type="text" placeholder="Name" ref={input => _name = input} />
        </div>
        <div className="input-field">
          <i className="fa fa-phone prefix">&nbsp;</i>
          <input type="text" placeholder="Contact Number" ref={input => _contact_number = input} />
        </div>
      </form>
    );
  }
}

export default ContactForm;
