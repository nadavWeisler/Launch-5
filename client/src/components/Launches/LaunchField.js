import React from 'react';
import {FormGroup, ControlLabel,  FormControl, HelpBlock} from 'react-bootstrap'

export default ({ input, label, type, text, componentClass,  meta: { error, touched } }) => {
  return (
    <div>
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <HelpBlock>{text}</HelpBlock>
        <FormControl 
          onChange={input.onChange} 
          value={input.value} 
          type={type}
          componentClass={componentClass}/>
      </FormGroup>
      
      <div style={{ marginBottom: '20px', color:"red" }}>
        {touched && error}
      </div>
    </div>
  );
};