import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchLaunches} from '../../actions';


class LaunchList extends Component {
    componentDidMount() {
        this.props.fetchLaunches();
    }

    renderLaunches() {
        return this.props.launches.map(launch => {
            return (
                <div className="card darken-1" key={launch._id}>
                    <div className="card-content">
                        <span className="card-title">{launch.name}</span>
                        <p>
                            {launch.desc}
                        </p>
                        <p className="right">
                            Sent On: {new Date(launch.startDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Gmail: {launch.gmailCount}</a>
                        <a>SMS: {launch.smsCount}</a>
                        <a>Whatapp: {launch.whatsappCount}</a>
                        <a>Outlook: {launch.outlookCount}</a>
                    </div>
                </div>
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