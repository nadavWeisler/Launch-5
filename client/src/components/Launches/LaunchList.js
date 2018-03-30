import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLaunches } from '../../actions';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class LaunchList extends Component {
    componentDidMount() {
        this.props.fetchLaunches();
    }

    oneLaunchPanel(launch) {
        return(
            <Panel>
                <Panel.Heading>
                    <Panel.Title  componentClass="h3">
                        <a href={'/getLaunch/' + launch._id}>{launch.name}, {launch.desc}</a>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <h5> וואטסאפ: {launch.whatsappCount}</h5>
                    <h5> הודעת טקסט: {launch.smsCount}</h5>
                    <h5> דואר אלקטרוני: {launch.outlookCount}</h5>
                    <h5> ג'ימייל: {launch.gmailCount}</h5>
                </Panel.Body>
                <Panel.Footer>
                    זמן יצירה: {new Date(launch.startDate).toLocaleString()}
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
            <Link to="/create" className="btn-lg navbar-custom" style={{width: '200px', color:"#FFFFFF"}}>
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
            </div>
        )};
};

function mapStateToProps(state){
    return {launches: state.launches}
}

export default connect(mapStateToProps, {fetchLaunches})(LaunchList)