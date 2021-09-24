import { Container, Typography } from '@material-ui/core';
import React from 'react';
import Content from '../components/Content';
import RightSidebar from '../components/RightSidebar';
import NavBar from '../components/NavBar';
import Pagination from '../components/Pagination';

const CatalogPage = () => {
    return (
        <div>
            <NavBar />
            <Container>
                <Typography variant="h4" component="h2" align="center">
                    Catalog Page
                </Typography>
                <div className="main">
                    <Content />
                    <RightSidebar />
                </div>
                <Pagination />
            </Container>
        </div>
    );
};

export default CatalogPage;