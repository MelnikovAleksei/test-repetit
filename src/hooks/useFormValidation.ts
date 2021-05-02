import React, { useState, useCallback } from "react";

const useFormValidation = (): object => {
  const FORM_TAG: string = 'form';

  const [values, setValues] = useState<object>({});
  const [errors, setErrors] = useState<object>({});
  const [isValid, setIsValid] = useState<boolean | undefined>(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const target: HTMLInputElement = evt.target;
    const name: string = target.name;
    const value: string | boolean = target.type === 'checkbox' ? target.checked : target.value;

    setValues({
      ...values,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: target.validationMessage
    });

    const formElement: HTMLFormElement | null = target.closest(FORM_TAG);
    const formValidity: boolean | undefined = formElement?.checkValidity();

    setIsValid(formValidity);
  }

  const resetForm = useCallback(
    (newValues: object = {}, newErrors: object = {}, newIsValid: boolean = false): void => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  )

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
};

 export default useFormValidation;
