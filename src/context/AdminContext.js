import axios from 'axios'
import React, { useReducer } from 'react'
import { API } from '../helpers/const'

export const adminContext = React.createContext()

const INIT_STATE = {
    pets: null,
    petToEdit: null
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PETS":
            return { ...state, pets: action.payload }
        case "GET_PET_TO_EDIT":
            return { ...state, petToEdit: action.payload }
        default:
            return { ...state }
    }
}

const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getPets = async () => {
        const { data } = await axios(API)
        dispatch({
            type: "GET_PETS",
            payload: data
        })
    }

    const createPet = async (newPet) => {
        axios.post(API, { ...newPet, price: +newPet.price })
        console.log("created");
        getPets()
    }

    const deletePet = async (id) => {
        await axios.delete(`${API}/${id}`)
        getPets()
    }

    const getPetToEdit = async (id) => {
        const { data } = await axios(`${API}/${id}`)
        dispatch({
            type: 'GET_PET_TO_EDIT',
            payload: data
        })
    }

    const saveEditedPet = async (editedPet) => {
        await axios.patch(`${API}/${editedPet.id}`, { ...editedPet, price: +editedPet.price })
        getPets()
    }

    return (
        <adminContext.Provider value={{
            pets: state.pets,
            petToEdit: state.petToEdit,
            getPets,
            createPet,
            deletePet,
            getPetToEdit,
            saveEditedPet
        }}>
            {children}
        </adminContext.Provider>
    );
};

export default AdminContextProvider;