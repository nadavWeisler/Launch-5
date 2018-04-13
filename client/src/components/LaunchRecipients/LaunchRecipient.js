import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentLaunch } from '../../actions';
import {Button} from 'react-bootstrap';
import EmailList from '../LaunchRecipients/EmailsList';
import Modal from 'react-modal';

class LaunchRecipients extends Component {
    componentDidUpdate() {
        this.props.fetchCurrentLaunch(this.props.emailsLaunchId);
    }

    getEmails(){
        switch(this.props.currentLaunch){
            case false:
                return '';
            case null:
                return '';
            case undefined:
                return '';
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

    renderContent(){
        switch(this.props.currentLaunch){
            case null:
                return this.loadLunchTitle();
            default:
                return (
                    <div>
                        <h1>ערוך כתובות דואר אלקטרוני</h1>
                        <input/>
                        <Button>הוסף מייל</Button>
                        <label id="errorLabel"></label>
                        <EmailList emails={this.getEmails()}/>   
                    </div>
                )
        }
    }

    render() {
        return (
            <Modal 
                className='container'
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

export default connect(mapStateToProps, {fetchCurrentLaunch})(LaunchRecipients);