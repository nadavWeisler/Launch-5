import React from 'react';
import {FormGroup, ControlLabel,  FormControl} from 'react-bootstrap'

export default ({ input, label, type, text, componentClass,  meta: { error, touched } }) => {
  return (
    <div>
      <FormGroup>
        <ControlLabel>
          {label}
        </ControlLabel>
        <FormControl 
          onChange={input.onChange} 
          value={input.value} 
          type={type}
          maxLength="450"
          componentClass={componentClass}
        />
      </FormGroup>
      
      <div style={{ marginBottom: '20px', color:"red" }}>
        {touched && error}
      </div>
    </div>
  );
};