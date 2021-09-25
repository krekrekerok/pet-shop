import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { adminContext } from '../context/AdminContext';
import { Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        minWidth: 450,
        maxWidth: "100%",
        width: 900,
        backgroundColor: "rgba(255, 255, 255, .7)",
      },
      tableMain: {
        width: "100vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "4.4rem",
      }
});


export default function PetTable() {
    const classes = useStyles();

    const { pets, getPets, deletePet } = useContext(adminContext)


    useEffect(() => {
        getPets()
    }, [])

    return (
        <>
            {
                pets ? (
                    <div className={classes.tableMain}>
                    <TableContainer className={classes.table} component={Paper}>
                        <Table  aria-label="caption">
                            <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell align="center">Питомец</TableCell>
                                    <TableCell align="center">Порода</TableCell>
                                    <TableCell align="center">Описание</TableCell>
                                    <TableCell align="center">Цена</TableCell>
                                    <TableCell align="center">Фото</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pets.map((row, index) => (
                                    <TableRow key={index}>

                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>

                                        <TableCell align="left">{row.title}</TableCell>
                                        <TableCell align="left">{row.breed}</TableCell>
                                        <TableCell align="left">{row.description}</TableCell>
                                        <TableCell align="left">{row.price} сом</TableCell>
                                        <TableCell align="left">
                                            <img width="100" src={row.photo} alt="" />
                                        </TableCell>

                                        <TableCell align="left">
                                            <Button
                                                onClick={() => {
                                                    deletePet(row.id)
                                                }}
                                                variant="contained"
                                                color="primary">
                                                DEL
                                            </Button>
                                        </TableCell>

                                        <TableCell align="left">
                                            <Link to={`/edit/${row.id}`}>
                                                <Button variant="contained" color="primary">
                                                    EDIT
                                                </Button>
                                            </Link>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </div>
                ) : (
                    <CircularProgress color="secondary" />
                )
            }
        </>
    );
}
