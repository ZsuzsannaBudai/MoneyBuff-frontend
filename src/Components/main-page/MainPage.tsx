import './MainPageCSS.css'
import {Fragment} from 'react';
import image from './logo.svg';
import {useFormik} from 'formik';
import {Button} from "react-bootstrap";
import '../../App';
import {useHistory} from "react-router-dom";
import decor from './decor2.png';
import login from './login_icon.jpg';
import password from './passwprd.jpg';
import singin from './signin_icon.png';
import signinButton from './loginButton.png';

export const MainPage = () => {

    const history = useHistory();

    const handleRoute = () => {
        history.push("/register");
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            console.log(values);
        },
    });

    return (
        <Fragment>
            <div className="MainPageTitle" style={{backgroundImage: `url(${decor})`}}><h1
                className="MoneyBuffTitle">MoneyBuffer</h1></div>
            <main className="MainPageContent">
                <div>
                    <img src={image} className="MainPageLogo"></img>
                    <div className="MainPageSubtitle">This is the MoneyBuffer website. <br></br> Made for dealing with
                        every days <br></br> money issues. You can use it to <br></br> control your own or
                        your <br></br> household's wealth
                        management.
                    </div>
                </div>
                <div className="verticalLine"></div>
                <div className="verticalLine2"></div>
                <div className="MainPageLoginForm">
                    <div className="signinLabelAndPicture">
                        <img src={singin} className="signin"></img>
                        <label className="signInLabel">Login</label>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <img src={login} className="MainPageEmailLabel"></img>
                            <input
                                className="MainPageEmailInputField"
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </div>
                        <div>
                            <img src={password} className="MainPagePasswordLabel"></img>
                            <input
                                className="MainPagePasswordInputField"
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </div>
                        <div className="Register">
                            <label className="RegisterLabel">Haven't registered yet?</label>
                            <Button className="RegisterButton" variant="info" onClick={handleRoute}>Click here.</Button>
                        </div>
                        <button className="LoginButton" type="submit">
                            <img src={signinButton} alt="submit"/>
                        </button>
                    </form>
                </div>
            </main>
        </Fragment>
    );
}
