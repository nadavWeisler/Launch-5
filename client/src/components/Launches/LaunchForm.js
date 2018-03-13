import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import LaunchField from './LaunchField';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';

class LaunchForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
          return (
            <Field
              key={name}
              component={LaunchField}
              type="text"
              label={label}
              name={name}
            />
          );
        });
      }

      render() {
        return (
          <div>
            <form onSubmit={this.props.handleSubmit(this.props.onLaunchSubmit)}>
              {this.renderFields()}
              <NavLink to="/" className="red btn-flat white-text">
                Cancel
              </NavLink>
              <button type="submit" className="teal btn-flat right white-text">
                Next
                <i className="material-icons right">done</i>
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
        errors[name] = 'You must provide a value';
      }
    });

    if (!validateEmails(values['emailSender'])){
        errors['emailSender'] = 'Invalid email';
    }
  
    return errors;
  }
  
  export default reduxForm({
    validate,
    form: 'launchForm',
    destroyOnUnmount: false
  })(LaunchForm);