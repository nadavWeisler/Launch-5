import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import EditLaunchField from './EditLaunchField';
import _ from 'lodash';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import * as actions from './../../actions';
import {connect} from 'react-redux';
import editFields from './editFields';

class LaunchEdit extends Component {
  componentDidUpdate() {
    this.props.fetchCurrentLaunch(this.props.launchId);
  }

  renderFields() {
      editFields[0]['text'] = this.props.currentLaunch.desc;
      editFields[1]['text'] = this.props.currentLaunch.messageBody;
      //editFields[2]['text'] = this.props.currentLaunch.emailSubject;
      //editFields[3]['text'] = this.props.currentLaunch.emailBody;
      return _.map(editFields, ({ name, label, type, text, componentClass }) => {
        return (
          <div>
            <Field     
              key={name}
              component={EditLaunchField}
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
    if(this.props.editFormValues){
      if(Object.keys(this.props.editFormValues).length < 4){
        alert("לא כל הערכים מלאים")
      } else {    
        this.props.editFormValues['launchId'] = this.props.launchId;
        this.props.editLaunch(this.props.editFormValues);
        window.location.reload();
      }
    } else {
      alert("לא כל הערכים מלאים")
    }
  }

  renderContent(){
    switch(this.props.currentLaunch){
      case null:
        return <h1>טוען עריכת שיגור</h1>

      case false:
        return (
          <div>
            <h1>אירעה תקלה, נסי שנית מאוחר יותר</h1>
            <Button onClick={this.props.handleClearEdit}>יציאה</Button>
          </div>
        )

      default:
        return (
          <form>
            <h1>{"עריכת שיגור - " + this.props.currentLaunch.name}</h1>
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
  
  _.each(editFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'ערך זה אינו יכול להיות ריק';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'editLaunchForm',
    })(connect(mapStateToProps, actions)(LaunchEdit));  
    