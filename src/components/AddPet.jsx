import React, { useContext, useState } from 'react';
import { TextField, Button, Paper, makeStyles } from "@material-ui/core"
import { adminContext } from '../context/AdminContext';
import { amber, grey } from '@material-ui/core/colors';
// import { Form } from 'react-bootstrap';
const useStyles = makeStyles((theme) => ({
    bcg: {
      backgroundColor: "rgba(255, 255, 255, .7)",
  },
  forInp:{
      margin: 5
  },
  btnColor: {
      backgroundColor: amber[50],
      color: amber[900]
  }
  
  }));
const AddPet = () => {
    const classes = useStyles();

    const {createPet} = useContext(adminContext)
    const [pet, setPet] = useState({
        title: "",
        description: "",
        price: "",
        photo: "",
        breed: ""
    })

    function handleInputs(e) {
        let newPet = {
            ...pet,
            [e.target.name]: e.target.value
        }
        setPet(newPet)
    }

    return (
        <div className = "add-inputs">
            <Paper className = {classes.bcg}>
                <form>
                    <TextField 
                            className = {classes.forInp}
                            required
                            variant="outlined"
                            value = {pet.title}
                            id="standard-basic" 
                            label="Питомец" 
                            name = "title" 
                            onChange = {handleInputs}
                        />
                    <TextField 
                            className = {classes.forInp}
                            required
                            variant="outlined"
                            value = {pet.breed}
                            id="standard-basic" 
                            label="Порода" 
                            name = "breed"
                            onChange = {handleInputs}
                        />
                    <TextField 
                            className = {classes.forInp}
                            required
                            variant="outlined"
                            value = {pet.description}
                            id="standard-basic" 
                            label="Описание" 
                            name = "description" 
                            onChange = {handleInputs}
                            multiline
                        />
                    <TextField 
                            className = {classes.forInp}
                            type = "number"
                            required
                            variant="outlined"
                            value = {pet.price}
                            id="standard-basic" 
                            label="Цена" 
                            name = "price" 
                            onChange = {handleInputs}
                        />
                    <TextField 
                            className = {classes.forInp}
                            required
                            variant="outlined"
                            value = {pet.photo}
                            id="standard-basic" 
                            label="Ссылка на Фото" 
                            name = "photo" 
                            onChange = {handleInputs}
                        />
                    
                        <Button
                            onClick = {(e) => {
                                e.preventDefault()
                                if (
                                    !pet.title.trim() ||
                                    !pet.description.trim() ||
                                    !pet.price.trim() ||
                                    !pet.photo.trim() ||
                                    !pet.breed.trim()) {
                                        alert("Заполните все поля!")
                                        return
                                    }
                                createPet({
                                    title: pet.title.trim(),
                                    description: pet.description.trim(),
                                    price: pet.price.trim(),
                                    photo: pet.photo.trim(),
                                    breed: pet.breed.trim()
                                })
                            }}
                            variant="outlined" 
                            className = {classes.btnColor}
                            >Создать
                        </Button>
                </form>
            </Paper>
        </div>
    );
};

export default AddPet;