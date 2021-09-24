import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { clientContext } from '../context/ClientContext';
import FavorCard from './FavorCard';

const FavoritesList = () => {
    const {favorites, getFavorites} = useContext(clientContext)

    useEffect(()=>{
        getFavorites()
    },[])

    console.log("favorite in Favorites List",favorites);

    return (
        <div>
            <>
            {
                favorites ? (
                    <div className="content">
                        <div className="content-block">
                            {
                                favorites.pets.map(item =>(
                                    <FavorCard item = {item} key = {item.id}/>
                                ))
                            }
                        </div>
                    </div>

                ) : (
                    <CircularProgress color="secondary" />
                )
            }
            </>
        </div>
    );
};

export default FavoritesList;