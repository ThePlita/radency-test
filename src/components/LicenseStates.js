import React, { Component } from 'react';
import { validateLicenseStates } from '../validation';
import usStates from '../usStates';

export class LicenseStates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validString: ''
    };
  }

  componentDidMount() {
    this.setState({
      validString: validateLicenseStates(this.props.USAstate)
    });
  }
  render() {
    const { USAstate } = this.props;
    const { validString } = this.state;
    return (
      <td className={validateLicenseStates(USAstate)}>
        {validString === 'valid' &&
        USAstate.toUpperCase()
          .trim()
          .split('|')
          .map(item => item.trim()).length < 2
          ? usStates.map(item =>
              item.name === USAstate.toUpperCase() ||
              item.abbreviation === USAstate.toUpperCase()
                ? item.abbreviation
                : ''
            )
          : USAstate}
      </td>
    );
  }
}

export default LicenseStates;
