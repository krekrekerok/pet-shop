// import React from 'react';
// import Cards from 'react-credit-cards';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

// export default function PaymentForm() {
//     return (
//         <React.Fragment>
//             <Typography variant="h6" gutterBottom>
//                 Вводите данные
//             </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                     <TextField required id="cardName" label="Название карты" fullWidth autoComplete="cc-name" />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <TextField
//                         required
//                         id="cardNumber"
//                         label="Номер карты"
//                         fullWidth
//                         autoComplete="cc-number"
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <TextField required id="expDate" label="Дата окончания обслуживания" fullWidth autoComplete="cc-exp" />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <TextField
//                         required
//                         id="cvv"
//                         label="CVV"
//                         helperText="Last three digits on signature strip"
//                         fullWidth
//                         autoComplete="cc-csc"
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <FormControlLabel
//                         control={<Checkbox color="secondary" name="saveCard" value="yes" />}
//                         label="Remember credit card details for next time"
//                     />
//                 </Grid>
//             </Grid>
//         </React.Fragment>
//     );
// }
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { TextField } from '@material-ui/core';
// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//     },
// });

const VerifyOrder = () => {
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')

    return (
        <div align="center">
            <Cards
                cvc={cvc}
                expiry={expiry}
                focused={focus}
                name={name}
                number={number}
            />
            <form>
                <TextField
                    type="tel"
                    value={number}
                    id="standard-basic"
                    label="Номер карты"
                    name="number"
                    placeholder="0000 0000 0000 0000"
                    onFocus={e => setFocus(e.target.name)}
                    onChange={e => setNumber(e.target.value)} />
            </form>

            <form>
                <TextField
                    type="text"
                    value={name}
                    id="standard-basic"
                    label="Имя Фамилия"
                    name="name"
                    onFocus={e => setFocus(e.target.name)}
                    onChange={e => setName(e.target.value)} />
            </form>

            <form>
                <TextField
                    type="text"
                    value={expiry}
                    id="standard-basic"
                    label="Срок годности"
                    name="expiry"
                    pattern="/d*"
                    onFocus={e => setFocus(e.target.name)}
                    onChange={e => setExpiry(e.target.value)} />
            </form>
            <form>
                <TextField
                    type="number"
                    value={cvc}
                    id="standard-basic"
                    label="cvc"
                    name="cvc"
                    onFocus={e => setFocus(e.target.name)}
                    onChange={e => setCvc(e.target.value)} />
            </form>

            {/* <form>
              <input
              name="number"
              placeholder="Card Number"
              onFocus={e => setFocus(e.target.name)}
              onChange={e => setFocus(e.target.name)}
            />
          </form> */}
        </div>
    );
};

export default VerifyOrder;