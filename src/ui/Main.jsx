import React from 'react';

const Main = ({ children }) =>
  <div className="row">
    <div className="half-full">
      <div className="container-fluid">
        { children }
      </div>
    </div>
  </div>;

export default Main;
