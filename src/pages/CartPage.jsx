import { Typography } from '@material-ui/core';
import React from 'react';
import NavBar from '../components/NavBar';

const CartPage = () => {
    return (
        <div>
            <NavBar/>
            <Typography variant = "h4" component = "h2" align = "center">
                    Cart Page
            </Typography>
        </div>
    );
};

export default CartPage;