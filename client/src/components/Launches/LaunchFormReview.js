import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';
import {withRouter} from 'react-router-dom';

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
            <h5>אשר את בחירתך</h5>
            {reviewFields}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}>
                אחורה
            </button>
            <button onClick={() => submitLaunch(formValues, history)}
                className="green btn-flat left white-text">
                    שלח שיגור
            </button>
        </div>
    );
};

function mapStateToProps(state){
    return { formValues: state.form.launchForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(LaunchFormReview));