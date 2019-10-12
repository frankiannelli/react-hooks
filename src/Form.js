import React from 'react';
import useForm from './customHooks';

const Form = () => {
  const validateAddress = () => {
    alert(`Validate post!
    suburb: ${inputs.suburb}
    state: ${inputs.state}
    post code: ${inputs.postCode}
          `);
  };
  const { inputs, handleInputChange, handleSubmit } = useForm(
    { state: '', suburb: '', postCode: '' },
    validateAddress
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Suburb</label>
        <input
          type="text"
          name="suburb"
          onChange={handleInputChange}
          value={inputs.suburb}
          required
        />
        <label>State</label>
        <input
          type="text"
          name="state"
          onChange={handleInputChange}
          value={inputs.state}
          required
        />
      </div>
      <div>
        <label>Post Code</label>
        <input
          type="text"
          name="postCode"
          onChange={handleInputChange}
          value={inputs.postCode}
          required
        />
      </div>
      <button type="submit">Validate Address</button>
    </form>
  );
};
export default Form;
