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
          <div class="container">
            <div class="section">
              <div class="row">
                <div class="col s12 m4">
                  <div class="icon-block">
                    <h2 class="center light-blue-text"><i class="material-icons">flash_on</i></h2>
                    <h5 class="center">Speed</h5>
                    <p class="light">
                      A few clicks and the world is already a better place because of you.
                    </p>
                  </div>
                </div>

                <div class="col s12 m4">
                  <div class="icon-block">
                    <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
                    <h5 class="center">Together</h5>

                    <p class="light">Changing the world together. Share and send to you friends in order to create bigger influence.
                    </p>
                  </div>
                </div>

                <div class="col s12 m4">
                  <div class="icon-block">
                    <h2 class="center light-blue-text"><i class="material-icons">settings</i></h2>
                    <h5 class="center">Impact</h5>

                    <p class="light">Send the facts to the people in charge. Send the truth to those who are in control.</p>
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
