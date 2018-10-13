import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Nav, Navbar, NavItem } from 'react-bootstrap';
import './Header.css';

class Header extends Component {
  connectedHeader(){
    return (
      [
      <NavItem>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <font color="white">דף הבית</font>
        </Link>
      </NavItem>,
      <NavItem>
        <Link to="/dashborad" style={{ textDecoration: 'none' }}>
          <font color="white">השיגורים שלי</font>
        </Link>
      </NavItem>,
      <NavItem>
        <Link to='/create' style={{ textDecoration: 'none' }}>
          <font color="white"> צור שיגור</font>
        </Link>
      </NavItem>,
      <NavItem href='/api/logout'>
        <font color="white">התנתק</font>
      </NavItem>
    ]);
  }
  
  renderContent(){
    switch(this.props.auth){
      case null:
        return (
          <NavItem>
            <font color="white">מתחבר</font>
          </NavItem>);
      case false:
        return ([
          // <NavItem href='/auth/facebook'>
          //   <button href='/auth/facebook' class="loginBtn loginBtn--facebook">
          //     Login with Facebook
          //   </button>
          // </NavItem>,
          <NavItem>
            {/* <font color="white">שלום אורח</font> */}
          </NavItem>]
        )
      default:
        return this.connectedHeader();
    }
  }

 
  render() {
    return (
      <Navbar className="navbar navbar-custom">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/' className='white' style={{color:"#FFFFFF"}}>
              Launch5
            </Link>
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