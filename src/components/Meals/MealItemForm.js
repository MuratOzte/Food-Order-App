import React, { useRef, useState } from 'react';

import classes from './MealItemForm.module.css';

import Input from '../UI/Input';

const MealItemForm = (props) => {
    const inputAmountRef = useRef();
    const [isAmountValid, setIsAmountValid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = +inputAmountRef.current.value;

        if (enteredAmount < 1 || enteredAmount > 5) {
            setIsAmountValid(false);
            return;
        }

        props.onAddToCart(enteredAmount);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={inputAmountRef}
                label="Amount"
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
            />
            <button>ADD</button>
            {!isAmountValid && <p>please enter valid amount(1-5).</p>}
        </form>
    );
};

export default MealItemForm;
