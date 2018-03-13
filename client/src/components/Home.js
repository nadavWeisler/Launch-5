import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="app" style={{textAlign:'center'}}>
        <div className="container">
          <br/>
          <h1 className="header center red-text">Welcome to Launch5</h1>
          <div className="row center">
            <h5 className="header col s12 light">
              A modern way to bother someone
            </h5>
          </div>
          <div className="row center">
            <NavLink className=" btn-large waves-effect waves-light red white-text"
              to='/new'>
              Create Launch
            </NavLink>
          </div>
          <div className="container">
            <div className="section">
              <div className="row">
                <div className="col s12 m4">
                  <div className="icon-block">
                    <h2 className="center light-blue-text"><i className="material-icons">flash_on</i></h2>
                    <h5 className="center">Speed</h5>
                    <p className="light">
                      A few clicks and the world is already a better place because of you.
                    </p>
                  </div>
                </div>

                <div className="col s12 m4">
                  <div className="icon-block">
                    <h2 className="center light-blue-text"><i className="material-icons">group</i></h2>
                    <h5 className="center">Together</h5>

                    <p className="light">Changing the world together. Share and send to you friends in order to create bigger influence.
                    </p>
                  </div>
                </div>

                <div className="col s12 m4">
                  <div className="icon-block">
                    <h2 className="center light-blue-text"><i className="material-icons">settings</i></h2>
                    <h5 className="center">Impact</h5>

                    <p className="light">Send the facts to the people in charge. Send the truth to those who are in control.</p>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
        
      </div>
    );
  }
}

export default App;
