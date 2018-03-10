import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import LaunchField from './LaunchField';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';


class LaunchForm extends Component {
    renderFields(){
        return _.map(formFields, field => {
            return <Field key={field.name} name={field.name} component={LaunchField} type="text" label={field.label} />
        })
    }

    render() {
        return (<div>
                    <form onSubmit={this.props.handleSubmit(() => this.props.onLaunchSubmit())}>
                        {this.renderFields()}
                        <NavLink
                            to="/get"
                            className="red btn-flat left white-text">
                            Cancel
                        </NavLink>
                        <button 
                            type="submit"
                            className="teal btn-flat right white-text" >
                                Submit
                                <i className="material-icons right">done</i>
                        </button>
                    </form>
                 </div>
    )};
}

function validate(values){
    const errors = {};
    
    //launchName Validations
    if(!values.launchName){
        errors.launchName = 'You must provide launch name';
    }

    //phoneNumber Validations
    if(!values.phoneNumber && values.phoneText){
        errors.phoneNumber = 'You must provide phone number if message body is given';
    }

    //phoneText Validations
    if(!values.phoneText && values.phoneNumber){
        errors.phoneText = 'You must provide message body if phone number is given';
    }
    
    //emailAddress Validations
    if(!values.emailAddress && (values.emailSubject || values.emailBody)){
        errors.emailAddress = 'You must provide email address if email body or subject are given';
    } else if(!validateEmails(values.emailAddress || '') && values.emailAddress){
        errors.emailAddress = 'Invalid email';
    }

    //emailSubject Validations
    if(!values.emailSubject && values.emailAddress){
        errors.emailSubject = 'You must provide email subject if email address is given';
    }

    //emailBody Validations
    if(!values.emailBody && values.emailAddress){
        errors.emailBody = 'You must provide email body if email address is given';
    }

    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'launchForm',
    destroyOnUnmount: false
})(LaunchForm);