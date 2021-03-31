import React, { Component } from 'react';

export class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert:
        "The file's format is incorrect. Name, phone or email field are missing. Please try again."
    };
  }

  componentDidMount() {
    if (document.getElementsByClassName('invalid').length > 0) {
      this.setState({
        alert:
          'File formatting is incorrect. Please double-check the highlighted fields and/or duplicates'
      });
    }
  }

  render() {
    return <div className="alert">{this.state.alert}</div>;
  }
}

export default Alert;
