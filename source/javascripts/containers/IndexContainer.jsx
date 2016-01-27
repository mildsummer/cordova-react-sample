import React from 'react';
import { Link } from 'react-router';

class IndexContainer extends React.Component {
  render() {
    return (
      <div className="page">
        <Link className="link link--1" to="/first"></Link>
        <Link className="link link--2" to="/second"></Link>
      </div>
    );
  }
}

IndexContainer.layer = 1;

export default IndexContainer;
