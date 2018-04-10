import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentLaunch } from '../../actions';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import EmailList from '../LaunchRecipients/EmailsList';

class LaunchRecipients extends Component {
    componentDidMount() {
        this.props.fetchCurrentLaunch(this.props.match.params.launchId);
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
            <div className='container'>
                  
            </div>
        )
    }      
};

function mapStateToProps(state){
    return {currentLaunch: state.currentLaunch}
}

export default connect(mapStateToProps, {fetchCurrentLaunch})(LaunchRecipients);