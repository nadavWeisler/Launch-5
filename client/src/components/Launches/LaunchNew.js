import React, { Component } from 'react';
import LaunchForm from './LaunchForm';
import LaunchFormReview from './LaunchFormReview';
import {reduxForm} from 'redux-form';

class LaunchNew extends Component {
  state = {showFormReview: false}

  renderContent(){
    if(this.state.showFormReview){
      return <LaunchFormReview
                onCancel={() => this.setState({showFormReview: false})}
              />;
    }
    return <LaunchForm 
              onLaunchSubmit={() => this.setState({showFormReview: true})}
            />;
  }

  render() {
    return (
      <div className="container">
        <br/>
        {this.renderContent()}
      </div>
    )};
}

export default reduxForm({
  form: 'launchForm'
})(LaunchNew);