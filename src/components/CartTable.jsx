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
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CartTable() {
  const classes = useStyles();
  const {cart, getCart, changePetsCount, petsCountInCart} = useContext(clientContext)

  useEffect(()=>{
      getCart()
    },[])
    console.log(cart);
    console.log(petsCountInCart);

  function handleChange (id, count){
      if (count < 1){
          return
      }  
      changePetsCount(id, count)
    }

  return (
    <>
            {
                cart ? (
                    // <h1>ttoott</h1>
                        <TableContainer component={Paper} >
                        <Table className={classes.table} aria-label="caption table">
                            
                            <caption>
                                <Typography
                                display="block"
                                align="right">
                                    Итого: {cart.totalPrice}
                                </Typography>
                            </caption>

                            <TableHead>
                            <TableRow>
                                <TableCell>№</TableCell>
                                <TableCell align="left" >Название</TableCell>
                                <TableCell align="left">Цена</TableCell>
                                <TableCell align="left">Фото</TableCell>
                                <TableCell align="left">Цвет</TableCell>
                                <TableCell align="left">Кол-во</TableCell>
                                <TableCell align="left">Общая сумма</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {cart.pets.map((row, index) => (
                                <TableRow key={row.pet.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">{row.pet.title}</TableCell>
                                    <TableCell align="left">{row.pet.price} сом</TableCell>
                                    <TableCell align="left">
                                        <img width = "100" src={row.pet.photo} alt="" />
                                    </TableCell>
                                    <TableCell align="left">{row.pet.breed}</TableCell>
                                    <TableCell align="left">
                                        <input 
                                            type="number" 
                                            value = {row.count}
                                            onChange = {(e) => handleChange(row.pet.id, e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell align="left">{row.subPrice}</TableCell>

                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                ) : (
                    <h2>Loading...</h2>
                    )
            }
        </>
  );
}
