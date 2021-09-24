import { Container, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
// import MediaCard from '../components/Card';
import FavoritesList from '../components/FavoritesList';
import NavBar from '../components/NavBar';
import { clientContext } from '../context/ClientContext';

const FavoritesPage = () => {
    const {petsCountInFavorites} = useContext(clientContext)
    return (
        <div>
            <NavBar/>
            <Container>
                <Typography variant="h4" component="h2" align="center">
                    Favorites Page
                </Typography>
                {(petsCountInFavorites > 0 )? (
                    <>
                        <FavoritesList/>
                    </>
                    ):(
                        <Typography variant = "h6" component = "h2" align = "center">
                                No Favorites
                        </Typography>
                )}
            </Container>
        </div>
    );
};

export default FavoritesPage;