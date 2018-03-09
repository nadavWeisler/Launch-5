import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Payments from './Payments'; 

class Header extends Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        return 'Still deciding';
      case false:
        return (<li><a href='/auth/google'>Sign In With Google</a></li>)
      default:
        return (
          [<li key="1"><Payments/></li>,
          <li key="4" style = {{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
          <li key="5"><NavLink
                to="/dashborad"
                activeClassName="selected"
                className= "nalink"
                >Dashborad
            </NavLink></li>,
          <li key="2"><NavLink
              to="/create"
              activeClassName="selected"
              className= "nalink"
              >Create Launch
          </NavLink></li>,
        <li key="3"><a href='/api/logout'>Logout</a></li>]);
    }
  }
  
  render() {
    return (
      <nav>
        <div className="nav=wrapper">
          <NavLink
                className="left brand-logo"
                to="/"
                activeClassName="selected"
                >
                Launch5
            </NavLink>
          <ul className="right">
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