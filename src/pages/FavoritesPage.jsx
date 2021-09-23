import { Container, Typography } from '@material-ui/core';
import React from 'react';
import Content from '../components/Content';
import NavBar from '../components/NavBar';

const FavoritesPage = () => {
    return (
        <div>
            <NavBar/>
            <Container>
                <Typography variant="h4" component="h2" align="center">
                    Favorites Page
                </Typography>
                <div className="main">
                    Тут звездочки
                </div>
            </Container>
        </div>
    );
};

export default FavoritesPage;