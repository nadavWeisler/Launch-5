import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchLaunches} from '../../actions';
import {Panel} from 'react-bootstrap';

class LaunchList extends Component {
    componentDidMount() {
        this.props.fetchLaunches();
    }

    renderLaunches() {
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
        })
    }

    render() {
        return (
            <div className="container">
                {this.renderLaunches()}
            </div>
        )};
};

function mapStateToProps(state){
    return {launches: state.launches}
}

export default connect(mapStateToProps, {fetchLaunches})(LaunchList)