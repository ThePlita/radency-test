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
import equal from 'fast-deep-equal/react';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areFieldsEmpty: false,
      arrayOfDuplicates: [],
      wrongFormatNumber: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.areFieldsEmpty === false &&
      this.state.arrayOfDuplicates.length === 0 &&
      this.state.wrongFormatNumber === 0
    ) {
      this.setState({
        wrongFormatNumber: document.getElementsByClassName('invalid').length,
        areFieldsEmpty: checkRequiredFields(),
        arrayOfDuplicates: checkEmailAndPhoneDuplicates()
      });
    }

    const objectComparisonArray = prevProps.result.map((item, index) =>
      equal(item, this.props.result[index]) ? 'true' : 'false'
    );
    if (objectComparisonArray.includes('false')) {
      this.setState({
        wrongFormatNumber: document.getElementsByClassName('invalid').length,
        areFieldsEmpty: checkRequiredFields(),
        arrayOfDuplicates: checkEmailAndPhoneDuplicates()
      });
    }
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
          {this.state.wrongFormatNumber > 0 ? (
            <Alert text="File formatting is incorrect. Please double-check the highlighted fields and/or duplicates" />
          ) : null}
        </>
      );
    } else if (this.state.areFieldsEmpty) {
      return (
        <Alert text="The file's format is incorrect. Name, phone or email field are missing. Please try again." />
      );
    } else {
      return <></>;
    }
  }
}

export default DataTable;
