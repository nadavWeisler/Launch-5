import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchCurrentLaunch} from '../actions';

class GetLaunch extends Component {
  componentDidMount() {
    this.props.fetchCurrentLaunch(this.props.match.params.launchId);
  }

  getWhatsappPath(){
    if(this.props.currentLaunch){
      return this.props.currentLaunch.whatsappPath
    }
    else {
      return '';
    }
  }

  getSmsPath(){
    if(this.props.currentLaunch){
      return this.props.currentLaunch.smsPath
    }
    else {
      return '';
    }
  }

  getGmailPath(){
    if(this.props.currentLaunch){
      return this.props.currentLaunch.gmailPath
    }
    else {
      return '';
    }
  }

  getOutlookPath(){
    if(this.props.currentLaunch){
      return this.props.currentLaunch.outlookPath;
    }
    else {
      return '';
    }
  }

  renderContent(){
    if(this.props.currentLaunch){
      return (
        <div className="App" style={{textAlign: 'center'}}>
          <header className="App-header">
            <h1 className="App-title">Get Launch</h1>
          </header>
          <p className="App-intro">
            You get launc1 Launch! 
          </p>
          <p className="App-intro">
            send launch at:
          </p>
          <div className="row">
            <div className="col s3"><a href={this.getWhatsappPath()} className="waves-effect waves-light btn">Whatsapp</a></div>
            <div className="col s3"><a href={this.getSmsPath()} className="waves-effect waves-light btn">SMS</a></div>
            <div className="col s3"><a href={this.getGmailPath()} className="waves-effect waves-light btn">Gmail</a></div>
            <div className="col s3"><a href={this.getOutlookPath()} className="waves-effect waves-light btn">Gmail</a></div>
          </div>
        </div>
      );
    } else {
      return <div>
              <h1 className="header center red-text">Launch has not found</h1>
            </div>
    }
  }

  render() {
    console.log(this.props.launch);
    return (
      this.renderContent()
    );
  }


}

function mapStateToProps(state){
    console.log(state);
    return {currentLaunch: state.currentLaunch}
}

export default connect(mapStateToProps, {fetchCurrentLaunch})(GetLaunch);
