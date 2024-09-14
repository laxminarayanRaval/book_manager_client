import { useState, useCallback } from "react";

const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (onSubmit) => async (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        await onSubmit(values);
      }
      setIsSubmitting(false);
    },
    [values, validate]
  );

  return { values, errors, isSubmitting, handleChange, handleSubmit };
};

export default useForm;
