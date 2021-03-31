import React, { Component } from 'react';
import { checkEmailAndPhoneDuplicates } from '../validation';

export class HasDuplicates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duplicates: []
    };
  }

  componentDidMount() {
    this.setState({
      duplicates: checkEmailAndPhoneDuplicates()
    });
  }

  render() {
    const { email, phone } = this.props;
    const { duplicates } = this.state;
    return (
      <td>
        {duplicates.includes(email) ? email : ''}
        {duplicates.includes(phone) ? ' ' + phone : ''}
      </td>
    );
  }
}

export default HasDuplicates;
