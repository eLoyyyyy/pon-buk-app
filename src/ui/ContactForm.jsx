import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.typeTitle = this.typeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.onContact = this.props.onContact;
    this.type = this.props.type;
    this.contact = this.props.contact;

    this.state = {
      _id: '',
      _name: '',
      _contact_number: ''
    };
  }

  componentWillMount() {
    if (this.contact) {
      this.setState({
        _cn_id: this.contact.cn_id,
        _name: this.contact.name,
        _contact_number: this.contact.contact_number
      });
    }
  }

  validate() {
    const contactRegex = /[0-9\-\+]\w+/;
    if (!contactRegex.test(this.state._contact_number)) {
      return false;
    }
    const nameRegex = /^[a-z-A-Z -,.()]*$/;
    if ( !nameRegex.test(this.state._name) ) {
      return false;
    }

    return true;
  }

  onSubmit(e) {
    e.preventDefault();

    const isValid = this.validate();

    if ( isValid === true ) {
      this.setState({ _valid: true });
    }

    if ( isValid ) {
      this.onContact({
        type: this.type,
        cn_id: this.state._cn_id,
        name: this._name.value,
        contact_number: this._contact_number.value
      });
    }
  }

  handleChange(key) {
    return function(e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

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
    return (
      <form onSubmit={this.onSubmit} >
        <div className="navbar navbar-default">
          <button type="submit" className="btn btn-nav">
            <i className="fa fa-check fa-fw">&nbsp;</i>
          </button>
          <span className="navbar-brand non-float">
            {(this.type === null) ? '' : `${this.typeTitle(this.type)} contact`}
          </span>
        </div>

        <div className="input-field">
          <i className="fa fa-user prefix">&nbsp;</i>
          <input
            type="text" placeholder="Name"
            ref={input => this._name = input}
            value={this.state._name}
            onChange={this.handleChange('_name')}
          />
        </div>
        <div className="input-field">
          <i className="fa fa-phone prefix">&nbsp;</i>
          <input
            type="text" placeholder="Contact Number"
            ref={input => this._contact_number = input}
            value={this.state._contact_number}
            onChange={this.handleChange('_contact_number')}
          />
        </div>
      </form>
    );
  }
}

ContactForm.PropTypes = {
  onContact: PropTypes.func,
  type: PropTypes.string,
  contact: PropTypes.shape({
    cn_id: PropTypes.string,
    name: PropTypes.string,
    contact_number: PropTypes.string
  })
};

ContactForm.defaultProps = {
  contact: {
    cn_id: '',
    name: '',
    contact_number: ''
  }
};

export default ContactForm;
