import { useState } from 'react';
import validateAddress from '../services/validate-address';

const useForm = (initialValues) => {
  const [inputs, setInputs] = useState(initialValues);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    const { suburb, state, postCode } = inputs;
    const formMessage = await validateAddress(suburb, state, postCode);
    setInputs((inputs) => ({ ...inputs, formMessage }));
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({ ...inputs, [event.target.name]: event.target.value }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};

export default useForm;
