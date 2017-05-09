import React from 'react';
import { Link } from 'react-router';

const Contact = ({ contact }) =>
  <div className="card">
    <div className="card-image">
      <img src="/img/headshot-placeholder.jpg" alt="..." />
      <h4 className="card-title">{ contact.name || '' }</h4>
      <Link to="/contact" className="card-back">
        <i className="fa fa-arrow-left fa-2x fa-fw"></i>
      </Link>
    </div>
    <div className="card-content">
      <ul className="list-group">
        <li className="list-group-item">
          <i className="fa fa-phone fa-2x fa-fw"></i><span className="contact-number">{ contact.contact_number || '' }</span>
        </li>
      </ul>
    </div>
  </div>;

export default Contact;
