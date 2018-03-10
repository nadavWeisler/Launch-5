import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="app" style={{textAlign:'center'}}>
        <header className="App-header">
          <h1 className="App-title">Welcome to Launch5</h1>
        </header>
        <NavLink
            to="/get"
            activeClassName="selected"
            className= "nalink"
            >
            Get Launch
          </NavLink>
      </div>
    );
  }
}

export default App;
