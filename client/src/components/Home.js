import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaInfoCircle, FaGroup} from 'react-icons/lib/fa'
import { MdFlashOn } from 'react-icons/lib/md'
import HomeText from './../text/HomeText';
import {Grid, Row} from 'react-bootstrap';
 
class Home extends Component {
  
  renderButton(){
    switch(this.props.auth){
      case null:
      return(
        <Button bsSize="large" href='/auth/google' className="navbar-custom">
          התחבר בעזרת גוגל
        </Button>)
      case false:
        return (
          <Button bsSize="large" href='/auth/google' className="navbar-custom">
            התחבר בעזרת גוגל
          </Button>
        )
      default:
        return (
              <Link to="/create" className="btn-lg navbar-custom" style={{width: '200px', color:"#FFFFFF"}}>
                  צור שיגור
              </Link>)
      
    }
  }
  render() {
    return (
      <Grid className='container' style={{textAlign:'center'}}>
        <Row id="titleRow">
          <h1 style={{color:'#5F4B8B',}}><strong>
            {HomeText.title}
          </strong></h1>
        </Row>
        <Row id="subTitleRow">
          <h3>
            {HomeText.subTitle}
          </h3>
        </Row>
        <Row id="motivationTextRow">
          <h4>
            {HomeText.motivationText}
          </h4>
        </Row>
        <br/>
        <Row id="buttonRow">
          {this.renderButton()}
        </Row>
        <br/>
        <Row id="buttonRow">
        <div>
            <div className="col-md-3">
            </div>
            <div className="col-md-2">
              <div>
                <h2><FaInfoCircle/></h2>
                <h4><strong>{HomeText.whatIsALaunchQ}</strong></h4>
                <p>
                  {HomeText.whatIsALaunchA}
                </p>
              </div>
            </div>
            <div className="col-md-2">
              <div>
                <h2><MdFlashOn/> </h2>
                <h4><strong>{HomeText.speedQ}</strong></h4>
                <p> 
                  {HomeText.speedA}
                </p>
              </div>
            </div>

            <div className="col-md-2">
              <div>
                <h2><FaGroup/></h2>
                <h4><strong>{HomeText.socialQ}</strong></h4>
                <p>
                  {HomeText.socialA}
                </p>
              </div>
            </div>
          </div>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps({auth}){
  return {auth};
}

export default connect(mapStateToProps)(Home);
