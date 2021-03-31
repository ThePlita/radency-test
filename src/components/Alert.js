import React, { Component } from 'react';

export class Alert extends Component {
 

  render() {
     const { text } = this.props;
    return <div className="alert">{text}</div>;
  }
}

export default Alert;
