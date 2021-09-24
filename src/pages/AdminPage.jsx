import { Typography } from '@material-ui/core';
import React from 'react';
import AddPet from '../components/AddPet';
import NavBar from '../components/NavBar';
import PetTable from '../components/PetTable';

const AdminPage = () => {
    return (
        <div>
            <NavBar/>
            <Typography variant="h4" component="h2" align="center">
                    Admin Page
            </Typography>
            <AddPet/>
            <PetTable/>
        </div>
    );
};

export default AdminPage;