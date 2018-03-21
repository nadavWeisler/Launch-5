import React, { Component } from 'react';
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
                        <a href={'/getLaunch/' + launch._id} className="card-title">{launch.name}</a>
                        <p>
                            {launch.desc}
                        </p>
                        <p className="left">
                            זמן יצירה: {new Date(launch.startDate).toLocaleString()}
                        </p>
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