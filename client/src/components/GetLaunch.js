import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchCurrentLaunch} from '../actions';
import {Button} from 'react-bootstrap';
import {FaWhatsapp, FaGoogle} from 'react-icons/lib/fa';
import {MdEmail, MdPhoneAndroid} from 'react-icons/lib/md';

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
        <div>
          <h1> קיבלת את השיגור: {this.props.currentLaunch.name}</h1>
          <div>
            <h3>
              {this.props.currentLaunch.desc} 
            </h3>
          </div>
          <br/>
          <h4>
            שיגור הינו הודעת טקסט או דואר אלקטרוני אותה ניתן לשלוח בשלל מדיות, בחר כיצד תרצה לשלוח את ההודעה
          </h4>
          <br/>  
          <div className="col-md-4">
          </div>
          <div className="col-md-1">
            <Button 
              href={this.getWhatsappPath()}>
              <div className="text_icon">
                <FaWhatsapp size={32}/>
              </div>
              Whatsapp
            </Button>
          </div>    
          <div className="col-md-1">
            <Button
              href={this.getSmsPath()}>
                <div className="text_icon">
                  <MdPhoneAndroid size={32}/>
                </div>
                SMS
            </Button>
          </div> 
          <div className="col-md-1">
            <Button href={this.getOutlookPath()}>
                <div className="text_icon">
                  <MdEmail size={32}/>
                </div>
                דואר אלקטרוני
            </Button>
          </div>  
          <div className="col-md-1">
            <Button href={this.getGmailPath()}>
              <div className="text_icon">
                <FaGoogle size={32}/>
              </div>
              GMAIL
            </Button>
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

export default connect(mapStateToProps, {fetchCurrentLaunch})(GetLaunch);
