import { Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { clientContext } from '../context/ClientContext';
import MediaCard from './Card';

const Content = () => {
    const { pets, getPets } = useContext(clientContext)

    useEffect( ()=> {
        getPets()
    },[])
    return (
        <>
        {    
            pets ? (
                <div className = "content">
                    <div className="content-block">
                        {
                            pets.map(item =>(
                                <MediaCard item = {item} key = {item.id}/>
                            ))
                        }
                    </div>
                </div>
            ) : (
                <h2>Loading</h2>
            )
        }
        </>
    );
};

export default Content;