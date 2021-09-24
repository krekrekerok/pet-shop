import axios from 'axios'
import { calcSubPrice, calcTotalPrice } from '../helpers/calc'
import React, { useEffect, useReducer, useState } from 'react'
import { API } from '../helpers/const'

export const clientContext = React.createContext()

const INIT_STATE = {
    pets: null,
    petsCountInCart: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).pets.length : 0,
    petsCountInFavorites: JSON.parse(localStorage.getItem("favorites")) ? JSON.parse(localStorage.getItem("favorites")).pets.length : 0,
    favorites: [],
    cart: null,
    breeds: []

}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PETS":
            return { ...state, pets: action.payload }
        case "ADD_AND_DELETE_PET_IN_CART":
            return { ...state, petsCountInCart: action.payload }
        case "ADD_AND_DELETE_PET_IN_FAVORITES":
            return { ...state, petsCountInFavorites: action.payload }
        case "GET_CART":
            return { ...state, cart: action.payload }
        case "GET_FAVORITES":
            return { ...state, favorites: action.payload }
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

    const toggleCartIcon = (pet) => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            cart = {
                pets: [],
                totalPrice: 0
            }
        }

        let newPet = {
            pet: pet,
            count: 1,
            subPrice: 0
        }

        newPet.subPrice = calcSubPrice(newPet)

        let newCart = cart.pets.filter(item => item.pet.id === pet.id)

        if (newCart.length) {
            cart.pets = cart.pets.filter(item => item.pet.id !== pet.id)
            console.log(newPet, "removed from cart");
        } else {
            cart.pets.push(newPet)
            console.log(newPet, "Added to cart");
        }

        cart.totalPrice = calcTotalPrice(cart.pets)
        // console.log("cart.pets after total pricing: " ,cart.pets);

        localStorage.setItem("cart", JSON.stringify(cart))
        // console.log("cart.pets.length: ",cart.pets.length)
        dispatch({
            type: "ADD_AND_DELETE_PET_IN_CART",
            payload: cart.pets.length
        })

    }
    console.log("state: ", state)

    // для избранного
    const toggleStarIcon = (pet) => {
        // console.log("button click toggle pet", pet);
        let favorites = JSON.parse(localStorage.getItem("favorites"))
        if (!favorites) {
            favorites = {
                pets: []
            }
        }

        let newPet = {
            pet: pet,
            count: 1
        }


        let newFavorite = favorites.pets.filter(item => item.pet.id === pet.id)

        if (newFavorite.length) {
            favorites.pets = favorites.pets.filter(item => item.pet.id !== pet.id)
            console.log(newPet, "removed from favorites");
        } else {
            favorites.pets.push(newPet)
            console.log(newPet, "Added to favorites");
        }

        localStorage.setItem("favorites", JSON.stringify(favorites))
        console.log("favorites.pets.length: ", favorites.pets.length)
        dispatch({
            type: "ADD_AND_DELETE_PET_IN_FAVORITES",
            payload: favorites.pets.length
        })

    }
    // console.log("state: ",state)

    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        console.log("cart: ", cart);
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }

    const getFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites"))
        console.log("Favorites", favorites);
        dispatch({
            type: "GET_FAVORITES",
            payload: favorites
        })
    }


    const checkPetInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            return false
        }
        let newCart = cart.pets.filter(item => item.pet.id === id)
        return newCart.length ? true : false
    }

    const checkPetInFavorites = (id) => {
        let favorites = JSON.parse(localStorage.getItem("favorites"))
        if (!favorites) {
            return false
        }
        let newFavorites = favorites.pets.filter(item => item.pet.id === id)
        return newFavorites.length ? true : false
    }

    const changePetsCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            return
        }
        cart.pets = cart.pets.map(item => {
            if (item.pet.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })
        cart.totalPrice = calcTotalPrice(cart.pets)
        localStorage.setItem("cart", JSON.stringify(cart))
        getCart()
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
            console.log(data);
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
    const [postsPerPage] = useState(6)
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
            cart: state.cart,
            petsCountInCart: state.petsCountInCart,
            petsCountInFavorites: state.petsCountInFavorites,
            breeds: state.breeds,
            currentPosts,
            postsPerPage,
            totalPosts,
            getPets,
            toggleCartIcon,
            getCart,
            checkPetInCart,
            changePetsCount,
            createNewUser,
            login,
            getBreeds,
            changePage,
            checkPetInFavorites,
            toggleStarIcon,
            getFavorites
        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;