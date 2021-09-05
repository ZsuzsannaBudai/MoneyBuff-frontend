import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {MainPage} from "./Components/main-page/MainPage";
import {Registration} from "./Components/registration-form/Registration";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const ROUTES = [

        {path: '//', component: <MainPage/>},
        {path: '/register', component: <Registration/>},
    ];

    return (
        <Fragment>
            <BrowserRouter>
                <Switch>
                    {ROUTES.map(route => <Route path={route.path} key={route.path}>{route.component}</Route>)}
                </Switch>
            </BrowserRouter>
        </Fragment>
    );
}

export default App;
