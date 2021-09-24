import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { clientContext } from '../context/ClientContext';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: "100%",
    width: 800,
    backgroundColor: "rgba(255, 255, 255, .4)",
  },
  tableMain: {
    width: "100vw",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "4.4rem",
  },
});

export default function CartTable() {
  const classes = useStyles();

  const {cart, getCart, changePetsCount, deleteProductFromCart} = useContext(clientContext)

  useEffect(()=>{
      getCart()
    },[])
    console.log("Cart in cartTable",cart);
    // console.log("petsCountInCart in cartTable",petsCountInCart);

  function handleChange (id, count){
      if (count < 1){
          return
      }  
      changePetsCount(count, id)
    }

  return (
    <>
            {
                cart ? (
                    <div className={classes.tableMain}>
                        <TableContainer className={classes.table} component={Paper} xs= {8} >
                            <Table  aria-label=" table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell align="left">Фото</TableCell>
                                    <TableCell align="left">Порода</TableCell>
                                    <TableCell align="left">Цена за ед.</TableCell>
                                    <TableCell align="left">Кол-во</TableCell>
                                    <TableCell align="left">Общая сумма</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {cart.pets.map((row, index) => (
                                    <TableRow key={row.pet.id}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="left">
                                            <img width = "100" src={row.pet.photo} alt="" />
                                        </TableCell>
                                        <TableCell align="left">{row.pet.breed}</TableCell>
                                        <TableCell align="left">{row.pet.price} сом</TableCell>
                                        <TableCell align="left">
                                            <input 
                                                type="number" 
                                                value = {row.count}
                                                onChange = {(e) => handleChange(row.pet.id, e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{row.subPrice}</TableCell>
                                        <TableCell align="left">
                                            <Button
                                                onClick = {()=>deleteProductFromCart(row.pet.id)}
                                                color = "secondary">
                                                <HighlightOffIcon/>
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography
                            variant="h4">
                            Итого: {cart.totalPrice}
                        </Typography>
                        <Link to = "/verify" className = "unset">
                            <Button variant="contained" color="secondary">
                                Оформить заказ
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <h2>Loading...</h2>
                    )
            }
        </>
  );
}
