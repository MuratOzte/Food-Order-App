import { useState } from 'react';

const useInput = (validateFunction) => {
    const [enteredValue, setEnteredValue] = useState('');

    const isValueValid = enteredValue.trim() !== '';
    const hasError = !isValueValid;

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    };

    const reset = () => {
        setEnteredValue('');
    };

    return {
        value: enteredValue,
        hasError,
        isValid: isValueValid,
        valueChangeHandler,
        reset,
    };
};

export default useInput;
