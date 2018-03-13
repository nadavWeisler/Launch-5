import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LaunchList from './Launches/LaunchList'

class Dashborad extends Component {
    render() {
        return (
            <div>
                <LaunchList/>
                <div className="fixed-action-btn">
                <NavLink 
                to="/create"
                activeClassName="selected"
                className="btn-floating btn-large red">
                    <i className="large material-icons">add</i>
                    </NavLink>
                </div>
            </div>
        )}
};

export default Dashborad;