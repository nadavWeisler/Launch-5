import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import LaunchField from './LaunchField';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';
import validatePhone from '../../utils/validatePhone';

class LaunchForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name, type }) => {
          return (
            <div>
              <Field
                key={name}
                component={LaunchField}
                type={type}
                label={label}
                name={name}
              />
            </div>
          );
        });
    }

    render() {
      return (
        <div>
          <form onSubmit={this.props.handleSubmit(this.props.onLaunchSubmit)}>
            {this.renderFields()}
            <NavLink to="/" className="red btn-flat white-text">
              בטל
            </NavLink>
            <button type="submit" className="teal btn-flat left white-text">
              הבא
              <i className="material-icons left">done</i>
            </button>
          </form>
        </div>
      );
    }   
  }

function validate(values) {
    const errors = {};
  
    _.each(formFields, ({ name }) => {
      if (!values[name]) {
        errors[name] = 'ערך זה אינו יכול להיות ריק';
      }
    });

    if (!validateEmails(values['emailSender'])){
      errors['emailSender'] = 'דואר אלקטרוני לא תקין';
  }

    if (!validatePhone(values['phoneNumber'])){
        errors['phoneNumber'] = 'מספר נייד לא תקין';
    }
  
    return errors;
}
  

export default reduxForm({
    validate,
    form: 'launchForm',
    destroyOnUnmount: false
    })(LaunchForm);