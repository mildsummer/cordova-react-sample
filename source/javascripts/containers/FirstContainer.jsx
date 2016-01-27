import React from 'react';
import BackButton from '../components/BackButton';

class FirstContainer extends React.Component {
  render() {
    return (
      <div className="page page--1">
        <BackButton />
      </div>
    );
  }
}

FirstContainer.layer = 2;

export default FirstContainer;
