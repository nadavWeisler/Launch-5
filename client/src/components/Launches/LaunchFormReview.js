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
            <div className="col-md-1">
                <Button bsSize="large" className="navbar-custom" onClick={() => submitLaunch(formValues, history)}>
                    שלח שיגור
                </Button>
            </div>
            
            <div className="col-md-10">
            
            </div>
            <Button bsSize="large" className="navbar-custom" onClick={onCancel}>
                אחורה
            </Button>
            
        </div>
    );
};

function mapStateToProps(state){
    return { formValues: state.form.launchForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(LaunchFormReview));