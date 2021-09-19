import axios from 'axios'
import React, { useReducer } from 'react'
import { API } from '../helpers/const'

export const clientContext = React.createContext()

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

const ClientContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getPets = async() => {
        const { data } = await axios(`${API}${window.location.search}`)
        dispatch({
            type: "GET_PETS",
            payload: data
        })
    }

    return (
        <clientContext.Provider value = {{
            pets: state.pets,
            getPets
        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;