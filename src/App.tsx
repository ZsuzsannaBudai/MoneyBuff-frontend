import {Fragment} from 'react';
import './App.css';
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import {MainPage} from "./Components/main-page/MainPage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const ROUTES = [
        {path: '/', component: <MainPage/>},
    ];

    return (
        <Fragment>
            <BrowserRouter>
                <Switch>
                    {ROUTES.map(route => <Route path={route.path}>{route.component}</Route>)}
                </Switch>
            </BrowserRouter>
        </Fragment>
    );
}

export default App;
