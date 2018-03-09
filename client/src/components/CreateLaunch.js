import React, { Component } from 'react';

class GetLaunch extends Component {
  render() {
    return (
      <div className="App" style={{textAlign:'center'}}>
        <header className="App-header">
          <h1 className="App-title">Create Launch</h1>
        </header>
        <div className="row">
          <form className="col s12">
          <table> <tbody>
          <tr><div className="input-field col s6">
              <input placeholder="Name" id="name" type="text" className="validate"/>
            </div>
            <div className="input-field col s6">
              <input placeholder="Duration" id="duration" type="number" className="validate"/>
            </div></tr>
            <tr><div className="input-field col s12">
              <textarea placeholder="About" id="textareaAbout" className="materialize-textarea"></textarea>
            </div></tr>
            <tr><div className="input-field col s6" >
              <input placeholder="Email" id="email" type="email" className="validate"/>
              <label for="email" data-error="wrong" data-success="right"></label>
            </div>
            <div className="input-field col s6">
              <input placeholder="Email subject" id="subject" type="text" className="validate"/>
            </div>
            </tr>
            <tr><div className="input-field col s12">
              <textarea placeholder="Email Body" id="textareaEmailBody" className="materialize-textarea"></textarea>
            </div></tr>
            <tr><div className="input-field col s6" >
              <input placeholder="Phone Number" id="email" type="text" className="validate"/>
            </div></tr>
            <tr><div className="input-field col s12">
              <textarea placeholder="Text Message Body" id="textareaTextBody" className="materialize-textarea"></textarea>
            </div></tr>
            <tr><button className="btn waves-effect waves-light" type="submit" name="action">Submit </button></tr>
            </tbody></table> 
          </form>
        </div>
      </div>
    );
  }
}

export default GetLaunch;
