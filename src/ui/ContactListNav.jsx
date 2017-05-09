import React from 'react';
import { Link } from 'react-router';

const ContactListNav = () =>
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link to="/contact" className="navbar-brand">
          Contacts
        </Link>
      </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/contact/new">
              <i className="fa fa-plus" aria-hidden="true">&nbsp;</i>
            </Link>
          </li>
          <li>
            <Link to="/contact/search">
              <i className="fa fa-search" aria-hidden="true">&nbsp;</i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>;

export default ContactListNav;
