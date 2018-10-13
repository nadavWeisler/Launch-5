import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions';
import {Button, Col, Row} from 'react-bootstrap';
import EmailList from '../LaunchRecipients/EmailsList';
import Modal from 'react-modal';
import validateEmail from '../../utils/validateEmail';

class LaunchRecipients extends Component {
    componentDidUpdate() {
        if(this.props.emailsLaunchId){
            this.props.fetchCurrentLaunch(this.props.emailsLaunchId);
        }
    }

    getEmails(){
        switch(this.props.currentLaunch){
            case false:
                return [];
            case null:
                return [];
            case undefined:
                return [];
            default:
                return this.props.currentLaunch.emails;
        }
    }

    loadLunchTitle(){
        return (
            <div style={{textAlign:'center'}}>
                <h1>טוען שיגורים</h1>
            </div>
        );
    }

    addEmail(email){
        if(!validateEmail(email)) {
            alert('מייל לא תקין');
        }
        else {
            let getEmails = this.getEmails();
            if(getEmails.includes(email)){
                alert('מייל זה קיים במערכת');
            } else {
                this.props.addEmailToLaunch(email, this.props.emailsLaunchId);
            }
        }
    }

    renderContent(){
        switch(this.props.currentLaunch){
            case null:
                return this.loadLunchTitle();
            case false:
                return this.loadLunchTitle();
            default:
                return (
                    <div dir="rtl">
                        <h1>ערוך כתובות דואר אלקטרוני</h1>
                        <Col className="col-md-4">
                        </Col>
                        <Col className="col-md-4">
                        </Col>
                        <Col className="col-md-4">
                            <div className="col-xs-9">
                                <input 
                                    ref="inputEmail"
                                    id="inputEmail"
                                    className="form-control pull-right"
                                />
                            </div>
                            <Button 
                                onClick={() => this.addEmail(this.refs.inputEmail.value)}
                                className="btn-info"
                            >
                                הוסף מייל
                            </Button>
                            <EmailList emailsLaunchId={this.props.emailsLaunchId} emails={this.getEmails()}/>   
                        </Col>
                    </div>
                )
        }
    }

    render() {
        return (
            <Modal 
                isOpen={!!this.props.emailsLaunchId}
                emailsLaunchId={this.props.emailsLaunchId}
            >
                <div dir="rtl">
                    {this.renderContent()} 
                    <Button bsSize="large" className="navbar-custom" onClick={this.props.handleClearEmails}>
                    בטל
                </Button> 
                </div>
            </Modal>
        )
    }      
};

function mapStateToProps(state){
    return {currentLaunch: state.currentLaunch}
}

export default connect(mapStateToProps, actions)(LaunchRecipients);