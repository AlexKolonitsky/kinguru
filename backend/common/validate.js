// jscs:disable maximumLineLength
'use strict';

const _isEmpty = require('lodash/isEmpty');

/**
 * @constant
 * @type {RegExp} emailRegex - for email validation
 */

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const positiveIntegerReqex = /^\d+$/i;

/**
 * @function fieldExist - verify if field exists; value, that incomes as 0 - should be valid
 * @param {string} key
 * @param {*} value
 * @returns {string|undefined} - string means error, undefined - field exists
 */

function fieldExist(key, value) {
  if (_isEmpty(value) && typeof value !== 'number') {
    return `'${key}' field is required`;
  }
}

/**
 * @function validateRegexp - check regexp value
 * @param {string} key
 * @param {string} value
 * @param {RegExp} regexp
 * @returns {string|undefined} - string means error, undefined - field exists
 */
function validateRegexp(key, value, regexp) {
  if (!regexp.test(value)) {
    return `${key} with value ${value} doesn't match regexp`;
  }
}

/**
 * @function validateEmail - check for regexp and existence
 * @param {string} email
 * @returns {Array.<string|undefined>} - string means error, undefined - field is right
 */
function validateEmail(email) {
  return [
    fieldExist('email', email),
    validateRegexp('email', email, emailRegex),
  ];
}

/**
 * @function validatePositiveNumber - check for positive integer value
 * @param {string} key
 * @param {string} value
 * @returns {string|undefined} - string means error, undefined - field is right
 */
function validatePositiveNumber(key, value) {

  return validateRegexp(key, value, positiveIntegerReqex);
}

/**
 * @function isIncludeValue - check if incoming value exists in available values
 * @param {string} currentValue
 * @param {Array.<string>} possibleValues
 * @returns {string}
 */
function isIncludeValue(currentValue, possibleValues) {

  if (!currentValue || !possibleValues.includes(currentValue)) {
    return `There isn't value ${currentValue} in suggested list`;
  }
}

module.exports = {
  fieldExist,
  validateEmail,
  validatePositiveNumber,
  isIncludeValue,
};