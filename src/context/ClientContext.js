import axios from 'axios'
import React, { useReducer } from 'react'
import { calcSubPrice, calcTotalPrice } from '../helpers/calc'
import { API } from '../helpers/const'

export const clientContext = React.createContext()

const INIT_STATE = {
    pets: null,
    petsCountInCart: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).pets.length : 0,
    cart: null
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PETS":
            return {...state, pets: action.payload}
        case "ADD_AND_DELETE_PET_IN_CART":
            return {...state, petsCountInCart: action.payload}
        case "GET_CART":
            return {...state, cart: action.payload}
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

    const toggleCartIcon = (pet) => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart){
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
        }else{
            cart.pets.push(newPet)
            console.log(newPet, "Added to cart");
        }

        cart.totalPrice = calcTotalPrice(cart.pets)
        console.log(cart.pets);

        localStorage.setItem("cart", JSON.stringify(cart))

        dispatch({
            action: "ADD_AND_DELETE_PET_IN_CART",
            payload: cart.pets.length
        })

    }

    const getCart = () =>{
        let cart = JSON.parse(localStorage.getItem("cart"))
        console.log("cart: ",cart);
        dispatch({
            action: "GET_CART",
            payload: cart
        })
    }

    const checkPetInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart){
            return false
        }
        let newCart = cart.pets.filter(item => item.pet.id === id)
        return newCart.length ? true : false
    }

    const changePetsCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart){
            return
        }
        cart.pets = cart.pets.map( item => {
            if (item.pet.id = id){
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })
        cart.totalPrice = calcTotalPrice(cart.pets)
        localStorage.setItem("cart", JSON.stringify(cart))
        getCart()
    }

    return (
        <clientContext.Provider value = {{
            pets: state.pets,
            cart: state.cart,
            petsCountInCart: state.petsCountInCart,
            getPets,
            toggleCartIcon,
            getCart,
            checkPetInCart,
            changePetsCount
        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;