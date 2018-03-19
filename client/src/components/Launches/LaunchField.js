import React from 'react';

function getInputByType(type, input) {
  if(type === 'input'){
    return <input {...input} style={{ marginBottom: '5px' }} />
  } else {
    return <textarea {...input} className="materialize-textarea" style={{ marginBottom: '5px' }} />;
  }
}

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <div key={input + label}>
      <label>{label}</label>
      {getInputByType(type, input)}
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};