import axios from 'axios'
import React, { useReducer } from 'react'
import { API } from '../helpers/const'

export const clientContext = React.createContext()

const INIT_STATE = {
    pets: null

}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PETS":
            return { ...state, pets: action.payload }
        default:
            return { ...state }
    }
}

const ClientContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getPets = async () => {
        const { data } = await axios(`${API}${window.location.search}`)
        dispatch({
            type: "GET_PETS",
            payload: data
        })
    }

    const createNewUser = async (newUser, history) => {
        try {
            const data = await axios.post('https://intense-retreat-64750.herokuapp.com/auth/registration', newUser)
            console.log(data);
            history.push('/');
        }
        catch (e) {
            console.log(e.response);
            alert(e.response.data.message)
        }
    }
    const login = async (user, history) => {
        try {
            const { data } = await axios.post('https://intense-retreat-64750.herokuapp.com/auth/login', user)
            history.push("/");
        }
        catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <clientContext.Provider value={{
            pets: state.pets,
            getPets,
            createNewUser,
            login
        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;