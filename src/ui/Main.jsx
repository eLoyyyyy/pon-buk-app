import React, { Component } from 'react';

class Main extends Component {

  componentDidMount() {
    // this.props.loadContacts();
  }

  render() {
    const { children } = this.props;

    return (
      <div className="row">
        <div className="half-full">
          <div className="container-fluid">
            { children }
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
