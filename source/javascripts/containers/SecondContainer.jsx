import React from 'react';
import BackButton from '../components/BackButton';

class SecondContainer extends React.Component {
  render() {
    return (
      <div className="page page--2">
        <BackButton />
      </div>
    );
  }
}

SecondContainer.layer = 2;

export default SecondContainer;
