import './WelcomePageCSS.css'
import React, {Fragment} from 'react';
import image from './logo.svg';
import {useFormik} from 'formik';
import {Button, FloatingLabel, FormControl, Toast} from "react-bootstrap";
import '../../App';
import {useHistory} from "react-router-dom";
import decor from './decor2.png';
import email from './email.png';
import password from './password.jpg';
import singInLabel from './signin_icon.png';
import loginButton from './loginButton.png';
import {APIService} from "../../APIService";
import {useState} from "react";
import Spinner from 'react-bootstrap/Spinner'

export const WelcomePage = () => {

    const history = useHistory();

    const handleRoute = () => {
        history.push("/register");
    }

    const handleRouteToMainPage = () => {
        history.push("/mainpage");
    }

    let [isLoading, setLoading] = useState(false);

    let [isError, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            setLoading(true)
            APIService.Login(values).then(data => {
                if (data?.token) {
                    localStorage.setItem('authToken', data.token);
                    setLoading(false)
                    handleRouteToMainPage();
                } else {
                    setError(true);
                }
            });
        },
        validate: async (values) => {
            let errors = {};
            if (!values.email) {
                setError(true);
            } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)) {
                setError(true);
            }
            return errors;
        }
    });

    return (
        <Fragment>
            {isError && <div className="ErrorMessage">
                <Toast bg="danger" onClose={() => {setError(false); setLoading(false);}}>
                    <Toast.Header><strong>Error: Wrong email address or password!</strong></Toast.Header>
                </Toast>
            </div>}
            <div className="WelcomePageTitle" style={{backgroundImage: `url(${decor})`}}><h1
                className="MoneyBuffTitle">MoneyBuffer</h1></div>
            <main className="WelcomePageContent">
                <div>
                    <img src={image} className="WelcomePageLogo" alt=""/>
                    <div className="WelcomePageSubtitle">This is the MoneyBuffer website. <br/> Made for dealing with
                        every days <br/> money issues. You can use it to <br/> control your own or
                        your <br/> household's wealth
                        management.
                    </div>
                </div>
                <div className="verticalLineTop"/>
                <div className="verticalLineBottom"/>
                <div className="WelcomePageLoginForm">
                    <div className="singInLabelAndPicture">
                        <img src={singInLabel} className="singIn" alt=""/>
                        <label className="signInLabel">Login</label>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="WelcomePageForm">
                            <img src={email} className="WelcomePageEmailLabel" alt=""/>
                            <FloatingLabel controlId="floatingInput" label="E-mail Address" className="FloatingLabels">
                                <FormControl
                                    className="WelcomePageEmailInputField"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="E-mail address"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                            </FloatingLabel>
                        </div>
                        <div className="WelcomePageForm">
                            <img src={password} className="WelcomePagePasswordLabel" alt=""/>
                            <FloatingLabel controlId="floatingInput" label="Password" className="FloatingLabels">
                                <FormControl
                                    className="WelcomePagePasswordInputField"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </FloatingLabel>
                        </div>
                        <div className="Register">
                            <label className="RegisterLabel">Haven't registered yet?</label>
                            <Button className="RegisterButton" variant="info" onClick={handleRoute}>Click
                                here.</Button>
                        </div>
                        <button className="LoginButton" type="submit">
                            {!isLoading && <img src={loginButton} alt=""/>}
                            {isLoading && <Spinner animation="border" className="spinner"/>}
                        </button>
                    </form>
                </div>
            </main>
        </Fragment>
    );
}