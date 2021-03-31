import validator from 'validator';
import usStates from './usStates';

// Validating phone number
// If starts with +1 and 12 symbs that's aaight. If starts with 1 && 11 ints that's also good. If 10 ints that's aaight too.

export const validatePhone = phone => {
  if (
    phone.length === 12 &&
    phone.substring(0, 2) === '+1' &&
    validator.isInt(phone.substring(2, phone.length))
  ) {
    return 'valid';
  } else if (
    phone.length === 11 &&
    phone[0] === '1' &&
    validator.isInt(phone.substring(1, phone.length))
  ) {
    return 'valid';
  } else if (phone.length === 10 && validator.isInt(phone)) {
    return 'valid';
  } else {
    return 'invalid';
  }
};

// Validating email address

export const validateEmail = email => {
  return validator.isEmail(email) ? 'email valid' : 'email invalid';
};

// Validating that the age is an Integer with the minimum value of 21

export const validateAge = age => {
  return validator.isInt(age, { min: 21 }) ? 'valid' : 'invalid';
};

// Validating that the experience is an Integer with the least value of 0 and the biggest of (age - 21)

export const validateExperience = (experience, age) => {
  return validator.isInt(experience, { min: 0, max: age - 21 })
    ? 'valid'
    : 'invalid';
};

// Validating that the number is either an Integer or a Float with the maximum value of a million.

export const validateIncome = income => {
  if (validator.isFloat(income, { min: 0, max: 1_000_000 })) {
    return 'valid';
  } else {
    return 'invalid';
  }
};

// Adding trailing zeros to the number from validateIncome

export const financial = number => {
  if (isNaN(number)) {
    return ' ';
  }
  return '$' + Number.parseFloat(number).toFixed(2);
};

export const validateHasChildren = hasChildren => {
  if (
    hasChildren.toLowerCase() === 'true' ||
    hasChildren.toLowerCase() === 'false' ||
    hasChildren === ''
  ) {
    return 'valid';
  } else {
    return 'invalid';
  }
};

export const validateLicenseStates = licenseStates => {
  // Formatting licenseStates to check if we have the same value in local array from usStates.js
  const formattedLicenseStates = licenseStates
    .toUpperCase()
    .trim()
    .split('|')
    .map(item => item.trim());

  // Iterating and checking whether we have the same value as name or as abbreviations

  for (let obj of usStates) {
    if (formattedLicenseStates.length < 2) {
      if (
        obj.name === formattedLicenseStates[0] ||
        obj.abbreviation === formattedLicenseStates[0]
      )
        return 'valid';
    } else {
      let i = 0;
      while (i < formattedLicenseStates.length) {
        if (Object.values(obj).includes(formattedLicenseStates[i])) {
          if (i === formattedLicenseStates.length - 1) return 'valid';
        }
        i++;
      }
    }
  }
  return 'invalid';
};

// Validating that the date is either in MM/DD/YYY or ISO8601 (YYYY-MM-DD) format

export const validateExpiration = expiration => {
  if (
    (validator.isDate(expiration, { format: 'MM/DD/YYYY' }) ||
      validator.isISO8601(expiration, { strict: true })) &&
    validator.isAfter(expiration)
  ) {
    return 'valid';
  } else {
    return 'invalid';
  }
};

// Validating that the license number has only text and numbers and is 6 characters long

export const validateLicenseNumber = licenseNumber => {
  if (
    validator.isAlphanumeric(licenseNumber) &&
    validator.isLength(licenseNumber, { min: 6, max: 6 })
  ) {
    return 'valid';
  } else {
    return 'invalid';
  }
};

export const checkEmailAndPhoneDuplicates = () => {
  // Creating an array of emails and phone numbers from the table

  const emailElements = document.getElementsByClassName('email');
  const phoneElements = document.getElementsByClassName('phone');
  const emailsAndPhoneNumsArray = [];
  for (let tag of emailElements) {
    emailsAndPhoneNumsArray.push(tag.outerText.toLowerCase());
  }
  for (let tag of phoneElements) {
    emailsAndPhoneNumsArray.push(tag.outerText.toLowerCase());
  }

  const findDuplicates = arr => {
    let sorted_arr = arr.slice().sort();
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] === sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  };
  return findDuplicates(emailsAndPhoneNumsArray);
};

export const checkRequiredFields = () => {
  const nameElements = document.getElementsByClassName('full-name');
  const phoneElements = document.getElementsByClassName('phone');
  const emailElements = document.getElementsByClassName('email');
  const table = document.getElementById('table');

  if (
    nameElements.length > 0 ||
    phoneElements.length > 0 ||
    emailElements.length > 0
  ) {
    for (let tag of nameElements) {
      if (tag.outerText === '') {
        table.style.display = 'none';
        return true;
      }
    }
    for (let tag of phoneElements) {
      if (tag.outerText === '') {
        table.style.display = 'none';
        return true;
      }
    }
    for (let tag of emailElements) {
      if (tag.outerText === '') {
        table.style.display = 'none';
        return true;
      }
    }
  }
  if (table) {
    table.style.display = 'table';
  }
  return false;
};
