import './MainPageCSS.css'
import {Fragment} from 'react';
import image from './logo.svg';
import {useFormik} from 'formik';
import {Button} from "react-bootstrap";
import '../../App';
import {useHistory} from "react-router-dom";

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
            <div className="MainPageTitle">MoneyBuffer</div>
            <main className="MainPageContent">
                <div>
                    <img src={image} className="MainPageLogo"></img>
                    <div className="MainPageSubtitle">This is the MoneyBuffer website. <br></br> Made for dealing with
                        every
                        days money
                        issues.<br></br> You can use it to control your own or your <br></br> household's wealth
                        management.
                    </div>
                </div>
                <div className="MainPageLoginForm">
                    <label className="signInLabel">Sign in here:</label>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label className="MainPageEmailLabel">E-mail address</label>
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
                            <label className="MainPagePasswordLabel">Password</label>
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
                        <Button className="submitButton" type="submit" variant="secondary">Submit</Button>
                    </form>
                </div>
            </main>
        </Fragment>
    );
}
