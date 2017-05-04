import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  browserHistory,
  IndexRedirect
} from 'react-router';


import Main from './Main.jsx';
import ContactList from './containers/ContactList.jsx';
import Contact from './containers/Contact.jsx';
import ContactSearch from './ContactSearch.jsx';
import ContactForm from './ContactForm.jsx';

const App = () =>
  <Router history={browserHistory}>
    <div>
      <Route path="/" component={Main}>
        <IndexRedirect to="contact" />
        <Route path="contact" component={ContactList} />
        <Route path="contact/new" name="add" component={ContactForm} />
        <Route path="contact/search" component={ContactSearch} />
        <Route path="contact/:id" component={Contact} />
        <Route path="contact/:id/edit" name="edit" component={ContactForm} />
      </Route>
    </div>
  </Router>;

export default App;
