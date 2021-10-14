import { Typography, Link, Button } from '@material-ui/core';
import React, { useContext } from 'react';
import CartTable from '../components/CartTable';
import NavBar from '../components/NavBar';
import { clientContext } from '../context/ClientContext';
import '../index.css'

const CartPage = () => {
    const { petsCountInCart } = useContext(clientContext)
    return (
        <div>
            <NavBar />
            <Typography variant="h4" component="h2" align="center">
                Cart Page
            </Typography>
            {(petsCountInCart > 0) ? (
                <>
                    <CartTable />
                </>

            ) : (
                <Typography variant="h6" component="h2" align="center">
                    Your cart is empty
                </Typography>

            )}
        </div>
    );
};

export default CartPage;