import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {FaWhatsapp, FaGoogle} from 'react-icons/lib/fa';
import {MdEmail, MdPhoneAndroid} from 'react-icons/lib/md';
import {Grid, Row} from 'react-bootstrap';
import * as actions from './../../actions';
import createLinks from '../../utils/createLinks';

class GetLaunch extends Component {
  componentDidMount() {
    this.props.fetchCurrentLaunch(this.props.match.params.launchId);
  }

  getWhatsappPath(){
    if(this.props.currentLaunch){
      return createLinks.CreateWhatsapp(this.props.currentLaunch.phones, this.props.currentLaunch.messageBody) 
    }
    else {
      return '';
    }
  }

  getSmsPath(){
    if(this.props.currentLaunch){
      return createLinks.CreateSms(this.props.currentLaunch.phones, this.props.currentLaunch.messageBody);
    }
    else {
      return '';
    }
  }

  getGmailPath(){
    if(this.props.currentLaunch){
      return createLinks.CreateGmail(
        this.props.currentLaunch.emails,
        this.props.currentLaunch.emailsCC || '',
        this.props.currentLaunch.emailsBCC || '',
        this.props.currentLaunch.emailSubject,
        this.props.currentLaunch.emailBody);
      }
    else {
      return '';
    }
  }

  getOutlookPath(){
    if(this.props.currentLaunch){
      return createLinks.CreateEmail(
        this.props.currentLaunch.emails,
        this.props.currentLaunch.emailsCC || '',
        this.props.currentLaunch.emailsBCC || '',
        this.props.currentLaunch.emailSubject,
        this.props.currentLaunch.emailBody)
    }

    else {
      return '';
    }
  }

  gmailButtonClick(){
    this.props.gmailClick(this.props.currentLaunch);
    window.open(this.getGmailPath());
  }

  outlookButtonClick(){
    this.props.outlookClick(this.props.currentLaunch);
    window.open(this.getOutlookPath());
  }

  whatsappButtonClick(){
    this.props.whatsAppClick(this.props.currentLaunch);
    window.open(this.getWhatsappPath());
  }

  getWhatsappButton(){
    return (
      <Button
        className="getLaunchButton" 
        onClick={() => this.whatsappButtonClick()}
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
            <MdPhoneAndroid color="#FF4500" size={32}/>
          </div>
          SMS
      </Button>
    );
  }

  getOutlookButton(){
    return (
    <Button 
      className="getLaunchButton"
      onClick={() => this.outlookButtonClick()}
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
        onClick={() => this.gmailButtonClick()}
        >
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
        {/* <div className="col-md-2">
          {this.getOutlookButton()}
        </div>  
        <div className="col-md-2">
          {this.getGmailButton()}
        </div>    */}
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
            <Row id='launchDescRow'>
              <h2>
                {this.props.currentLaunch.desc} 
              </h2>
            </Row>
            <br/>
            {this.buttonsRow()}    
          </Grid>
        );
    }
  }
  
  render(){
    return (
      <div
        className='container' 
        style={{textAlign: 'center'}}
      >
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state){
    return {currentLaunch: state.currentLaunch}
}

export default connect(mapStateToProps, actions)(GetLaunch);
