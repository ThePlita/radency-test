import React, { Component } from 'react';
import {
  FULLNAME,
  PHONE,
  EMAIL,
  AGE,
  EXPERIENCE,
  YEARLY_INCOME,
  HAS_CHILDREN,
  LICENSE_STATES,
  EXPIRATION_DATE,
  LICENSE_NUMBER
} from './constants';
import {
  validatePhone,
  validateEmail,
  validateAge,
  validateExperience,
  validateIncome,
  financial,
  validateHasChildren,
  validateExpiration,
  validateLicenseNumber,
  checkEmailAndPhoneDuplicates,
  checkRequiredFields
} from '../validation';
import Alert from './Alert';
import HasDuplicates from './HasDuplicates';
import LicenseStates from './LicenseStates';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areFieldsEmpty: false,
      arrayOfDuplicates: [],
      wrongFormatNumber: 1
    };
  }

  componentDidMount() {
    this.setState({
      areFieldsEmpty: checkRequiredFields(),
      arrayOfDuplicates: checkEmailAndPhoneDuplicates(),
      wrongFormatNumber: document.getElementsByClassName('invalid').length
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.wrongFormatNumber !==
        document.getElementsByClassName('invalid').length ||
      prevState.areFieldsEmpty !== checkRequiredFields()
    )
      this.setState({
        areFieldsEmpty: checkRequiredFields(),
        arrayOfDuplicates: checkEmailAndPhoneDuplicates(),
        wrongFormatNumber: document.getElementsByClassName('invalid').length
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.wrongFormatNumber !==
        document.getElementsByClassName('invalid').length ||
      nextState.areFieldsEmpty !== checkRequiredFields() ||
      nextState.arrayOfDuplicates !== checkEmailAndPhoneDuplicates()
    ) {
      return true;
    }
    return false;
  }
  render() {
    // DESTRUCTURING
    const { result } = this.props;

    // TITLES ARRAY FOR CLASS NAMES
    const titles = [];

    // COUNTER FOR ID FIELD
    let counter = 1;

    // POPULATING THE CLASS NAMES THAT HAVE THE SAME NAME AS THE FIRST ROW CELLS
    if (result.length > 0) {
      for (let title of result[0].data) {
        titles.push(title.toLowerCase().replace(' ', '-'));
      }
    }

    // RETURNING THE TABLE ONLY IF WE HAVE THE RESULTS
    console.log(this.state.areFieldsEmpty + ' arefieldsempty from state');
    if (result.length > 0 && !this.state.areFieldsEmpty) {
      return (
        <>
          <table id="table">
            <tbody>
              {/* MAPPING THROUGH PROPS (OBJECTS OF ROWS) */}
              {result.map((row, index) => {
                // VALIDATING EVERYTHING EXCEPT THE FIRST ROW
                if (index > 0) {
                  return (
                    <tr key={index}>
                      {/* ID */}
                      <td>{counter++}</td>

                      {/* FULL-NAME */}
                      <td className="full-name">{row.data[FULLNAME]}</td>

                      {/* PHONE NUMBER */}
                      <td className={'phone ' + validatePhone(row.data[PHONE])}>
                        {row.data[PHONE].length === 10 &&
                        validatePhone(row.data[PHONE]) === 'valid'
                          ? '+1' + row.data[PHONE]
                          : row.data[PHONE]}
                      </td>

                      {/* EMAIL ADRESS */}
                      <td className={'email ' + validateEmail(row.data[EMAIL])}>
                        {row.data[EMAIL]}
                      </td>

                      {/* AGE */}
                      <td className={validateAge(row.data[AGE])}>
                        {row.data[AGE]}
                      </td>

                      {/* EXPERIENCE */}
                      <td
                        className={validateExperience(
                          row.data[EXPERIENCE],
                          row.data[AGE]
                        )}
                      >
                        {row.data[EXPERIENCE]}
                      </td>

                      {/* YEARLY INCOME */}
                      <td className={validateIncome(row.data[YEARLY_INCOME])}>
                        {financial(row.data[YEARLY_INCOME])}
                      </td>

                      {/* HAS CHILDREN */}
                      <td
                        className={validateHasChildren(row.data[HAS_CHILDREN])}
                      >
                        {row.data[HAS_CHILDREN] === ''
                          ? 'FALSE'
                          : row.data[HAS_CHILDREN]}
                      </td>

                      {/* LICENSE STATES */}
                      <LicenseStates USAstate={row.data[LICENSE_STATES]} />

                      {/* EXPIRATION DATE */}
                      <td
                        className={validateExpiration(
                          row.data[EXPIRATION_DATE]
                        )}
                      >
                        {row.data[EXPIRATION_DATE]}
                      </td>

                      {/* LICENSE NUMBER */}
                      <td
                        className={validateLicenseNumber(
                          row.data[LICENSE_NUMBER]
                        )}
                      >
                        {row.data[LICENSE_NUMBER]}
                      </td>

                      {/* HAS DUPLICATES. We're checking if the row contains duplicated elements. If yes, we print these elements*/}
                      <HasDuplicates
                        email={row.data[EMAIL]}
                        phone={row.data[PHONE]}
                      />
                    </tr>
                  );
                } else {
                  return (
                    // THE FIRST ROW SHOULD NOT BE CHECKED
                    <tr key={index} className={'title-row' + index}>
                      <td>ID</td>
                      <td>{row.data[FULLNAME]}</td>
                      <td>{row.data[PHONE]}</td>
                      <td>{row.data[EMAIL]}</td>
                      <td>{row.data[AGE]}</td>
                      <td>{row.data[EXPERIENCE]}</td>
                      <td>{row.data[YEARLY_INCOME]}</td>
                      <td>{row.data[HAS_CHILDREN]}</td>
                      <td>{row.data[LICENSE_STATES]}</td>
                      <td>{row.data[EXPIRATION_DATE]}</td>
                      <td>{row.data[LICENSE_NUMBER]}</td>
                      <td>Has Duplicates</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
          {this.state.wrongFormatNumber > 0 ? <Alert /> : null}
        </>
      );
    } else if (this.state.areFieldsEmpty) {
      return <Alert />;
    } else {
      return <></>;
    }
  }
}

export default DataTable;
