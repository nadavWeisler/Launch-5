import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import LaunchField from './LaunchField';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';
import validatePhone from '../../utils/validatePhone';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import * as actions from './../../actions';
import {connect} from 'react-redux';
import editFields from './editFields';
import {withRouter} from 'react-router-dom';

class LaunchEdit extends Component {
  componentDidUpdate() {
    this.props.fetchCurrentLaunch(this.props.launchId);
  }

  renderFields() {
      editFields[0]['text'] = this.props.currentLaunch.desc;
      editFields[1]['text'] = this.props.currentLaunch.messageBody;
      editFields[2]['text'] = this.props.currentLaunch.emailSubject;
      editFields[3]['text'] = this.props.currentLaunch.emailBody;
      return _.map(editFields, ({ name, label, type, text, componentClass }) => {
        return (
          <div>
            <Field     
              key={name}
              component={LaunchField}
              type={type}
              label={label}
              name={name}
              text={text}
              componentClass={componentClass}
            />
          </div>
        );
      });
  }

  sendToEditLaunch(){
    this.props.editFormValues['launchId'] = this.props.launchId;
    this.props.editLaunch(this.props.editFormValues);
  }

  renderContent(){
    switch(this.props.currentLaunch){
      case null:
        return <p>none</p>
      case false:
        return <p>false</p>
      default:
        return (
          <form>
            {this.renderFields()}
            <Button bsSize="large" className="navbar-custom" onClick={this.props.handleClearEdit}>
                בטל
            </Button>
            <Button bsSize="large" className="navbar-custom pull-left"
                 onClick={() => this.sendToEditLaunch()}
            >
                עדכן
            </Button>
          </form>
        )
    }
  }
  render() {
    return (
        <Modal
          isOpen={!!this.props.launchId}
          launchId={this.props.launchId}
        >
        <div dir="rtl">
          {this.renderContent()}
        </div>
        </Modal>
      );
  } 

}

function mapStateToProps(state){
  return {
    currentLaunch: state.currentLaunch,
    editFormValues: state.form.editLaunchForm.values
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
  form: 'editLaunchForm',
    })(connect(mapStateToProps, actions)(withRouter((LaunchEdit))));  
    