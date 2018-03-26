import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer  } from "react-router-bootstrap";

class Header extends Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        return (
          <NavItem>
            <font color="white">מתחבר</font>
          </NavItem>);
      case false:
        return (
          <NavItem 
            href='/auth/google'>
            <font color="white">התחבר בעזרת גוגל</font>
          </NavItem>
        )
      default:
        return (
          [
        <IndexLinkContainer to="/dashborad">
          <NavItem>
              <font color="white">השיגורים שלי</font>
          </NavItem>
        </IndexLinkContainer>,
        <LinkContainer to="/create">
          <NavItem>
              <font color="white"> צור שיגור</font>
          </NavItem>
        </LinkContainer>,
        <NavItem href='/api/logout'>
          <font color="white">התנתק</font>
        </NavItem>
          ]);
    }
  }

 
  render() {
    return (
      <Navbar className="navbar navbar-custom">
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to='/' className='white' style={{display: 'block', height: '100%', color:"#FFFFFF"}}>
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