import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';

const LaunchFormReview = ({onCancel, formValues}) => {
    const reviewFields = _.map(formFields, field => {
        return (
            <div>
                <label>{field.label}</label>
                <div>{formValues[field.name] || '-'}</div>
            </div>
        );
    });
    
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}>
                Back
            </button>
            <button className="green btn-flat right white-text">
                Send launch
            </button>
        </div>
    );
};

function mapStateToProps(state){
    return { formValues: state.form.launchForm.values }
}


export default connect(mapStateToProps)(LaunchFormReview);