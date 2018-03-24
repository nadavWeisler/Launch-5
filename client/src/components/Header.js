import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {Nav, Navbar, NavItem } from 'react-bootstrap';

class Header extends Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        return (
          <NavItem>
            מתחבר
          </NavItem>);
      case false:
        return (
          <NavItem>
            <a 
              style={{display: 'block', height: '100%', color:"#FFFFFF"}}
              href='/auth/google'>
                התחבר בעזרת גוגל
            </a>
          </NavItem>
        )
      default:
        return (
          [
          <NavItem key="5">
            <NavLink
                style={{display: 'block', height: '100%', color:"#FFFFFF"}}
                to="/dashborad"
                >השיגורים שלי
            </NavLink>
          </NavItem>,
          <NavItem key="2">
            <NavLink
              style={{display: 'block', height: '100%', color:"#FFFFFF"}}
              to="/create"
              >צור שיגור
            </NavLink>
          </NavItem>,
        <NavItem key="3">
          <a 
            style={{display: 'block', height: '100%', color:"#FFFFFF"}}
            href='/api/logout'>
              התנתק
          </a>
        </NavItem>
          ]);
    }
  }

 
  render() {
    return (
      <Navbar className="navbar navbar-custom">
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to='/' className='navber_header' style={{display: 'block', height: '100%', color:"#FFFFFF"}}>
              Launch5
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight style={{color: '#5F4B8B'}}>
          {this.renderContent()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>      
    );
  }
}

function mapStateToProps({auth}){
  return {auth};
}

export default connect(mapStateToProps)(Header);