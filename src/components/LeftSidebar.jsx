import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { clientContext } from '../context/ClientContext';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { amber } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
    backgroundColor: "rgba(255, 255, 255, .9)",
},
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    orange: {
        backgroundColor: amber[700]
    },
}));


const LeftSidebar = () => {
    const classes = useStyles();
    const [openPrice, setOpenPrice] = React.useState(false);
    const [openBreed, setOpenBreed] = React.useState(false);

    const [price, setPrice] = useState('')
    const [breed, setBreed] = useState('')
    const history = useHistory()
    const { getPets, breeds, getBreeds } = useContext(clientContext)

      const handleClosePrice = () => {
        setOpenPrice(false);
      };
      const handleCloseBreed = () => {
        setOpenBreed(false);
      };
    
      const handleOpenPrice = () => {
        setOpenPrice(true);
      };
      const handleOpenBreed = () => {
        setOpenBreed(true);
      };

    const filterPets = (key, value) => {
        let search = new URLSearchParams(history.location.search)
        search.set(key, value)
        let url = `${history.location.pathname}?${search.toString()}`
        history.push(url)
        setPrice(search.get('price_lte'))
        setBreed(search.get('breed'))
        getPets()
    }

    let search = new URLSearchParams(history.location.search)
    useEffect(() => {
        setPrice(search.get('price_lte'))
        setBreed(search.get('breed'))
        getBreeds()
    }, [])

    const resetFilter = () => {
        setPrice('')
        setBreed('')
        history.push('/catalog')
        getPets()
    }

    return (
        <div className="left-sidebar" >
            <div>
                <Button className={classes.button} onClick={handleOpenPrice}>
                    Сортировать по цене
                </Button>

                <FormControl className={classes.formControl} >

                    <InputLabel id="demo-controlled-open-select-label">До...</InputLabel>

                    <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openPrice}
                    onClose={handleClosePrice}
                    onOpen={handleOpenPrice}
                    value={price}
                    onChange={(e) => filterPets('price_lte', e.target.value)}
                    >
                    <MenuItem value="">
                        <em>Цена</em>
                    </MenuItem>
                    <MenuItem value="2000">2000</MenuItem>
                    <MenuItem value="5000">5000</MenuItem>
                    <MenuItem value="10000">10000</MenuItem>
                    <MenuItem value="20000">20000</MenuItem>
                    </Select>

                </FormControl>
            </div>

            <div>
            <Button className={classes.button} onClick={handleOpenBreed}>
                Сортировать по породе
            </Button>

            <FormControl className={classes.formControl}>

                <InputLabel id="demo-controlled-open-select-label">Порода</InputLabel>

                <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openBreed}
                onClose={handleCloseBreed}
                onOpen={handleOpenBreed}
                value={breed} 
                onChange={(e) => filterPets('breed', e.target.value)}
                >
                <MenuItem value="">
                    <em>Порода</em>
                </MenuItem>
                    {
                        breeds.map(item => (
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            </div>


            
            {/* <FormControl component="fieldset">
                <FormLabel component="legend">Цена</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={price} onChange={(e) => filterPets('price_lte', e.target.value)}>
                </RadioGroup>
            </FormControl>
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Порода</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={breed} onChange={(e) => filterPets('breed', e.target.value)}>
                        {
                            breeds.map(item => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>

                            ))
                        }

                    </RadioGroup>
                </FormControl>
            </div> */}
            <Button variant = "contained" className = {classes.orange} onClick={resetFilter}>
                Reset
            </Button>
        </div>
    );
};

export default LeftSidebar;