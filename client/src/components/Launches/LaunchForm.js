import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import LaunchField from './LaunchField';
import _ from 'lodash';

const FIELDS = [
    { label: 'Name', name: 'launchName' },
    { label: 'Phone Number', name: 'phoneNumber' },
    { label: 'Message body', name: 'phoneText'},
    { label: 'Email address', name: "emailAddress"},
    { label: 'Email subject', name: "emailSubject"},
    { label: 'Email body', name: "emailBody"}
];

class LaunchForm extends Component {
    renderFields(){
        return _.map(FIELDS, field => {
            return <Field component={LaunchField} type="text" label={field.label} />
        })
    }

  render() {
    return (<div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <button type="submit">Submit</button>
                 </form>
            </div>
        )};
}

export default reduxForm({
    form: 'launchForm'
})(LaunchForm);