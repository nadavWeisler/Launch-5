import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './actions';
import PageNotFound from './components/pageNotFound';
import GetLaunch from './components/GetLaunch';
import Home from './components/Home';
import Header from './components/Header';
import Dashborad from './components/Dashborad';
import LaunchNew from './components/Launches//LaunchNew'

// Renders the diffrent routes- being renderd by index.js

class AppRouter extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    
    render() {
        return (
            <BrowserRouter>
            <div style={{fontFamily:'Helvetica'}}>
                <Header/>   
                <div dir="rtl" style = {{margin: '20px 0'}}>
                <Switch style={{textAlign:'center'}}>
                    <Route path="/" component= {Home} exact={true} />
                    <Route path="/create" component= {LaunchNew} exact={true} />
                    <Route path="/get" component= {GetLaunch} exact={true} />
                    <Route path="/dashborad" component= {Dashborad} exact={true} />
                    <Route path="/getLaunch/:launchId" component={GetLaunch} exact={true} />
                    <Route path="/launchNotFound" component={PageNotFound} exact={true}/>
                    <Route component = {PageNotFound} />  
                </Switch>
                </div>
            </div>
            </BrowserRouter>
        )};
}

export default connect(null, actions)(AppRouter);