import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminContextProvider from './context/AdminContext';
import AdminPage from './pages/AdminPage';
import EditPage from './pages/EditPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import CatalogPage from './pages/CatalogPage'
import CartPage from './pages/CartPage'
import VerifyPage from './pages/VerifyPage';
import FavoritesPage from './pages/FavoritesPage';
import ClientContextProvider from './context/ClientContext';

const Routes = () => {
    return (
        <ClientContextProvider>
            <AdminContextProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/admin" component={AdminPage} />
                        <Route exact path="/edit/:id" component={EditPage} />
                        <Route exact path="/signin" component={SignInPage} />
                        <Route exact path="/signup" component={SignUpPage} />
                        <Route exact path="/catalog" component={CatalogPage} />
                        <Route exact path="/favorites" component={FavoritesPage} />
                        <Route exact path="/cart" component={CartPage} />
                        <Route exact path="/verify" component={VerifyPage} />
                    </Switch>
                </BrowserRouter>
            </AdminContextProvider>
        </ClientContextProvider>
    );
};

export default Routes;