import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    
    render() {
        return (
            <StripeCheckout
                name = "Launch5"
                description = "5$ שיגור אחד"
                amount = {500}
                token = {token => this.props.handleToken(token)}
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    קנה שיגור
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);