import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { TextField } from '@material-ui/core';


const VerifyOrder = () => {
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')

    return (
        <div className="cardsNumber">
            <Cards
                cvc={cvc}
                expiry={expiry}
                focused={focus}
                name={name}
                number={number}
            />
            <div className="add-inputs">

                <form >

                    <TextField
                        type="tel"
                        value={number}
                        id="standard-basic"
                        label="Номер карты"
                        name="number"
                        placeholder="0000 0000 0000 0000"
                        onFocus={e => setFocus(e.target.name)}
                        onChange={e => setNumber(e.target.value)} />
                    {/* </form> */}

                    {/* <form> */}
                    <TextField
                        type="text"
                        value={name}
                        id="standard-basic"
                        label="Имя Фамилия"
                        name="name"
                        onFocus={e => setFocus(e.target.name)}
                        onChange={e => setName(e.target.value)} />
                    {/* </form>

            <form> */}
                    <TextField
                        type="text"
                        value={expiry}
                        id="standard-basic"
                        label="Срок годности"
                        name="expiry"
                        pattern="/d*"
                        onFocus={e => setFocus(e.target.name)}
                        onChange={e => setExpiry(e.target.value)} />
                    {/* </form>
            <form> */}
                    <TextField
                        type="number"
                        value={cvc}
                        id="standard-basic"
                        label="cvc"
                        name="cvc"
                        onFocus={e => setFocus(e.target.name)}
                        onChange={e => setCvc(e.target.value)} />
                </form>
            </div >
        </div>
    );
};

export default VerifyOrder;