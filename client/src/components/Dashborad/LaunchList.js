import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLaunches, removeLaunchAndGetOthers } from '../../actions';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Button, ButtonGroup} from 'react-bootstrap';
import LaunchEdit from './LaunchEdit';
import LaunchRecipients from './../LaunchRecipients/LaunchRecipient';

class LaunchList extends Component {
    componentDidMount() {
        this.props.fetchLaunches();
    }
    
    state = {
        launchId: undefined,
        emailLaunchId: undefined
    };

    handleClearEdit = () => {
        this.setState(() => ({ launchId: undefined }));
    }

    handleClearEmails = () => {
        this.setState(() => ({ emailsLaunchId: undefined }));
    }

    doEdit(launchId) {
        this.setState(() => ({ launchId}));
    }

    doEmails(emailsLaunchId){
        this.setState(() => ({ emailsLaunchId}));
    }

    doRemove(launch){
        if (window.confirm("למחוק את שיגור " + launch.name + "?")){
            this.props.removeLaunchAndGetOthers(launch)
        }
    }

    oneLaunchPanel(launch) {
        return(
            <Panel>
                <Panel.Heading>
                    <Panel.Title>
                        <a href={'/getLaunch/' + launch._id}>{launch.name}, {launch.desc}</a>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <h5> וואטסאפ: {launch.whatsappCount}</h5>
                    <h5> הודעת טקסט: {launch.smsCount}</h5>
                    <h5> דואר אלקטרוני: {launch.outlookCount}</h5>
                    <h5> ג'ימייל: {launch.gmailCount}</h5>
                    <ButtonGroup className="pull-left">
                        <Button
                            bsStyle="danger"
                            onClick={() => this.doRemove(launch)}>
                            מחק
                        </Button>
                        <Button
                            onClick= {() => this.doEdit(launch._id)}
                            bsStyle="warning"
                            >
                            ערוך
                        </Button>
                        {/* <Button
                            onClick= {() => this.doEmails(launch._id)}
                            bsStyle="info"
                            >
                            עדכן כתובות מייל
                        </Button> */}
                    </ButtonGroup>
                </Panel.Body>
                <Panel.Footer>
                </Panel.Footer>
            </Panel> 
        );
    }

    loadLunchTitle(){
        return (
            <div style={{textAlign:'center'}}>
                <h1>טוען שיגורים</h1>
            </div>
        );
    }

    noLaunchTitle(){
        return (
        <div style={{textAlign:'center'}}>
            <h1>בחשבון זה אין שיגורים פעילים</h1>
            <br/>
            <Link to="/create"
                className="btn-lg navbar-custom"
                style={{width: '200px', color:"#FFFFFF", textDecoration: 'none'}}>
                צור שיגור
            </Link>
        </div>
    )
    }

    renderLaunches() {
        switch(this.props.launches){
            case null:
                return (
                    this.loadLunchTitle()
                );
            case false:
                return (
                    this.noLaunchTitle()
                );
            default:
                if(this.props.launches.length > 0){
                    return this.props.launches.map(launch => {
                        return (
                            this.oneLaunchPanel(launch)
                        );
                    });
                } else {
                    return (
                        this.noLaunchTitle()
                    )
                }
        }
        
    }

    render() {
        return (
            <div>
                {this.renderLaunches()}
                <LaunchEdit
                    launchId={this.state.launchId}
                    handleClearEdit={this.handleClearEdit}
                />
                {/* <LaunchRecipients
                    emailsLaunchId={this.state.emailsLaunchId}
                    handleClearEmails={this.handleClearEmails}
                /> */}
            </div>
        )};
};

function mapStateToProps(state){
    return {launches: state.launches}
}

export default connect(mapStateToProps, {fetchLaunches, removeLaunchAndGetOthers})(LaunchList)