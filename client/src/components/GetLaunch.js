import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchCurrentLaunch} from '../actions';
import {Button} from 'react-bootstrap';
import {FaWhatsapp, FaGoogle} from 'react-icons/lib/fa';
import {MdEmail, MdPhoneAndroid} from 'react-icons/lib/md';
import AdSense from 'react-adsense';

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
            שיגור הוא הודעה מוכנה מראש לנמען שתקבעו ל-48 שעות בלבד  
          </h4>
          <br/>  
          <div className="col-md-4">
          </div>
          <div className="col-md-1">
            <Button
              className="getLaunchButton" 
              href={this.getWhatsappPath()}>
              <div className="text_icon">
                <FaWhatsapp size={32}/>
              </div>
              Whatsapp
            </Button>
          </div>    
          <div className="col-md-1">
            <Button
              className="getLaunchButton"
              href={this.getSmsPath()}>
                <div className="text_icon">
                  <MdPhoneAndroid size={32}/>
                </div>
                SMS
            </Button>
          </div> 
          <div className="col-md-1">
            <Button 
              className="getLaunchButton"
              href={this.getOutlookPath()}>
                <div className="text_icon">
                  <MdEmail size={32}/>
                </div>
                דואר אלקטרוני
            </Button>
          </div>  
          <div className="col-md-1">
            <Button 
              className="getLaunchButton"
              href={this.getGmailPath()}>
              <div className="text_icon">
                <FaGoogle size={32}/>
              </div>
              GMAIL
            </Button>
          </div>    
           {/* ads with no set-up */}
          <AdSense.Google
            client='ca-pub-2946053301282540'
            style={{ display: 'block' }}
            layout='in-article'
            format='fluid'
          />         
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
