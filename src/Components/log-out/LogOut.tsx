import './LogOutCSS.css';
import {Fragment} from "react";
import {useHistory} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

export const LogOut = () => {

    const history = useHistory();

    function handleRouteToWelcomePage() {
        history.push("/");
    }

    return(
        <Fragment>
            <div className="logOutTitle">Logged out successfully.</div>
            {setTimeout(function() {handleRouteToWelcomePage()}, 2000)}
            <Spinner className="spinnerOnLoggedOut" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Fragment>
    );
}