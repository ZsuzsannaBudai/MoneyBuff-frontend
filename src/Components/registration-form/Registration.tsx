import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Toast} from "react-bootstrap";
import {useFormik} from "formik";
import "./RegistrationSCSS.css";
import React, {Fragment, useState} from "react";
import email from "./email.png";
import password from "./passwprd.jpg";
import user_icon from "./login_icon.jpg";
import {APIService} from "../../APIService";
import {useHistory} from "react-router-dom";
import {Status} from "../../Enums";
import Spinner from "react-bootstrap/Spinner";


export const Registration = () => {

    const history = useHistory();

    const handleRoute = () => {
        history.push("/");
    }

    let [isError, setError] = useState(false);

    let [isLoading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            setLoading(true);
            APIService.Register(values).then(data => {
                if (data === Status.SUCCESS) {
                    setLoading(false);
                    handleRoute();
                } else {
                    setError(true);
                }
            });
        },
    });

    return (
        <Fragment>
            {isError &&
            <div className="ErrorMessage">
                <Toast bg="danger" onClose={() => {setError(false); setLoading(false)}}>
                    <Toast.Header><strong>Error: User already exists!</strong></Toast.Header>
                </Toast>
            </div>}
            <div className="registrationForm">
                <h1 className="subTitle">Create your account:</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <img className="userIcon" src={user_icon} alt=""/>
                        <input
                            className="userLabel"
                            id="name"
                            name="name"
                            type="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </div>
                    <div>
                        <img className="userIcon" src={email} alt=""/>
                        <input
                            className="userLabel"
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    <div>
                        <img className="userIcon" src={password} alt=""/>
                        <input
                            className="userLabel"
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </div>
                    <Button className="registerButton" type="submit" variant="secondary">
                        {!isLoading && "Register"}
                        {isLoading && <Spinner animation="border" className="spinner"/>}</Button>
                </form>
            </div>
        </Fragment>
    );
}

