import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return ( 
      <div className="container footer">  
        <div className="row">  
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">  
            <div className="copyright">   
              © 2018, Nadav Weisler, All rights reserved 
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">   
            <div className="design">
               <a href="#">Franchisee </a> |  <a target="_blank" href="http://www.webenlance.com">Web Design & Development by Webenlance</a>   
            </div>   
          </div>    
        </div>   
      </div>
    );
  }
}

export default Footer;