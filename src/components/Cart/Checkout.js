import classes from './Checkout.module.css';

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import CartContext from '../../store/cart-context';
import useInput from '../hooks/use-input';

const Checkout = (props) => {
    const cartCtx = useContext(CartContext);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const {
        value: enteredName,
        isValid: isNameValid,
        valueChangeHandler: nameInputChangeHandler,
        reset: nameInputReset,
    } = useInput();
    const {
        value: enteredStreet,
        isValid: isenteredStreetValid,
        valueChangeHandler: streetInputChangeHandler,
        reset: streetInputReset,
    } = useInput();
    const {
        value: enteredPostalCode,
        isValid: isPostalCodeValid,
        valueChangeHandler: postalCodeInputChangeHandler,
        reset: postalCodeInputReset,
    } = useInput();
    const {
        value: enteredCity,
        isValid: isEnteredCityValid,
        valueChangeHandler: cityInputChangeHandler,
        reset: cityInputReset,
    } = useInput();

    let isFormValid;

    useEffect(() => {
        isFormValid =
            isenteredStreetValid &&
            isNameValid &&
            isPostalCodeValid &&
            isEnteredCityValid;
        if (isFormValid) {
            setIsBtnDisabled(false);
        } else {
            setIsBtnDisabled(true);
        }
    }, [enteredCity, enteredName, enteredPostalCode, enteredStreet]);

    const confirmHandler = async (event) => {
        const adressSumary = {
            city: enteredCity,
            name: enteredName,
            postalCode: enteredPostalCode,
            street: enteredStreet,
        };

        const orderData = {
            meals: cartCtx.items,
            adress: adressSumary,
        };

        event.preventDefault();

        const response = await axios.post(
            'https://react-httpreq-d7796-default-rtdb.europe-west1.firebasedatabase.app/Orders.json',
            orderData
        );

        console.log(response.data);
        nameInputReset();
        streetInputReset();
        postalCodeInputReset();
        cityInputReset();
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    value={enteredName}
                    onChange={nameInputChangeHandler}
                />
            </div>
            <div className={classes.control}>
                <label htmlFor="street">Street</label>
                <input
                    type="text"
                    id="street"
                    value={enteredStreet}
                    onChange={streetInputChangeHandler}
                />
            </div>
            <div className={classes.control}>
                <label htmlFor="postal">Postal Code</label>
                <input
                    type="text"
                    id="postal"
                    value={enteredPostalCode}
                    onChange={postalCodeInputChangeHandler}
                />
            </div>
            <div className={classes.control}>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    value={enteredCity}
                    onChange={cityInputChangeHandler}
                />
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit} disabled={isBtnDisabled}>
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default Checkout;
