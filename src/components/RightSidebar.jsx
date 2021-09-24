import { Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { clientContext } from '../context/ClientContext';

const RightSidebar = () => {

    const [price, setPrice] = useState('')
    const [breed, setBreed] = useState('')
    const history = useHistory()
    const { getPets, breeds, getBreeds } = useContext(clientContext)

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
        <div className="left-sidebar">
            <FormControl component="fieldset">
                <FormLabel component="legend">Цена</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={price} onChange={(e) => filterPets('price_lte', e.target.value)}>
                    <FormControlLabel value="1000" control={<Radio />} label="1000" />
                    <FormControlLabel value="10000" control={<Radio />} label="10000" />
                    <FormControlLabel value="15000" control={<Radio />} label="15000" />
                    <FormControlLabel value="20000" control={<Radio />} label="20000" />
                </RadioGroup>
            </FormControl>
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Порода</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={breed} onChange={(e) => filterPets('breed', e.target.value)}>
                        {
                            breeds.map(item => (
                                <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                            ))
                        }

                    </RadioGroup>
                </FormControl>
            </div>
            <Button onClick={resetFilter}>Reset</Button>
        </div>
    );
};

export default RightSidebar;