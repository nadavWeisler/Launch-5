import React, { Component } from 'react';
import LaunchList from './Launches/LaunchList';
import Popup from 'react-popup';

class Dashborad extends Component {
    render() {
        Popup.alert("hello");
        return (
            <div className='container'>
                <LaunchList/>      
            </div>
        )}
};

export default Dashborad;