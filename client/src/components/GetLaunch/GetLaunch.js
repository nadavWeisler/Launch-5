import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {FaWhatsapp, FaGoogle} from 'react-icons/lib/fa';
import {MdEmail, MdPhoneAndroid} from 'react-icons/lib/md';
import {Grid, Row} from 'react-bootstrap';
import * as actions from './../../actions';
import './GetLaunch.css';

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

  getWhatsappButton(){
    return (
      <Button
        className="getLaunchButton" 
        onClick={() => this.props.whatsAppClick(this.props.currentLaunch)}
        href={this.getWhatsappPath()}
      >
        <div className="text_icon">
          <FaWhatsapp color="#25D366" size={32}/>
        </div>
        Whatsapp
    </Button>
    )
  }

  getSmsButton(){
    return (
      <Button
        className="getLaunchButton"
        onClick={() => this.props.smsClick(this.props.currentLaunch)}
        href={this.getSmsPath()}
        >
          <div className="text_icon">
            <MdPhoneAndroid size={32}/>
          </div>
          SMS
      </Button>
    );
  }

  getOutlookButton(){
    return (
    <Button 
      className="getLaunchButton"
      onClick={() => this.props.outlookClick(this.props.currentLaunch)}
      href={this.getOutlookPath()}
      >
        <div className="text_icon">
          <MdEmail color="#3e65cf" size={32}/>
        </div>
        דואר אלקטרוני
    </Button>);
  }

  getGmailButton(){
    return (
      <Button 
        className="getLaunchButton"
        onClick={() => this.props.gmailClick(this.props.currentLaunch)}
        href={this.getGmailPath()}>
        <div className="text_icon">
          <FaGoogle color="#c71610" size={32}/>
        </div>
        GMAIL
      </Button>
    );
  }
  buttonsRow(){
    return (
      <div> 
        <div className="col-md-3">
        </div>
        <div className="col-md-2">         
          {this.getWhatsappButton()}
        </div>    
        <div className="col-md-2 visible-xs">
          {this.getSmsButton()}
        </div> 
        <div className="col-md-2">
          {this.getOutlookButton()}
        </div>  
        <div className="col-md-2 visible-lg">
          {this.getGmailButton()}
        </div>   
      </div>
    )
  }

  renderContent(){
    switch(this.props.currentLaunch){
      case false:
        return (
          <div>
            <h1 className="header center red-text">השיגור אינו קיים במערכת</h1>
          </div>
        );
      case null:
        return (
          <div>
            <h1 className="header center red-text">טוען שיגור</h1>
          </div>
        );
      default:
        return (
          <Grid className="container">
            <Row id='launchNameRow'>
              <h1> קיבלת את השיגור: {this.props.currentLaunch.name}</h1>
            </Row>
            <Row id='launchDescRow'>
              <h3>
                {this.props.currentLaunch.desc} 
              </h3>
            </Row>
            <br/>
            <Row id='launchDescRow'>
              <h4>
                שיגור הוא הודעה מוכנה מראש לנמען שתקבעו ל-48 שעות בלבד  
              </h4>
            </Row>
            <br/>  
            {this.buttonsRow()}        
          </Grid>
        );
    }
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state){
    console.log(state);
    return {currentLaunch: state.currentLaunch}
}

export default connect(mapStateToProps, actions)(GetLaunch);
