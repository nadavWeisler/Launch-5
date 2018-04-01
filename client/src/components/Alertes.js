import React, { Component } from 'react';
import {Alert, Button} from 'react-bootstrap';

class AlertWithHeader extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);
    
        this.state = {
            showAlert: true
        };
    }
    
    handleDismiss() {
        this.setState({ showAlert: false });
    }
    
    handleShow() {
        this.setState({ showAlert: true });
    }

    render(alertBody) {
        if(this.state.showAlert){
            return (
                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                <h4>{this.props.header}</h4>
                <p>
                  {this.props.body}
                </p>
                <p>
                  <Button onClick={this.handleDismiss} bsStyle="danger">אישור</Button>
                </p>
              </Alert>
            )
        }

        return <Button onClick={this.handleShow}>Show Alert</Button>;
    }
}

export default AlertWithHeader;