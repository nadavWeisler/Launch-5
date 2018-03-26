import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchLaunches} from '../../actions';
import {Panel} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class LaunchList extends Component {
    componentDidMount() {
        this.props.fetchLaunches();
    }

    renderLaunches() {
        switch(this.props.launches){
            case null:
            case false:
                return (
                    <div>
                        <h1>בחשבון זה אין שיגורים פעילים</h1>
                        <Link to="/create" className="btn-lg navbar-custom" style={{width: '200px', color:"#FFFFFF"}}>
                            צור שיגור
                        </Link>
                    </div>
                );
            default:
                console.log(this.props.launches);
                if(this.props.launches.length > 0){
                    return this.props.launches.map(launch => {
                        return (
                            <Panel>
                                <Panel.Heading>
                                    <Panel.Title  componentClass="h3">
                                        <a href={'/getLaunch/' + launch._id}>{launch.name}</a>
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    {launch.desc}
                                </Panel.Body>
                                <Panel.Footer>
                                    זמן יצירה: {new Date(launch.startDate).toLocaleString()}
                                </Panel.Footer>
                            </Panel> 
                        );
                    });
                } else {
                    return (
                        <div>
                            <h1>בחשבון זה אין שיגורים פעילים</h1>
                            <br/>
                            <Link to="/create" className="btn-lg navbar-custom" style={{width: '200px', color:"#FFFFFF"}}>
                                צור שיגור
                            </Link>
                        </div>
                    )
                }
        }
        
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                {this.renderLaunches()}
            </div>
        )};
};

function mapStateToProps(state){
    return {launches: state.launches}
}

export default connect(mapStateToProps, {fetchLaunches})(LaunchList)