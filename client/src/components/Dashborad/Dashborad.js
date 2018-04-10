import React, { Component } from 'react';
import LaunchList from './LaunchList';

class Dashborad extends Component {
    render() {
        return (
            <div className='container'>
                <LaunchList/>      
            </div>
        )
    }
};

export default Dashborad;