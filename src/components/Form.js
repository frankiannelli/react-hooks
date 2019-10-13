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
    <div className="form-style-8">
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
      {inputs.formMessage && <span>{inputs.formMessage}</span>}
    </div>
  );
};
export default Form;
