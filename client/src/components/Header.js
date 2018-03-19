import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Payments from './Payments'; 

class Header extends Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        return 'מתחבר';
      case false:
        return (<li><a href='/auth/google'>התחבר בעזרת גוגל</a></li>)
      default:
        return (
          [<li key="1"><Payments/></li>,
          <li key="4" style = {{margin: '0 10px'}}>שיגורים שנותרו: {this.props.auth.credits}</li>,
          <li key="5"><NavLink
                to="/dashborad"
                activeClassName="selected"
                className= "nalink"
                >השיגורים שלי
            </NavLink></li>,
          <li key="2"><NavLink
              to="/create"
              >צור שיגור
          </NavLink></li>,
        <li key="3"><a href='/api/logout'>התנתק</a></li>]);
    }
  }
  
  render() {
    return (
      <nav className="red">
        <div className="nav-wrapper container">
          <NavLink
                className="brand-logo"
                to="/"
                >
                Launch5
            </NavLink>
          <ul className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
          <ul id="nav-mobile" className="side-nav">
            {this.renderContent()}
          </ul>
          
        </div>
      </nav>
    );
  }
}

function mapStateToProps({auth}){
  return {auth};
}

export default connect(mapStateToProps)(Header);