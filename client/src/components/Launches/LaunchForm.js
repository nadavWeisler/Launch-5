import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import LaunchField from './LaunchField';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';
import validatePhone from '../../utils/validatePhone';
import {Button} from 'react-bootstrap';

class LaunchForm extends Component {
    renderFields() {
        return _.map(formFields, ({ name, label, type, componentClass, placeHolder }) => {
          return (
            <div>
              <Field
                key={name}
                component={LaunchField}
                type={type}
                label={label}
                name={name}
                componentClass={componentClass}
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
            <Button>
              <NavLink to="/">
                בטל
              </NavLink>
            </Button>
            <Button type="submit">
              הבא
            </Button>
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
    