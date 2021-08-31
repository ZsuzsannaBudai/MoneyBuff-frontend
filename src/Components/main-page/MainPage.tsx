import './MainPageCSS.css'
import {Fragment} from 'react';
import image from './logo.svg';
import {useFormik} from 'formik';
import {Button} from "react-bootstrap";

export const MainPage = () => {

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
                    <form onSubmit={formik.handleSubmit}>
                        <div className="MainPageEmailForm">
                            <label>E-mail address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </div>
                        <div className="MainPagePasswordForm">
                            <label>Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </div>
                        <Button type="submit" variant="light">Submit</Button>
                    </form>
                </div>
            </main>
        </Fragment>
    );
}