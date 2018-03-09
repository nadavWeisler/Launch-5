import React, { Component } from 'react';

class GetLaunch extends Component {
  render() {
    return (
      <div className="App" style={{textAlign: 'center'}}>
        <header className="App-header">
          <h1 className="App-title">Get Launch</h1>
        </header>
        <p className="App-intro">
          You get launc1 Launch! 
        </p>
        <p className="App-intro">
          send launch at:
        </p>
        <div className="row">
        <div className="col s4"><a class="waves-effect waves-light btn">Whatsapp</a></div>
        <div className="col s4"><a class="waves-effect waves-light btn">SMS</a></div>
        <div className="col s4"><a class="waves-effect waves-light btn">Gmail</a></div>
        </div>
      </div>
    );
  }
}

export default GetLaunch;
