import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import {Button} from 'react-bootstrap';
import {MdDelete} from 'react-icons/lib/md';
import * as actions from './../../actions';

class EmailList extends Component {
    componentDidUpdate() {
        if(this.props.emailsLaunchId){
            this.props.fetchCurrentLaunch(this.props.emailsLaunchId);
        }
    }

    oneEmailPanel(email) {
        return(
            <Panel>
                <Panel.Body>
                    {email}
                    <Button 
                        className="pull-left"
                        onClick={() => this.deleteEmail(email)}>
                        <MdDelete size={24} className="pull-left" color="red"/>
                    </Button>
                </Panel.Body>
            </Panel> 
        );
    }

    deleteEmail(email){
        this.props.removeEmailToLaunch(email, this.props.emailsLaunchId);
    }

    noEmailTitle(){
        return (
        <Panel>
            <Panel.Body>
                בשיגור זה אין כתובות מייל
            </Panel.Body>
        </Panel>
        )
    }

    renderEmails() {
        switch(this.props.emails){
            case null:
                return (
                    this.noEmailTitle()
                );
            case false:
                return (
                    this.noEmailTitle()
                );
            case undefined:
                return (
                    this.noEmailTitle()
                );
            default:
                if(this.props.emails.length > 0){
                    return this.props.emails.map(email => {
                        return (
                            this.oneEmailPanel(email)
                        );
                    });
                } else {
                    return (
                        this.noEmailTitle()
                    );
                }
        }  
    }    

    render() {
        return (
            <div>
                {this.renderEmails()}
            </div>
        )};
};

function mapStateToProps(state){
    return {currentLaunch: state.currentLaunch}
}

export default connect(mapStateToProps, actions)(EmailList);