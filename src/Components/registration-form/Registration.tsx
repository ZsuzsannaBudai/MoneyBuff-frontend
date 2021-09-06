import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import {useFormik} from "formik";
import "./RegistrationCSS.css";
import {Fragment} from "react";

export const Registration = () => {
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
            <h1>Create your account:</h1>
            <div className="registrationForm">
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>First Name</label>
                        <input
                            id="first name"
                            name="first name"
                            type="first name"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            id="last name"
                            name="last name"
                            type="last name"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    <div>
                        <label>E-mail address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </div>
                    <Button className="registerButton" type="submit" variant="secondary">Register</Button>
                </form>
            </div>
        </Fragment>
    );
}

