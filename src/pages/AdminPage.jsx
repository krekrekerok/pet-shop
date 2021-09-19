import React from 'react';
import AddPet from '../components/AddPet';
import NavBar from '../components/NavBar';
import PetTable from '../components/PetTable';

const AdminPage = () => {
    return (
        <div>
            <NavBar/>
            <AddPet/>
            <PetTable/>
        </div>
    );
};

export default AdminPage;