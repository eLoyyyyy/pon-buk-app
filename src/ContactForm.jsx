import React from 'react';

const ContactForm = ({ route, params }) =>
  <div className="page-header">
    <h1>Contact Form {route.name}: {params.id}</h1>
    <div className="input-group">
      <a className="input-group-addon" href="/">@</span>
      <input type="text" className="form-control" placeholder="Username" aria-describedby="sizing-addon1" />
    </div>
  </div>;

export default ContactForm;
