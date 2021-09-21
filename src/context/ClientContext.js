import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { API } from '../helpers/const'

export const clientContext = React.createContext()

const INIT_STATE = {

    pets: null,
    breeds: []
   
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PETS":
            return { ...state, pets: action.payload }

        case "GET_BREEDS":
            return { ...state, breeds: action.payload }

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


    const getBreeds = async () => {
        const { data } = await axios(API)
        const arr = []
        data.forEach(item => {
            arr.push(item.breed)
        })
        let newArr = []
        arr.forEach(elem => {
            let check = newArr.filter(item => item.trim() === elem.trim())
            if (check.length === 0) {
                newArr.push(elem)
            }
        })
        dispatch({
            type: 'GET_BREEDS',
            payload: newArr
        })
    }

    //Pagination
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    useEffect(() => {
        const fetchPets = () => {
            const data = state.pets || []
            setPosts(data)
        }
        fetchPets()

    }, [state.pets])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const totalPosts = posts.length
    console.log(currentPosts);

    const changePage = (newPage) => {
        setCurrentPage(newPage)
    }
    //Pagination


    return (
        <clientContext.Provider value={{
            pets: state.pets,
            breeds: state.breeds,
            currentPosts,
            postsPerPage,
            totalPosts,
            getPets,
            createNewUser,
            login,
            getBreeds,
            changePage


        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;