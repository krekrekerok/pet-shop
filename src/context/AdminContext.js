import axios from 'axios'
import React, { useReducer } from 'react'
import { API } from '../helpers/const'

export const adminContext = React.createContext()

const INIT_STATE = {
    pets: null,
    petsToEdit: null
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PETS":
            return {...state, pets: action.payload}
        default:
            return {...state}
    }
}

const AdminContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getPets = async() => {
        const { data } = await axios(API)
        dispatch({
            type: "GET_PETS",
            payload: data
        })
    }

    const createPet = async(newPet) =>{
        axios.post(API, {...newPet, price: +newPet.price})
        console.log("created");
        getPets()
    }

    return (
        <adminContext.Provider value = {{
            pets: state.pets,
            getPets,
            createPet
        }}>
            {children}
        </adminContext.Provider>
    );
};

export default AdminContextProvider;