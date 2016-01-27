import React from 'react';
import { History } from 'react-router';

const BackButton = React.createClass({
  mixins: [History],
  render() {
    return (
      <div
        className="back"
        onClick={() => this.history.goBack()}
      >
        ＜Back
      </div>
    );
  }
});

export default BackButton;
