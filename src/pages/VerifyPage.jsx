import { Button, Container } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import AddressForm from '../components/AddressForm';
import NavBar from '../components/NavBar';
import VerifyStepper from '../components/Stepper';
import VerifyOrder from '../components/VerifyOrder';

const VerifyPage = () => {
    return (
        <>
            <NavBar />
            <Container>
                <div className="cart">
                    <h1 className="cart-title" align="center">Подтверждение и оплата заказа</h1>
                    <VerifyStepper />
                    {/* <AddressForm /> */}
                    {/* <Link to="/verify" className="unset">
                        <Button variant="contained" color="secondary">
                            Оплатить
                        </Button>
                    </Link> */}
                </div>
            </Container>
        </>
    );
};

export default VerifyPage;