import React from 'react';
import useForm from '../custom-hooks/form-hooks';
import './Form.css';

const Form = () => {
  const { inputs, handleInputChange, handleSubmit } = useForm({
    state: '',
    suburb: '',
    postCode: ''
  });

  return (
    <div className="form-style">
      <h2>Address Validator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="suburb"
          placeholder="Suburb"
          onChange={handleInputChange}
          value={inputs.suburb}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          onChange={handleInputChange}
          value={inputs.state}
          required
        />
        <input
          type="text"
          name="postCode"
          placeholder="Post Code"
          onChange={handleInputChange}
          value={inputs.postCode}
          required
        />
        <button type="submit">Validate Address</button>
      </form>
      <div className="message">
        {inputs.formMessage
          ? inputs.formMessage
          : 'Please enter the address details'}
      </div>
    </div>
  );
};
export default Form;
