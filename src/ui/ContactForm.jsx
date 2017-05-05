import React, { Component } from 'react';

class ContactForm extends Component {

  typeTitle(type) {
    switch (type) {
      case 'add':
        return 'Add new';
      case 'edit':
        return 'Edit';
      default:
        return null;
    }
  }

  render() {
    const { onChange = f => f, type = null, contact = {} } = this.props;

    return (
      <form>
        <div className="navbar navbar-default">
          <button type="submit" className="btn btn-nav">
            <i className="fa fa-check fa-fw"></i>
          </button>
          <span className="navbar-brand non-float">{(type === null) ? '' : `${this.typeTitle(type)} contact`}</span>
        </div>

        <div className="input-field">
          <i className="fa fa-user prefix"></i>
          <input type="text" placeholder="Name" onChange={onChange} value={contact.name || ''} />
        </div>
        <div className="input-field">
          <i className="fa fa-phone prefix"></i>
          <input type="text" placeholder="Contact Number" onChange={onChange} value={contact.contact_number || ''}/>
        </div>
      </form>
    );
  }
}

export default ContactForm;
