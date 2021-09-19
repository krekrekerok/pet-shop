import { Container, Typography } from '@material-ui/core';
import React from 'react';
import Content from '../components/Content';
import NavBar from '../components/NavBar';

const CatalogPage = () => {
    return (
        <div>
            <NavBar/>
            <Container>
                <Typography variant = "h4" component = "h2" align = "center">
                    Catalog Page
                </Typography>
                <div className="main">
                    <Content/>
                </div>
            </Container>
        </div>
    );
};

export default CatalogPage;