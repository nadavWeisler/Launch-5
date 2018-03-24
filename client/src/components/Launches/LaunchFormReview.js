import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';
import {withRouter} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const LaunchFormReview = ({onCancel, formValues, submitLaunch, history}) => {
    const reviewFields = _.map(formFields, field => {
        return (
            <div>
                <label key={field.label}>{field.label}</label>
                <div>{formValues[field.name] || '-'}</div>
            </div>
        );
    });
    
    return (
        <div>
            <h3>אשר את בחירתך</h3>
            {reviewFields}
            <Button onClick={onCancel}>
                אחורה
            </Button>
            <Button onClick={() => submitLaunch(formValues, history)}>
                שלח שיגור
            </Button>
        </div>
    );
};

function mapStateToProps(state){
    return { formValues: state.form.launchForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(LaunchFormReview));