import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';
import {withRouter} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import './LaunchForm.css';

function getDisplayText(text){
    if(text){
        return text.replace("\n", "<br/>");
    } else {
        return text;
    }
}

const LaunchFormReview = ({onCancel, formValues, submitLaunch, history}) => {
    const reviewFields = _.map(formFields, field => {
        return (
            <div>
                <label key={field.label}>{field.label}</label>
                <p>{formValues[field.name] || '-'}</p>
            </div>
        );
    });
    
    return (
        <div>
            <h3>אשר את בחירתך</h3>
            {reviewFields}
            <Button bsSize="large" className="navbar-custom" onClick={onCancel}>
                אחורה
            </Button>
            <Button bsSize="large" className="navbar-custom"
                 onClick={() => submitLaunch(formValues, history)}>
                שלח שיגור
            </Button>
        </div>
    );
};

function mapStateToProps(state){
    return { 
        formValues: state.form.launchForm.values,
        showAlert: false
    }
}

export default connect(mapStateToProps, actions)(withRouter(LaunchFormReview));