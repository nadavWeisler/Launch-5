import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';

class EmailList extends Component {
    oneEmailPanel(email) {
        return(
            <Panel>
                <Panel.Body>
                    {email}
                </Panel.Body>
            </Panel> 
        );
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

export default EmailList;