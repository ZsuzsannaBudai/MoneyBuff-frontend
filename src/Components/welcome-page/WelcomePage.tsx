import './WelcomePageCSS.css'
import {Fragment} from 'react';
import image from './logo.svg';
import {useFormik} from 'formik';
import {Button, Toast} from "react-bootstrap";
import '../../App';
import {useHistory} from "react-router-dom";
import decor from './decor2.png';
import email from './email.png';
import password from './passwprd.jpg';
import signinLabel from './signin_icon.png';
import loginButton from './loginButton.png';
import {APIService} from "../../APIService";
import {useState} from "react";
import {Status} from "../../Enums";


export const WelcomePage = () => {

    const history = useHistory();

    const handleRoute = () => {
        history.push("/register");
    }

    const handleRoute2 = () => {
      history.push("/mainpage");
    }

    let [isError, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            APIService.Login(values).then(data => {
                console.log(data);
                if (data === Status.SUCCESS) {
                    handleRoute2();
                } else {
                    setError(true);
                }
            });
        }
    });

    return (
        <Fragment>
            {isError &&
            <div className="ErrorMessage">
                <Toast bg="danger" onClose={() => setError(false)} >
                    <Toast.Header><strong>Error: Wrong email address or password!</strong></Toast.Header>
                </Toast>
            </div>}
            <div className="MainPageTitle" style={{backgroundImage: `url(${decor})`}}><h1
                className="MoneyBuffTitle">MoneyBuffer</h1></div>
            <main className="MainPageContent">
                <div>
                    <img src={image} className="MainPageLogo"/>
                    <div className="MainPageSubtitle">This is the MoneyBuffer website. <br/> Made for dealing with
                        every days <br/> money issues. You can use it to <br/> control your own or
                        your <br/> household's wealth
                        management.
                    </div>
                </div>
                <div className="verticalLine"/>
                <div className="verticalLine2"/>
                <div className="MainPageLoginForm">
                    <div className="signinLabelAndPicture">
                        <img src={signinLabel} className="signin"/>
                        <label className="signInLabel">Login</label>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <img src={email} className="MainPageEmailLabel"/>
                            <input
                                className="MainPageEmailInputField"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="E-mail address"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </div>
                        <div>
                            <img src={password} className="MainPagePasswordLabel"/>
                            <input
                                className="MainPagePasswordInputField"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </div>
                        <div className="Register">
                            <label className="RegisterLabel">Haven't registered yet?</label>
                            <Button className="RegisterButton" variant="info" onClick={handleRoute}>Click here.</Button>
                        </div>
                        <button className="LoginButton" type="submit">
                            <img src={loginButton} alt="submit"/>
                        </button>
                    </form>
                </div>
            </main>
        </Fragment>
    );
}
