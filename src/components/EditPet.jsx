import { Button, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { adminContext } from '../context/AdminContext';

const EditPet = () => {

    const { getPetToEdit, petToEdit, saveEditedPet } = useContext(adminContext)
    const [editPet, setEditPet] = useState(petToEdit)
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        setEditPet(petToEdit);
    }, [petToEdit])
    useEffect(() => {
        getPetToEdit(id)
    }, [])
    const handleInputs = (e) => {
        let obj = {
            ...editPet,
            [e.target.name]: e.target.value
        }
        setEditPet(obj)
    }
    console.log(editPet);



    return (
        <div>
            {
                editPet ? (
                    <div className="add-inputs">
                        <form >
                            <TextField
                                required
                                variant="outlined"
                                value={editPet.title}
                                id="standard-basic"
                                label="Питомец"
                                name="title"
                                onChange={handleInputs}
                            />
                            <TextField
                                required
                                variant="outlined"
                                value={editPet.breed}
                                id="standard-basic"
                                label="Порода"
                                name="breed"
                                onChange={handleInputs}
                            />
                            <TextField
                                required
                                variant="outlined"
                                value={editPet.description}
                                id="standard-basic"
                                label="Описание"
                                name="description"
                                onChange={handleInputs}
                            />
                            <TextField
                                type="number"
                                required
                                variant="outlined"
                                value={editPet.price}
                                id="standard-basic"
                                label="Цена"
                                name="price"
                                onChange={handleInputs}
                            />
                            <TextField
                                required
                                variant="outlined"
                                value={editPet.photo}
                                id="standard-basic"
                                label="Ссылка на Фото"
                                name="photo"
                                onChange={handleInputs}
                            />

                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (
                                        !editPet.title.trim() ||
                                        !editPet.breed.trim() ||
                                        !editPet.description.trim() ||
                                        !editPet.price.toString().trim() ||
                                        !editPet.photo.trim()) {
                                        alert("Заполните все поля!")
                                        return
                                    }
                                    saveEditedPet(editPet)
                                    history.push('/admin')
                                }}
                                variant="outlined"
                                color="primary"
                            >Создать
                            </Button>
                        </form>
                    </div>

                ) : (
                    <h2>Загрузка...</h2>
                )
            }
        </div>
    );
};

export default EditPet;