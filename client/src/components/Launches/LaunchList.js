import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLaunches, removeLaunchAndGetOthers } from '../../actions';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import LaunchEdit from './LaunchEdit';

class LaunchList extends Component {
    componentDidMount() {
        this.props.fetchLaunches();
    }

    componentDidUpdate(){
        this.props.fetchLaunches();
    }
    
    state = {
        launchId: undefined
    };

    handleClearEdit = () => {
        this.setState(() => ({ launchId: undefined }));
    }

    doEdit(launchId) {
        console.log(this.state);
        console.log(launchId);
        this.setState(() => ({ launchId}));
        console.log(this.state);
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
                    <Button
                        className="pull-left"
                        bsSize="small"
                        bsStyle="danger"
                        onClick={() => this.props.removeLaunchAndGetOthers(launch)}>
                        מחק שיגור
                    </Button>
                    <Button
                        onClick= {() => this.doEdit(launch._id)}
                        bsSize="small"
                        bsStyle="info"
                        className="pull-left">
                        ערוך
                    </Button>
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
            </div>
        )};
};

function mapStateToProps(state){
    return {launches: state.launches}
}

export default connect(mapStateToProps, {fetchLaunches, removeLaunchAndGetOthers})(LaunchList)