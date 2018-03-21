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
          <h1 className="header center red-text"> קיבלת את השיגור: {this.props.currentLaunch.name}</h1>
          <div className="row center">
            <h5 className="header col s12 light">
            {this.props.currentLaunch.desc} 
            </h5>
          </div>
          <h5 className="App-intro">
            בחר כיצד לשלוח את השיגור
          </h5>
          <br/>          
          <div className="row">
          <div className="card darken-1" key='whatsappCard'>
            <div className="card-content">
                <span><a href={this.getWhatsappPath()} className="red btn">Whatsapp</a></span>
            </div>
          </div>
          <div className="card darken-1" key='smsCard'>
            <div className="card-content">
                <span><a href={this.getSmsPath()} className="red btn">SMS</a></span>
            </div>
          </div> 
          <div className="card darken-1" key='emailCard'>
            <div className="card-content">
                <span><a href={this.getOutlookPath()} className="red btn">דואר אלקטרוני</a></span>
            </div>
          </div> 
          <div className="card darken-1" key='gmailCard'>
            <div className="card-content">
                <span><a href={this.getGmailPath()} className="red btn">Gmail</a></span>
            </div>
          </div>     
          </div>
        </div>
      );
    } else {
      return <div>
              <h1 className="header center red-text">השיגור אינו קיים במערכת</h1>
            </div>
    }
  }

  render() {
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
