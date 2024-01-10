import React, { useContext, useState, useEffect } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../context/cart-context';

import classes from './HeaderCardButton.module.css';

const HeaderCardButton = (props) => {
    const [isBtnHighlighted, setİsBtnHighLighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((preVal, curVal) => {
        return preVal + curVal.amount;
    }, 0);

    const btnClasses = `${classes.button} ${
        isBtnHighlighted ? classes.bump : ''
    }`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setİsBtnHighLighted(true);

        const timer = setTimeout(() => {
            setİsBtnHighLighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart :</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCardButton;
