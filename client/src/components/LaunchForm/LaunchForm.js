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
              <Button bsSize="large" className="navbar-custom">
                <NavLink to="/" style={{display: 'block', height: '100%', color:"#FFFFFF"}}>
                  בטל
                </NavLink>
              </Button>  
              <Button bsSize="large" type="submit" className="pull-left navbar-custom" >
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
      if (!values[name] && 
          name !== 'emailBcc' &&
          name !== 'emailCc') {
        errors[name] = 'ערך זה אינו יכול להיות ריק';
      }
    });

    if (!validateEmails(values['emailSender'])){
      errors['emailSender'] = 'דואר אלקטרוני לא תקין';
    }

    if (!validateEmails(values['emailBcc']) && values['emailBcc']){
      errors['emailBcc'] = 'דואר אלקטרוני לא תקין';
    }

    if (!validateEmails(values['emailCc']) && values['emailCc']){
      errors['emailCc'] = 'דואר אלקטרוני לא תקין';
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
    