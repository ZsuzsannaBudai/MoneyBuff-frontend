import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Toast} from "react-bootstrap";
import {useFormik} from "formik";
import "./RegistrationSCSS.css";
import {Fragment, useState} from "react";
import email from "./email.png";
import password from "./passwprd.jpg";
import user_icon from "./login_icon.jpg";
import {APIService} from "../../APIService";
import {useHistory} from "react-router-dom";
import {Status} from "../../Enums";


export const Registration = () => {

    const history = useHistory();

    const handleRoute = () => {
        history.push("/");
    }

    let [isError, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            APIService.Register(values).then(data => {
                console.log(data);
                if(data === Status.SUCCESS){
                    handleRoute();
                }else{
                    setError(true);
                }
            });
        },
    });

    return (
        <Fragment>
            {isError &&
            <div className="ErrorMessage">
                <Toast bg="danger" onClose={() => setError(false)} >
                    <Toast.Header><strong>Error: User already exists!</strong></Toast.Header>
                </Toast>
            </div>}
            <div className="registrationForm">
                <h1 className="subTitle">Create your account:</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <img className="userIcon" src={user_icon}/>
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
                        <img className="userIcon" src={email}/>
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
                        <img className="userIcon" src={password}/>
                        <input
                            className="userLabel"
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

